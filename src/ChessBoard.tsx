'use client';


function Square(props: { isEven: any; }) {
    const  { isEven } = props;
    const backgroundColor = isEven ? 'rgb(255, 255, 255)' : '#000000';
  
    return (
      <div className="square" style={{ backgroundColor }}>
      </div>
    );
  }

 function ChessBoard() {
  
    const rows = [];
    for (let row = 0; row < 8; row++) {
      const squares = [];
      for (let col = 0; col < 8; col++) {
        const isEven = (row + col) % 2 === 0;
        squares.push(<Square key={`${row}-${col}`} isEven={isEven} />);
      }
      rows.push(<div className="row" key={row}>{squares}</div>);
    }
  
    return (
      <div className="ChessBoard ">
        {rows}
      </div>
    );
  }

export default ChessBoard;

