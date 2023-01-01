import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [currentValue, setCurrentValue] = useState(0);
  const [averageValue, setAverageValue] = useState(0);

  let previousValues = [];

  const fetchData = async () => {
    const response = await axios.get('https://api.coindesk.com/v1/bpi/currentprice.json');
    setCurrentValue(response.data.bpi.USD.rate);

    let value = response.data.bpi.USD.rate;
    value = value.replace(/[^0-9.-]+/g, "");
    value = Number(value);

    previousValues.push(value);

    if (previousValues.length > 10) {
      previousValues.shift();
    }

    let sum = 0;
    for (let i = 0; i < previousValues.length; i++) {
      sum += previousValues[i];
    }
    let average = sum / previousValues.length;
    setAverageValue(average.toFixed(2));
  };

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchData();
    }, 10000);
    return () => clearInterval(interval);
  }, []);

  const formatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 2
  });

  let averageValueFormatted = formatter.format(averageValue);

  return (
    <div>
      <h1>Bitcoin Value</h1>
      <p>The current value of Bitcoin is ${currentValue}</p>
      <p>The average value over the last 10 minutes is $ {averageValueFormatted}</p>
    </div>
  );
}

export default App;