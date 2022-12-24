import { useState, useEffect } from 'react';

export interface Repository {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  full_name: string;
}

export interface SearchResponse {
  items: Repository[];
  total_count: number;
}

export const useApi = (
  search: string,
  page: number,
  sort: string
): [boolean, Error, SearchResponse | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState(null);

  async function fetchData() {
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.github.com/search/repositories?q=${search}&page=${page}&sort=${sort}&per_page=5`
      );

      const data = await response.json();
      if (response.status === 403) {
        setError(
          new Error(
            'Please wait some time in between searches. The limit is 10 requests per minute.'
          )
        );
        setData(null);
      } else {
        setData(data);
      }
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

  console.log('error', error);

  return [loading, error, data];
};
