'use client';
import React from 'react';
import SquareWithLabel from './SquareWithLabel';




 function ChessBoard() {

  const letters = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H'];
  const numbers = ['1', '2', '3', '4', '5', '6', '7', '8'];
  const whitePieces = ['wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR'];
  const blackPieces = ['bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR'];




    const rows = [];
    for (let row = 0; row < 8; row++) {
      const squares = [];
      for (let col = 0; col < 8; col++) {
        let piece = '';
   
        if (row === 0) {
        piece = whitePieces[col];
        
      }  
      else if (row === 1) {
        piece = 'wP';
      }
      else if (row === 6) {
        piece = 'bP';
      }
      else if (row === 7) {
        piece = blackPieces[col];
      }
       
          
          const index = letters[col] + numbers[row];
          const isEven = (row + col) % 2 === 0;

        squares.push(
        <SquareWithLabel 
          key={index} 
          label={index} 
          isEven={isEven}
          piece={piece}
          onClick={() => console.log(index)}
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

