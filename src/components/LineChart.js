import React, {useState, useEffect} from 'react';
import { Line } from 'react-chartjs-2';
import {Chart as ChartJS} from 'chart.js/auto';

function LineChart({name}) {
    const [error, setError] = useState(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [highPrices, setHighPrices] = useState([]);
    const [lowPrices, setLowPrices] = useState([]);
    const [openPrices, setOpenPrice] = useState([]);
    const [days, setDays] = useState([]);
    
    // Note: the empty deps array [] means
    // this useEffect will run once
    // similar to componentDidMount()
    useEffect(() => {
        const API_key = "RGB0CI3AA5HQ99M7"
        fetch("https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol="+ name + "&apikey=" + API_key)
        .then(res => res.json())
        .then(
            (result) => {
                setIsLoaded(true);
                const allValues = (Object.keys(Object.entries(result)[1][1]));
                let openPrice = [];
                let highPrice = [];
                let lowPrice = [];
                for(let i = allValues.length - 1; i >=0 ; --i) {
                    openPrice.push(parseFloat(result['Time Series (Daily)'][allValues[i]]['1. open']));
                    highPrice.push(parseFloat(result['Time Series (Daily)'][allValues[i]]['2. high']));
                    lowPrice.push(parseFloat(result['Time Series (Daily)'][allValues[i]]['3. low']));
                }
                setOpenPrice(openPrice);
                setLowPrices(lowPrice);
                setHighPrices(highPrice);
                setDays(allValues);
            },
            // Note: it's important to handle errors here
            // instead of a catch() block so that we don't swallow
            // exceptions from actual bugs in components.
            (error) => {
            setIsLoaded(true);
            setError(error);
            }
        )
    }, [name])
    if (error) {
        return <div>Error: {error.message}</div>;
    } else if (!isLoaded) {
        return <div>Loading...</div>;
    } else {
        return (
            <div style={{width: 1100, height: 600}}>
                <Line
                    data = {
                        {
                            labels: days,
                            datasets: [
                                {
                                    label: 'Open prices',
                                    data : openPrices,
                                    backgroundColor: [
                                        'blue'
                                    ],
                                    borderColor: [
                                        'black'
                                    ],
                                    borderWidth: 1
                                },
                                {
                                    label: 'High prices',
                                    data : highPrices,
                                    backgroundColor: [
                                        'green'
                                    ],
                                    borderColor: [
                                        'black'
                                    ],
                                    borderWidth: 1
                                },
                                {
                                    label: 'Low prices',
                                    data : lowPrices,
                                    backgroundColor: [
                                        'red'
                                    ],
                                    borderColor: [
                                        'black'
                                    ],
                                    borderWidth: 1
                                }]
                    
                        }
                    }
                    options= {
                        {
                            maintainAspectRatio:false,
                        }
                    }
                />
            </div>
        );
    }
}

export default LineChart;