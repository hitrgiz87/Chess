import ReactDOM from 'react-dom/client'

import './index.css'
import ChessBoard from './Components/ChessBoard.tsx'

ReactDOM.createRoot(document.getElementById('root')!).render(

    <div className='boardContainer'>

        <ChessBoard isCheckmate={false} />
    
    </div>
    


    



  
)
