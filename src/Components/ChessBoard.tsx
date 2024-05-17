'use client';
import React from 'react';
import SquareWithLabel from './SquareWithLabel';
import { Chessboard } from 'react-chessboard';
 function ChessBoard() {

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const pieces = ['R', 'N', 'B', 'Q', 'K', 'B', 'N', 'R'];

    const rows = [];
    for (let row = 0; row < 8; row++) {
      const squares = [];
      for (let col = 0; col < 8; col++) {
        let piece = '';
   
        if (row === 0) {
        piece = pieces[col];
        
      }  
      else if (row === 1) {
        piece = 'P';
      }
      else if (row === 6) {
        piece = 'P';
      }
      else if (row === 7) {
        piece = pieces[col];
      }

          
          const index = letters[col] + numbers[row];
          const isEven = (row + col) % 2 === 0;

        squares.push(
        <SquareWithLabel 
          key={index} 
          label={index} 
          isEven={isEven}
          pieces={piece}
          />);
        
        
      }
      rows.push(<div className="row" key={row}>{squares} </div>);
    }
  
    return (
      <div className="ChessBoard ">
        {rows}
      </div>
    );
  }

export default ChessBoard;

