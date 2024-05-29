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
  ['', '', '', 'wQ', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['', '', '', '', '', '', '', ''],
  ['wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP'],
  ['wR', 'wN', 'wB', '', 'wK', 'wB', 'wN', 'wR']
];



type BoardType = any; 

 function ChessBoard() {
  const [selectedPiece, setSelectedPiece] = React.useState<{row:number, col: number} | null> (null);
  const [board, setBoard] = React.useState(boardInCheck )
  const [isWhiteTurn, setIsWhiteTurn] = useState(true)

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




  const isValidMove = (piece: string, fromRow: number, fromCol: number, toRow: number, toCol: number, board: BoardType): boolean => {
    const targetPiece = board[toRow][toCol];
    const isTargetOpponent = targetPiece && targetPiece[0] !== piece[0];

    if (targetPiece && targetPiece[0]=== piece[0]){
      return false;

    }

    if (targetPiece && targetPiece[1] === 'K'){
  
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

