'use client';
import React from 'react';
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



 function ChessBoard() {
  const [selectedPiece, setSelectedPiece] = React.useState<{row:number, col: number} | null> (null);
  const [board, setBoard] = React.useState(initialBoard)



  const isValidMove = (piece: string, fromRow: number, fromCol: number, toRow: number, toCol: number, board:string[][]):boolean => {
    const targetPiece = board[toRow][toCol];
    const isTargetOpponent = targetPiece && targetPiece[0] !== piece[0];
    switch (piece[1]) {
      case 'P': { // Pawn movement
        const direction = piece[0] === 'w' ? -1 : 1;
        if (fromCol === toCol && board[toRow][toCol] === '' && toRow === fromRow + direction) return true;
        if (fromCol === toCol && fromRow === (piece[0] === 'w' ? 6 : 1) && board[toRow][toCol] === '' && toRow === fromRow + 2 * direction) return true;
        if (Math.abs(fromCol - toCol) === 1 && toRow === fromRow + direction && isTargetOpponent) return true;
        break;
      }
      case 'R': { //Rook Movement
        if (fromRow === toRow || fromCol === toCol ){
          if (isClearPath(fromCol,fromRow,toCol,toRow,board)) return true
        };
        break;
 


      }
     
      
      

      
      default:
        break;
    }
  return false
  };
  
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

  const handleSquareClick = (row: number, col: number) => {
    if (selectedPiece) {
     
     const piece = board[selectedPiece.row][selectedPiece.col]
     const targetPiece = board[row][col]

      if(isValidMove(piece, selectedPiece.row,selectedPiece.col,row,col,board)){
     // Move the piece
     const newBoard = board.map((r, i) => r.map((c, j) => {
        if (i === selectedPiece.row && j === selectedPiece.col) return '';
        if (i === row && j === col) return board[selectedPiece.row][selectedPiece.col];
        return c;
      }));
      setBoard(newBoard);
    }
      setSelectedPiece(null);
    } else {
      // Select the piece
      if (board[row][col]) {
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
    <div className="chessboard">
      {board.map((row, rowIndex) => (
        <div className="row" key={rowIndex}>
          {row.map((col, colIndex) => renderSquare(rowIndex, colIndex))}
        </div>
      ))}
    </div>
  );
}

export default ChessBoard;

