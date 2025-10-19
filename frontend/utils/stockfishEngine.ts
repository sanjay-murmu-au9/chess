import { Chess } from 'chess.js';

// Simple AI implementation using minimax algorithm with alpha-beta pruning
// For production, you would integrate actual Stockfish.js library

interface EvaluationResult {
  move: string;
  score: number;
}

const PIECE_VALUES: { [key: string]: number } = {
  p: 100,
  n: 320,
  b: 330,
  r: 500,
  q: 900,
  k: 20000,
};

const POSITION_BONUS: { [key: string]: number[][] } = {
  p: [
    [0, 0, 0, 0, 0, 0, 0, 0],
    [50, 50, 50, 50, 50, 50, 50, 50],
    [10, 10, 20, 30, 30, 20, 10, 10],
    [5, 5, 10, 25, 25, 10, 5, 5],
    [0, 0, 0, 20, 20, 0, 0, 0],
    [5, -5, -10, 0, 0, -10, -5, 5],
    [5, 10, 10, -20, -20, 10, 10, 5],
    [0, 0, 0, 0, 0, 0, 0, 0],
  ],
  n: [
    [-50, -40, -30, -30, -30, -30, -40, -50],
    [-40, -20, 0, 0, 0, 0, -20, -40],
    [-30, 0, 10, 15, 15, 10, 0, -30],
    [-30, 5, 15, 20, 20, 15, 5, -30],
    [-30, 0, 15, 20, 20, 15, 0, -30],
    [-30, 5, 10, 15, 15, 10, 5, -30],
    [-40, -20, 0, 5, 5, 0, -20, -40],
    [-50, -40, -30, -30, -30, -30, -40, -50],
  ],
};

function evaluateBoard(chess: Chess): number {
  let score = 0;
  const board = chess.board();

  for (let row = 0; row < 8; row++) {
    for (let col = 0; col < 8; col++) {
      const piece = board[row][col];
      if (piece) {
        const pieceValue = PIECE_VALUES[piece.type] || 0;
        const positionValue = POSITION_BONUS[piece.type]?.[row]?.[col] || 0;
        const value = pieceValue + positionValue;
        score += piece.color === 'b' ? value : -value;
      }
    }
  }

  return score;
}

function minimax(
  chess: Chess,
  depth: number,
  alpha: number,
  beta: number,
  maximizingPlayer: boolean
): number {
  if (depth === 0 || chess.isGameOver()) {
    return evaluateBoard(chess);
  }

  const moves = chess.moves();

  if (maximizingPlayer) {
    let maxEval = -Infinity;
    for (const move of moves) {
      chess.move(move);
      const evaluation = minimax(chess, depth - 1, alpha, beta, false);
      chess.undo();
      maxEval = Math.max(maxEval, evaluation);
      alpha = Math.max(alpha, evaluation);
      if (beta <= alpha) break;
    }
    return maxEval;
  } else {
    let minEval = Infinity;
    for (const move of moves) {
      chess.move(move);
      const evaluation = minimax(chess, depth - 1, alpha, beta, true);
      chess.undo();
      minEval = Math.min(minEval, evaluation);
      beta = Math.min(beta, evaluation);
      if (beta <= alpha) break;
    }
    return minEval;
  }
}

function getBestMove(fen: string, depth: number): string | null {
  const chess = new Chess(fen);
  const moves = chess.moves();

  if (moves.length === 0) return null;

  let bestMove = moves[0];
  let bestValue = -Infinity;

  for (const move of moves) {
    chess.move(move);
    const value = minimax(chess, depth - 1, -Infinity, Infinity, false);
    chess.undo();

    if (value > bestValue) {
      bestValue = value;
      bestMove = move;
    }
  }

  return bestMove;
}

function getRandomMove(fen: string): string | null {
  const chess = new Chess(fen);
  const moves = chess.moves();
  if (moves.length === 0) return null;
  return moves[Math.floor(Math.random() * moves.length)];
}

export async function getAIMove(
  fen: string,
  difficulty: 'easy' | 'medium' | 'hard'
): Promise<string | null> {
  // Simulate thinking time
  await new Promise((resolve) => setTimeout(resolve, 300));

  switch (difficulty) {
    case 'easy':
      // 70% random moves, 30% depth 1
      if (Math.random() < 0.7) {
        return getRandomMove(fen);
      }
      return getBestMove(fen, 1);

    case 'medium':
      // Depth 2 search
      return getBestMove(fen, 2);

    case 'hard':
      // Depth 3 search
      return getBestMove(fen, 3);

    default:
      return getRandomMove(fen);
  }
}

export { evaluateBoard, getBestMove };