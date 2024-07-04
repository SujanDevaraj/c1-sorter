import React from 'react';

const SortButtons = ({ sortByMarketCap, sortByPercentageChange }) => {
  return (
    <div>
      <button onClick={sortByMarketCap}>Sort by Market Cap</button>
      <button onClick={sortByPercentageChange}>Sort by Percentage Change</button>
    </div>
  );
};

export default SortButtons;
