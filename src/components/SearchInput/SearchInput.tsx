import React, { useState, useRef } from 'react';
import { debounce } from 'lodash';
import './SearchInput.css';
import { useMemo } from 'react';

interface SearchInputProps {
  onSearch: (search: string) => void;
}

export const SearchInput = (props: SearchInputProps) => {
  const { onSearch } = props;
  const [search, setSearch] = useState('');
  const searchInputRef = useRef<HTMLInputElement>(null);
  const debouncedSearch = useMemo(
    () =>
      debounce((value: string) => {
        onSearch(value);
      }, 100),
    [onSearch]
  );

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const value = event.target.value;
    setSearch(value);
    debouncedSearch(value);
  }

  function handleClear() {
    setSearch('');
    if (searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }

  return (
    <div className="search-input">
      <input
        type="text"
        value={search}
        onChange={handleChange}
        placeholder="Search"
        ref={searchInputRef}
      />
      {search && (
        <button type="button" onClick={handleClear}>
          Clear
        </button>
      )}
    </div>
  );
};
