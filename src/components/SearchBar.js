import React from 'react';

const SearchBar = ({ search, handleSearch }) => {
  return (
    <input
      type="text"
      placeholder="Search by Name"
      value={search}
      onChange={handleSearch}
    />
  );
};

export default SearchBar;
