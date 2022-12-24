import { useState, useEffect } from 'react';

interface Data {
  // The shape of the data returned by the API endpoint
}

export const useApi = (
  search: string,
  page: number,
  sort: string
): [boolean, Error, Data | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState(null);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${search}&page=${page}&sort=${sort}`
      );
      const data = await response.json();
      setData(data);
    } catch (e) {
      setError(e);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    if (search && search.length > 2) {
      setData(null);
      setError(null);
      setLoading(true);
      fetchData();
    }
  }, [search, page, sort]);

  return [loading, error, data];
};
