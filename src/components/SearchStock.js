import React, {useState} from 'react';
import 'bootstrap/dist/css/bootstrap.css';

function SearchStock({setStockName}) {
    const [input, setInput] = useState('');

    function addStock(e) {
        setStockName(input);
        e.preventDefault();
    }

    return(
        <div>
            <form onSubmit={addStock}>
            <label>
                Stock:
                <input style={{marginLeft: "5px"}} type="text" value={input} onChange={(e) => {setInput(e.target.value)}} />
            </label>
                <button className="btn-outline-primary" style={{marginLeft: "5px"}} type="submit">Display!</button>
            </form>
        </div>
    );
}

export default SearchStock;