import React from 'react';
import chessPieceSprite from './chess-pieces.png';


type Piece = 'wK' | 'wQ' | 'wR' | 'wB' | 'wN' | 'wP' | 'bK' | 'bQ' | 'bR' | 'bB' | 'bN' | 'bP'| '';

type Position = {
  x: number;
  y: number;
};

const piecePositions: Record<Piece, Position> = {
  wK: { x: 0, y: 0 },
  wQ: { x: 79, y: 0 },
  wB: { x: 158, y: 0 },
  wN: { x: 237, y: 0 },
  wR: { x: 316, y: 0 },
  wP: { x: 395, y: 0 },
  bK: { x: 0, y: 79 },
  bQ: { x: 79, y: 79 },
  bB: { x: 158, y: 79 },
  bN: { x: 237, y: 79 },
  bR: { x: 316, y: 79 },
  bP: { x: 395, y: 79 },
  '' : { x: 0, y: 0 },
};

interface SquareWithLabelProps {
  label: string;
  isEven: boolean;
  piece?: string;
  onClick: () => void;
  isCheckmate?: boolean;
  
}

const pieceSize = 79;

const SquareWithLabel: React.FC<SquareWithLabelProps> = ({ label, isEven, piece, onClick, isCheckmate}) => {
  const backgroundColor = isEven ? 'rgb(216, 141, 66)' : 'rgb(173, 92, 0)';
  

  return (
    <div className="square-container" onClick={onClick}>
      <div className="square" style={{ backgroundColor }}></div>
      <span className="index">{label}</span>
      {piece && piece !== '' && piecePositions[piece as Piece] && (
        <div
          className="piece"
          style={{
            backgroundImage: `url(${chessPieceSprite})`,
            backgroundPosition: `-${piecePositions[piece as Piece].x}px -${piecePositions[piece as Piece].y}px`,
            width: `${pieceSize}px`,
            height: `${pieceSize}px`,
            backgroundSize: `${pieceSize * 6}px ${pieceSize * 2}px`,
          }}
        />
      )}
      {isCheckmate && (
        <div className="checkmate-message">
          Checkmate!
        </div>
      )}
    </div>
  );
}

export default SquareWithLabel;
