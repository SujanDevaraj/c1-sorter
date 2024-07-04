import React, { useState, useEffect } from 'react';
import './App.css';
import SearchBar from './components/SearchBar';
import SortButtons from './components/SortButtons';
import CoinTable from './components/CoinTable';

const API_URL = 'https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=10&page=1&sparkline=false';

function App() {
  const [coins, setCoins] = useState([]);
  const [search, setSearch] = useState('');

  useEffect(() => {
    // Fetch data using .then
    fetch(API_URL)
      .then(response => response.json())
      .then(data => setCoins(data))
      .catch(error => console.error('Error fetching data with .then:', error));
  }, []);

  const fetchData = async () => {
    try {
      const response = await fetch(API_URL);
      const data = await response.json();
      setCoins(data);
    } catch (error) {
      console.error('Error fetching data with async/await:', error);
    }
  };

  useEffect(() => {
    // Fetch data using async/await
    fetchData();
  }, []);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  const filteredCoins = coins.filter(coin =>
    coin.name.toLowerCase().includes(search.toLowerCase())
  );

  const sortByMarketCap = () => {
    const sortedCoins = [...coins].sort((a, b) => b.market_cap - a.market_cap);
    setCoins(sortedCoins);
  };

  const sortByPercentageChange = () => {
    const sortedCoins = [...coins].sort((a, b) => b.price_change_percentage_24h - a.price_change_percentage_24h);
    setCoins(sortedCoins);
  };

  return (
    <div className="App">
      <h1>Crypto Dashboard</h1>
      <SearchBar search={search} handleSearch={handleSearch} />
      <SortButtons sortByMarketCap={sortByMarketCap} sortByPercentageChange={sortByPercentageChange} />
      <CoinTable coins={filteredCoins} />
    </div>
  );
}

export default App;
