import React from 'react';

const CoinTable = ({ coins }) => {
  return (
    <table>
   
      <tbody>
        {coins.map(coin => (
          <tr key={coin.id}>
            <td class="imgname"><img src={coin.image} alt={coin.name} width="30" height="30"  />{coin.name}</td>
            <td>{coin.symbol.toUpperCase()}</td>
            <td>${coin.current_price}</td>
            <td>${coin.total_volume.toLocaleString()}</td>
            <td>{coin.price_change_percentage_24h} %</td>
            <td>Mkd Cap : {coin.market_cap}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default CoinTable;
