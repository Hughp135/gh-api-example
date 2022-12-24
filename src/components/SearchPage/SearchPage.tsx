import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { SearchInput } from '../SearchInput/SearchInput';

export const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [loading, error, data] = useApi(search, page, sort);

  return (
    <div className="container">
      <SearchInput
        onSearch={(input) => {
          setSearch(input);
        }}
      />
      {loading && 'Loading...'}
      {error && 'Error ' + error.message}
      {JSON.stringify(data)}
    </div>
  );
};
