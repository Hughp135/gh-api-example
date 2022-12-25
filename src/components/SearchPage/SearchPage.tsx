import React, { useState } from 'react';
import { useApi } from '../../hooks/useApi';
import { Dropdown } from '../Dropdown/Dropdown';
import { Pagination } from '../Pagination/Pagination';
import { SearchInput } from '../SearchInput/SearchInput';
import SearchResults from '../SearchResults/SearchResults';

export const SearchPage = () => {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);
  const [sort, setSort] = useState('');
  const [loading, error, data] = useApi(search, page, sort);

  return (
    <div className="container">
      <h1>Search Github Repositories</h1>
      <SearchInput
        onSearch={(input) => {
          setSearch(input);
          setPage(1);
        }}
      />
      {data && (
        <div>
          <p>Sort results by:</p>
          <Dropdown
            onChange={(value) => {
              setSort(value);
              setPage(1);
            }}
          />
          {data.total_count > 0 && (
            <Pagination
              onPageChange={(value) => setPage(value)}
              totalResults={data.total_count}
              currentPage={page}
              perPage={5}
            />
          )}
          <h2>Results (total: {data.total_count || 0})</h2>
          {data.items && <SearchResults data={data.items} />}
        </div>
      )}
      {loading && <p>Loading...</p>}
      {error && <p className="error">{'Error: ' + error.message}</p>}
    </div>
  );
};
