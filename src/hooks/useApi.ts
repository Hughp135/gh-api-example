import { useState, useEffect } from 'react';

interface Data {
  // The shape of the data returned by the API endpoint
}

export const useApi = (search: string): [boolean, Error, Data | null] => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<any>(null);
  const [data, setData] = useState(null);

  useEffect(() => {
    async function fetchData() {
      setLoading(true);
      try {
        const response = await fetch(`https://my-api.com/search?q=${search}`);
        console.log(response);
        const data = await response.json();
        setData(data);
      } catch (e) {
        setError(e as Error);
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [search]);

  return [loading, error, data];
};
