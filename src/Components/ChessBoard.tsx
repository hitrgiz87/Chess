'use client';
import React, { useState } from 'react';
import SquareWithLabel from './SquareWithLabel';

const initialBoard = [
  ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
  ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
  ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR']
];

const boardInCheck = [
  ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'],
  ['bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP'],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', 'wQ', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
  ['wR', 'wN', 'wB', '', 'wK', 'wB', 'wN', 'wR']
];



type BoardType = any; 

 function ChessBoard() {
  const [selectedPiece, setSelectedPiece] = React.useState<{row:number, col: number} | null> (null);
  const [board, setBoard] = React.useState(boardInCheck)
  const [isWhiteTurn, setIsWhiteTurn] = useState(true)
  const [isCheckmate, setIsCheckmate] = useState(false);

  const isClearPath = (fromRow: number, fromCol: number, toRow: number, toCol: number, board: BoardType): boolean => {
    const rowStep = toRow > fromRow ? 1 : toRow < fromRow ? -1 : 0;
    const colStep = toCol > fromCol ? 1 : toCol < fromCol ? -1 : 0;
  
    let currentRow = fromRow + rowStep;
    let currentCol = fromCol + colStep;
  
    while (currentRow !== toRow || currentCol !== toCol) {
      if (board[currentRow][currentCol] !== '') return false;
      currentRow += rowStep;
      currentCol += colStep;
    }
  
    return true;
  };

  const isInCheck = (board: BoardType, isWhite: boolean): boolean => {
    const king = isWhite ? 'wK' : 'bK';
    const opponent = isWhite ? 'b' : 'w';
  
    // Find the king's position
    let kingRow = -1;
    let kingCol = -1;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] === king) {
          kingRow = i;
          kingCol = j;
          break;
        }
      }
      if (kingRow !== -1) break;
    }
  
    if (kingRow === -1 || kingCol === -1) return false;
  
    // Check if any opponent piece can attack the king
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] && board[i][j][0] === opponent) {
          if (isValidMove(board[i][j], i, j, kingRow, kingCol, board, false)) {
            console.log(`King is in check from piece at (${i}, ${j})`);
            return true;
          }
        }
      }
    }
  
    return false;
  };

  const isCheckmate = (board: BoardType, isWhite: boolean): boolean => {
    if (!isInCheck(board, isWhite)) return false;
  
    const king = isWhite ? 'wK' : 'bK';
    const opponent = isWhite ? 'b' : 'w';
  
    // Find the king's position
    let kingRow = -1;
    let kingCol = -1;
    for (let i = 0; i < 8; i++) {
      for (let j = 0; j < 8; j++) {
        if (board[i][j] === king) {
          kingRow = i;
          kingCol = j;
          break;
        }
      }
      if (kingRow !== -1) break;
    }
  
    if (kingRow === -1 || kingCol === -1) return false;
  
    // Check if the king can move to any adjacent square
    const directions = [
      [-1, -1], [-1, 0], [-1, 1],
      [0, -1],         [0, 1],
      [1, -1], [1, 0], [1, 1]
    ];
  
    for (const [dx, dy] of directions) {
      const newRow = kingRow + dx;
      const newCol = kingCol + dy;
      if (newRow >= 0 && newRow < 8 && newCol >= 0 && newCol < 8) {
        if (board[newRow][newCol] === '' || board[newRow][newCol][0] === opponent) {
          const newBoard = board.map((r, i) => r.map((c, j) => {
            if (i === kingRow && j === kingCol) return '';
            if (i === newRow && j === newCol) return king;
            return c;
          }));
          if (!isInCheck(newBoard, isWhite)) return false;
        }
      }
    }
  
    return true;
  };

  const isValidMove = (piece: string, fromRow: number, fromCol: number, toRow: number, toCol: number, board: BoardType, checkCheck: boolean = true): boolean => {
    const targetPiece = board[toRow][toCol];
    const isTargetOpponent = targetPiece && targetPiece[0] !== piece[0];
  
    if (targetPiece && targetPiece[0] === piece[0]) {
      return false;
    }
  
    if (checkCheck && isInCheck(board, piece[0] === 'w')) {
      return false;
    }
  
    switch (piece[1]) {
      case 'P': { // Pawn movement
        const direction = piece[0] === 'w' ? -1 : 1;
        if (fromCol === toCol && board[toRow][toCol] === '' && toRow === fromRow + direction) return true;
        if (fromCol === toCol && fromRow === (piece[0] === 'w' ? 6 : 1) && board[toRow][toCol] === '' && toRow === fromRow + 2 * direction) return true;
        if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow + direction && isTargetOpponent) return true;
        break;
      }
      case 'R': { // Rook movement
        if (fromRow === toRow || fromCol === toCol) {
          if (isClearPath(fromRow, fromCol, toRow, toCol, board)) return true;
        }
        break;
      }
      case 'N': { // Knight movement
        if ((Math.abs(fromRow - toRow) === 2 && Math.abs(fromCol - toCol) === 1) ||
            (Math.abs(fromRow - toRow) === 1 && Math.abs(fromCol - toCol) === 2)) {
          return true;
        }
        break;
      }
      case 'B': { // Bishop movement
        if (Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
          if (isClearPath(fromRow, fromCol, toRow, toCol, board)) return true;
        }
        break;
      }
      case 'Q': { // Queen movement
        if (fromRow === toRow || fromCol === toCol || Math.abs(fromRow - toRow) === Math.abs(fromCol - toCol)) {
          if (isClearPath(fromRow, fromCol, toRow, toCol, board)) return true;
        }
        break;
      }
      case 'K': { // King movement
        if (Math.abs(fromRow - toRow) <= 1 && Math.abs(fromCol - toCol) <= 1) {
          return true;
        }
        break;
      }
      default:
        break;
    }
    return false;
  };
  
  

  const handleSquareClick = (row: number, col: number) => {
    if (selectedPiece) {
      if (selectedPiece.row === row && selectedPiece.col === col) {
        setSelectedPiece(null); // Deselecting the piece if the same square is clicked
        return;
      }
      const piece = board[selectedPiece.row][selectedPiece.col];
      

      if (isValidMove(piece, selectedPiece.row, selectedPiece.col, row, col, board)) {
        const newBoard = board.map((r, i) => r.map((c, j) => {
          if (i === selectedPiece.row && j === selectedPiece.col) return '';
          if (i === row && j === col) return piece;
          return c;
        }));
 
        setBoard(newBoard);
        setIsWhiteTurn(!isWhiteTurn);
        setSelectedPiece(null); // Clear selection after move

        if (isCheckmate(newBoard, !isWhiteTurn)) {
          setIsCheckmate(true);
          alert(`${isWhiteTurn ? "Black" : "White"} wins by checkmate!`);
        }
      } else {
        setSelectedPiece(null); // Clear selection if move is invalid
      }
    } else {
      if (board[row][col] && ((isWhiteTurn && board[row][col][0] === 'w') || (!isWhiteTurn && board[row][col][0] === 'b'))) {
        setSelectedPiece({ row, col });
      }
    }
  };



  const renderSquare = (row: number, col: number) => {
    const piece = board[row][col];
    const index = String.fromCharCode(65 + col) + (8 - row).toString(); // For example: A1, B2
    const isEven = (row + col) % 2 === 0;

    return (
      <SquareWithLabel
        key={index}
        label={index}
        isEven={isEven}
        piece={piece}
        onClick={() => handleSquareClick(row, col)}
      />
    );
  };



  return (
   
    <div className="board-container">
      <div className="turn-indicator">
        {isWhiteTurn ? "White's turn" : "Black's turn"}
      </div>
      <div className="chessboard">
        {board.flatMap((row, rowIndex) => (
          row.map((_, colIndex) => renderSquare(rowIndex, colIndex))
        ))}
      </div>
    </div>
  );
};

export default ChessBoard;

