import React, { useState, useEffect } from 'react';
import axios from 'axios';

const FetchData = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [sortField, setSortField] = useState('');
  const [sortOrder, setSortOrder] = useState('asc');

  // Fetch data using async/await
  const fetchDataAsync = async () => {
    try {
      const response = await axios.get('https://api.coingecko.com/api/v3/coins/markets', {
        params: {
          vs_currency: 'usd',
          order: 'market_cap_desc',
          per_page: 10,
          page: 1,
          sparkline: false
        }
      });
      setData(response.data);
      setFilteredData(response.data);
    } catch (error) {
      console.error('Error fetching data', error);
    }
  };

  // Fetch data using .then
  const fetchDataThen = () => {
    axios.get('https://api.coingecko.com/api/v3/coins/markets', {
      params: {
        vs_currency: 'usd',
        order: 'market_cap_desc',
        per_page: 10,
        page: 1,
        sparkline: false
      }
    })
    .then(response => {
      setData(response.data);
      setFilteredData(response.data);
    })
    .catch(error => {
      console.error('Error fetching data', error);
    });
  };

  useEffect(() => {
    fetchDataAsync();
    // Uncomment the line below to use fetchDataThen instead of fetchDataAsync
    // fetchDataThen();
  }, []);

  const handleSearch = () => {
    const filtered = data.filter(coin =>
      coin.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
    setFilteredData(filtered);
  };

  const handleSort = (field) => {
    const order = sortField === field && sortOrder === 'asc' ? 'desc' : 'asc';
    const sorted = [...filteredData].sort((a, b) => {
      if (a[field] < b[field]) return sortOrder === 'asc' ? -1 : 1;
      if (a[field] > b[field]) return sortOrder === 'asc' ? 1 : -1;
      return 0;
    });
    setSortField(field);
    setSortOrder(order);
    setFilteredData(sorted);
  };

  return (
    <div>
      <div>
        <input
          type="text"
          placeholder="Search..."
          value={searchTerm}
          onChange={e => setSearchTerm(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>
      <table>
       
        <tbody>
          {filteredData.map(coin => (
            <tr key={coin.id}>
              
              <td><img src={coin.image} alt={coin.name} width="30" height="30" /></td>
              <td>{coin.name}</td>
              <td>{coin.symbol.toUpperCase()}</td>
              <td>${coin.current_price.toLocaleString()}</td>
              <td>${coin.total_volume.toLocaleString()}</td>
              
              <td>{coin.price_change_percentage_24h}%</td>
              <td>${coin.market_cap}</td>
             
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default FetchData;
