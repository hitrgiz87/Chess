import { Chessboard } from "react-chessboard";

function SquareWithLabel(props: { label: string; isEven: boolean; pieces: string}) {
  const { label, isEven, pieces } = props;
  const backgroundColor = isEven ? 'rgb(255, 255, 255)' : '#000000';

  return (
    <div className="square-container">
      <div className="square" style={{ backgroundColor }}></div>
      <a className="index">{label}</a>
      {pieces && <span className="piece">{pieces}</span>} 
      
    </div>
  );
}

export default SquareWithLabel;
