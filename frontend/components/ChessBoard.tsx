import React from 'react';
import { View, StyleSheet, Dimensions, TouchableOpacity, Text } from 'react-native';
import { Chess } from 'chess.js';

interface ChessBoardProps {
  fen: string;
  selectedSquare: string | null;
  legalMoves: string[];
  onSquarePress: (square: string) => void;
}

const BOARD_SIZE = Math.min(Dimensions.get('window').width - 32, 400);
const SQUARE_SIZE = BOARD_SIZE / 8;

const FILES = ['a', 'b', 'c', 'd', 'e', 'f', 'g', 'h'];
const RANKS = ['8', '7', '6', '5', '4', '3', '2', '1'];

const PIECE_SYMBOLS: { [key: string]: string } = {
  p: '♟',
  n: '♞',
  b: '♝',
  r: '♜',
  q: '♛',
  k: '♚',
  P: '♙',
  N: '♘',
  B: '♗',
  R: '♖',
  Q: '♕',
  K: '♔',
};

export default function ChessBoard({
  fen,
  selectedSquare,
  legalMoves,
  onSquarePress,
}: ChessBoardProps) {
  const chess = new Chess(fen);

  const renderSquare = (file: string, rank: string) => {
    const square = `${file}${rank}`;
    const piece = chess.get(square as any);
    const isLight = (FILES.indexOf(file) + parseInt(rank)) % 2 === 0;
    const isSelected = selectedSquare === square;
    const isLegalMove = legalMoves.includes(square);

    return (
      <TouchableOpacity
        key={square}
        style={[
          styles.square,
          isLight ? styles.lightSquare : styles.darkSquare,
          isSelected && styles.selectedSquare,
        ]}
        onPress={() => onSquarePress(square)}
        activeOpacity={0.7}
      >
        {isLegalMove && (
          <View
            style={[
              styles.legalMoveIndicator,
              piece ? styles.captureMoveIndicator : styles.normalMoveIndicator,
            ]}
          />
        )}
        {piece && (
          <Text
            style={[
              styles.piece,
              piece.color === 'w' ? styles.whitePiece : styles.blackPiece,
            ]}
          >
            {PIECE_SYMBOLS[piece.type] || ''}
          </Text>
        )}
        {file === 'a' && (
          <Text style={styles.rankLabel}>{rank}</Text>
        )}
        {rank === '1' && (
          <Text style={styles.fileLabel}>{file}</Text>
        )}
      </TouchableOpacity>
    );
  };

  return (
    <View style={styles.container}>
      <View style={styles.board}>
        {RANKS.map((rank) => (
          <View key={rank} style={styles.row}>
            {FILES.map((file) => renderSquare(file, rank))}
          </View>
        ))}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  board: {
    width: BOARD_SIZE,
    height: BOARD_SIZE,
    borderWidth: 2,
    borderColor: '#2a2a4e',
    borderRadius: 8,
    overflow: 'hidden',
  },
  row: {
    flexDirection: 'row',
  },
  square: {
    width: SQUARE_SIZE,
    height: SQUARE_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  lightSquare: {
    backgroundColor: '#f0d9b5',
  },
  darkSquare: {
    backgroundColor: '#b58863',
  },
  selectedSquare: {
    backgroundColor: '#7B61FF',
  },
  piece: {
    fontSize: SQUARE_SIZE * 0.7,
    textAlign: 'center',
  },
  whitePiece: {
    color: '#ffffff',
    textShadowColor: '#000000',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  blackPiece: {
    color: '#000000',
    textShadowColor: '#ffffff',
    textShadowOffset: { width: 1, height: 1 },
    textShadowRadius: 2,
  },
  legalMoveIndicator: {
    position: 'absolute',
  },
  normalMoveIndicator: {
    width: SQUARE_SIZE * 0.3,
    height: SQUARE_SIZE * 0.3,
    borderRadius: (SQUARE_SIZE * 0.3) / 2,
    backgroundColor: 'rgba(123, 97, 255, 0.5)',
  },
  captureMoveIndicator: {
    width: SQUARE_SIZE * 0.9,
    height: SQUARE_SIZE * 0.9,
    borderRadius: (SQUARE_SIZE * 0.9) / 2,
    borderWidth: 3,
    borderColor: 'rgba(231, 76, 60, 0.7)',
  },
  rankLabel: {
    position: 'absolute',
    top: 2,
    left: 2,
    fontSize: 10,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.3)',
  },
  fileLabel: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    fontSize: 10,
    fontWeight: 'bold',
    color: 'rgba(0, 0, 0, 0.3)',
  },
});