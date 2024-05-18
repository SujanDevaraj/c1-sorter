import React from 'react';
import FetchData from './components/FetchData';
import './App.css';

const App = () => {
  return (
    <div className="App">
      <h1>Cryptocurrency Prices</h1>
      <FetchData />
    </div>
  );
};

export default App;
