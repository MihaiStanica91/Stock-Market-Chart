import React, {useState} from 'react';
import LineChart from './components/LineChart';
import SearchStock from './components/SearchStock';
import './App.css'

function App() {
    const [stockName, setStockName] = useState("");
    return (
      <div className='container'>
          <div className='searchBar'>
            <h1>Stock Market Graphic</h1>
            {<SearchStock setStockName={setStockName}/>}
          </div>
          <div className='lineChart'>
            {<LineChart name={stockName}/>}
          </div>
      </div>
    );
}

export default App;
