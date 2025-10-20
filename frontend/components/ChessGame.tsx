import React, { useState, useEffect } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
  ActivityIndicator,
} from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Chess } from 'chess.js';
import ChessBoard from './ChessBoard';
import ConfirmDialog from './ConfirmDialog';
import { getAIMove } from '../utils/stockfishEngine';

interface ChessGameProps {
  playerName: string;
  difficulty: 'easy' | 'medium' | 'hard';
  onBackToMenu: () => void;
}

export default function ChessGame({ playerName, difficulty, onBackToMenu }: ChessGameProps) {
  const [chess] = useState(() => new Chess());
  const [fen, setFen] = useState(chess.fen());
  const [selectedSquare, setSelectedSquare] = useState<string | null>(null);
  const [legalMoves, setLegalMoves] = useState<string[]>([]);
  const [gameStatus, setGameStatus] = useState<string>('Your turn');
  const [isAIThinking, setIsAIThinking] = useState(false);
  const [moveHistory, setMoveHistory] = useState<string[]>([]);
  const [capturedPieces, setCapturedPieces] = useState<{
    white: string[];
    black: string[];
  }>({ white: [], black: [] });
  
  // Timer states - 10 minutes (600 seconds) for each player
  const [whiteTime, setWhiteTime] = useState(600);
  const [blackTime, setBlackTime] = useState(600);
  const [gameActive, setGameActive] = useState(true);
  
  // Dialog states
  const [showResignDialog, setShowResignDialog] = useState(false);
  const [showGameOverDialog, setShowGameOverDialog] = useState(false);
  const [gameOverMessage, setGameOverMessage] = useState('');

  useEffect(() => {
    updateGameStatus();
  }, [fen]);

  // Timer countdown effect
  useEffect(() => {
    if (!gameActive || chess.isGameOver() || showGameOverDialog) return;

    const timer = setInterval(() => {
      if (chess.turn() === 'w') {
        // White's turn (player) - countdown white timer
        setWhiteTime((prev) => {
          if (prev <= 1) {
            setGameActive(false);
            setGameOverMessage('Time out! AI wins by timeout.');
            setShowGameOverDialog(true);
            return 0;
          }
          return prev - 1;
        });
      } else if (chess.turn() === 'b') {
        // Black's turn (AI) - countdown black timer
        setBlackTime((prev) => {
          if (prev <= 1) {
            setGameActive(false);
            setGameOverMessage('AI ran out of time! You win!');
            setShowGameOverDialog(true);
            return 0;
          }
          return prev - 1;
        });
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [gameActive, chess.turn(), showGameOverDialog]);

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const updateGameStatus = () => {
    if (chess.isCheckmate()) {
      const winner = chess.turn() === 'w' ? 'Black' : 'White';
      setGameStatus(`Checkmate! ${winner} wins!`);
      setGameOverMessage(`${winner} wins by checkmate!`);
      setShowGameOverDialog(true);
    } else if (chess.isDraw()) {
      setGameStatus('Draw!');
      setGameOverMessage('The game is a draw!');
      setShowGameOverDialog(true);
    } else if (chess.isCheck()) {
      setGameStatus('Check!');
    } else {
      setGameStatus(chess.turn() === 'w' ? 'Your turn' : 'AI is thinking...');
    }
  };

  const onSquarePress = async (square: string) => {
    if (isAIThinking || chess.isGameOver()) return;

    // If no square is selected, try to select this square
    if (!selectedSquare) {
      const piece = chess.get(square as any);
      if (piece && piece.color === 'w') {
        setSelectedSquare(square);
        const moves = chess.moves({ square: square as any, verbose: true });
        setLegalMoves(moves.map((m) => m.to));
      }
    } else {
      // Try to make a move
      try {
        const move = chess.move({
          from: selectedSquare as any,
          to: square as any,
          promotion: 'q', // Always promote to queen for simplicity
        });

        if (move) {
          // Update captured pieces
          if (move.captured) {
            const piece = move.captured;
            setCapturedPieces((prev) => ({
              ...prev,
              white: move.color === 'b' ? [...prev.white, piece] : prev.white,
              black: move.color === 'w' ? [...prev.black, piece] : prev.black,
            }));
          }

          setMoveHistory((prev) => [...prev, move.san]);
          setFen(chess.fen());
          setSelectedSquare(null);
          setLegalMoves([]);

          // AI makes a move after a short delay
          if (!chess.isGameOver()) {
            setIsAIThinking(true);
            setTimeout(async () => {
              await makeAIMove();
            }, 500);
          }
        } else {
          // Invalid move, deselect
          setSelectedSquare(null);
          setLegalMoves([]);
        }
      } catch (error) {
        // Invalid move, try to select new piece
        const piece = chess.get(square as any);
        if (piece && piece.color === 'w') {
          setSelectedSquare(square);
          const moves = chess.moves({ square: square as any, verbose: true });
          setLegalMoves(moves.map((m) => m.to));
        } else {
          setSelectedSquare(null);
          setLegalMoves([]);
        }
      }
    }
  };

  const makeAIMove = async () => {
    try {
      const bestMove = await getAIMove(chess.fen(), difficulty);
      if (bestMove) {
        const move = chess.move(bestMove);
        if (move) {
          if (move.captured) {
            const piece = move.captured;
            setCapturedPieces((prev) => ({
              ...prev,
              white: move.color === 'b' ? [...prev.white, piece] : prev.white,
              black: move.color === 'w' ? [...prev.black, piece] : prev.black,
            }));
          }
          setMoveHistory((prev) => [...prev, move.san]);
          setFen(chess.fen());
        }
      }
    } catch (error) {
      console.error('AI move error:', error);
    } finally {
      setIsAIThinking(false);
    }
  };

  const resetGame = () => {
    chess.reset();
    setFen(chess.fen());
    setSelectedSquare(null);
    setLegalMoves([]);
    setIsAIThinking(false);
    setMoveHistory([]);
    setCapturedPieces({ white: [], black: [] });
    setGameStatus('Your turn');
    setShowGameOverDialog(false);
    setWhiteTime(600);
    setBlackTime(600);
    setGameActive(true);
  };

  const handleResign = () => {
    setShowResignDialog(false);
    setGameOverMessage('You resigned. AI wins!');
    setShowGameOverDialog(true);
  };

  const getPieceSymbol = (piece: string): string => {
    const symbols: { [key: string]: string } = {
      p: '♟',
      n: '♞',
      b: '♝',
      r: '♜',
      q: '♛',
      k: '♚',
    };
    return symbols[piece.toLowerCase()] || '';
  };

  return (
    <SafeAreaView style={styles.container}>
      <ScrollView contentContainerStyle={styles.scrollContent}>
        <View style={styles.header}>
          <TouchableOpacity onPress={onBackToMenu} style={styles.backButton}>
            <Text style={styles.backButtonText}>← Back</Text>
          </TouchableOpacity>
          <Text style={styles.title}>Chess Game</Text>
          <View style={styles.placeholder} />
        </View>

        <View style={styles.statusContainer}>
          <Text style={styles.statusText}>{gameStatus}</Text>
          {isAIThinking && <ActivityIndicator size="small" color="#7B61FF" />}
        </View>

        {/* AI Timer (Black) */}
        <View style={styles.timerContainer}>
          <View style={styles.timerLabel}>
            <Text style={styles.timerLabelText}>AI</Text>
          </View>
          <View style={[styles.timerBox, chess.turn() === 'b' && styles.timerBoxActive]}>
            <Text style={[styles.timerText, blackTime <= 30 && styles.timerTextDanger]}>
              {formatTime(blackTime)}
            </Text>
          </View>
        </View>

        <View style={styles.capturedContainer}>
          <Text style={styles.capturedTitle}>Captured by AI:</Text>
          <View style={styles.capturedPieces}>
            {capturedPieces.black.map((piece, idx) => (
              <Text key={idx} style={styles.capturedPiece}>
                {getPieceSymbol(piece)}
              </Text>
            ))}
          </View>
        </View>

        <ChessBoard
          fen={fen}
          selectedSquare={selectedSquare}
          legalMoves={legalMoves}
          onSquarePress={onSquarePress}
        />

        <View style={styles.capturedContainer}>
          <Text style={styles.capturedTitle}>Captured by You:</Text>
          <View style={styles.capturedPieces}>
            {capturedPieces.white.map((piece, idx) => (
              <Text key={idx} style={styles.capturedPiece}>
                {getPieceSymbol(piece)}
              </Text>
            ))}
          </View>
        </View>

        {/* Player Timer (White) */}
        <View style={styles.timerContainer}>
          <View style={styles.timerLabel}>
            <Text style={styles.timerLabelText}>You</Text>
          </View>
          <View style={[styles.timerBox, chess.turn() === 'w' && styles.timerBoxActive]}>
            <Text style={[styles.timerText, whiteTime <= 30 && styles.timerTextDanger]}>
              {formatTime(whiteTime)}
            </Text>
          </View>
        </View>

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={resetGame}>
            <Text style={styles.buttonText}>New Game</Text>
          </TouchableOpacity>
          <TouchableOpacity style={[styles.button, styles.resignButton]} onPress={() => setShowResignDialog(true)}>
            <Text style={styles.buttonText}>Resign</Text>
          </TouchableOpacity>
        </View>

        {moveHistory.length > 0 && (
          <View style={styles.historyContainer}>
            <Text style={styles.historyTitle}>Move History</Text>
            <ScrollView style={styles.historyScroll} nestedScrollEnabled>
              <Text style={styles.historyText}>{moveHistory.join(', ')}</Text>
            </ScrollView>
          </View>
        )}
      </ScrollView>

      {/* Resign Confirmation Dialog */}
      <ConfirmDialog
        visible={showResignDialog}
        title="Resign Game"
        message="Are you sure you want to resign? The AI will win."
        confirmText="Resign"
        cancelText="Cancel"
        confirmColor="#e74c3c"
        onConfirm={handleResign}
        onCancel={() => setShowResignDialog(false)}
      />

      {/* Game Over Dialog */}
      <ConfirmDialog
        visible={showGameOverDialog}
        title="Game Over"
        message={gameOverMessage}
        confirmText="New Game"
        cancelText="Back to Menu"
        confirmColor="#7B61FF"
        onConfirm={() => {
          resetGame();
        }}
        onCancel={() => {
          setShowGameOverDialog(false);
          onBackToMenu();
        }}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#1a1a2e',
  },
  scrollContent: {
    padding: 16,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  backButton: {
    padding: 8,
  },
  backButtonText: {
    color: '#7B61FF',
    fontSize: 16,
    fontWeight: '600',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#ffffff',
  },
  placeholder: {
    width: 60,
  },
  statusContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    backgroundColor: '#16213e',
    borderRadius: 12,
    marginBottom: 16,
  },
  statusText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#ffffff',
    marginRight: 8,
  },
  capturedContainer: {
    padding: 12,
    backgroundColor: '#16213e',
    borderRadius: 8,
    marginBottom: 12,
  },
  capturedTitle: {
    fontSize: 14,
    color: '#a0a0a0',
    marginBottom: 8,
  },
  capturedPieces: {
    flexDirection: 'row',
    flexWrap: 'wrap',
  },
  capturedPiece: {
    fontSize: 24,
    marginRight: 4,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: 16,
  },
  button: {
    flex: 1,
    backgroundColor: '#7B61FF',
    paddingVertical: 14,
    borderRadius: 12,
    marginHorizontal: 4,
    alignItems: 'center',
  },
  resignButton: {
    backgroundColor: '#e74c3c',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: '600',
  },
  historyContainer: {
    marginTop: 16,
    padding: 12,
    backgroundColor: '#16213e',
    borderRadius: 12,
    maxHeight: 100,
  },
  historyTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#ffffff',
    marginBottom: 8,
  },
  historyScroll: {
    maxHeight: 60,
  },
  historyText: {
    fontSize: 12,
    color: '#a0a0a0',
    lineHeight: 18,
  },
  timerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 12,
    backgroundColor: '#16213e',
    borderRadius: 8,
    marginBottom: 12,
  },
  timerLabel: {
    flex: 1,
  },
  timerLabelText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#a0a0a0',
  },
  timerBox: {
    paddingVertical: 8,
    paddingHorizontal: 16,
    backgroundColor: '#2a2a4e',
    borderRadius: 8,
    borderWidth: 2,
    borderColor: '#2a2a4e',
    minWidth: 80,
    alignItems: 'center',
  },
  timerBoxActive: {
    borderColor: '#7B61FF',
    backgroundColor: '#7B61FF20',
  },
  timerText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#ffffff',
    fontVariant: ['tabular-nums'],
  },
  timerTextDanger: {
    color: '#e74c3c',
  },
});