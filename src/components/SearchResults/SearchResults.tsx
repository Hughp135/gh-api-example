import React from 'react';
import { Repository } from '../../hooks/useApi';

export const SearchResults = ({ data }: { data: Repository[] }) => {
  return (
    <div className="search-results">
      {data.map((repo) => (
        <div key={repo.id} className="repo">
          <h3>
            <a href={repo.html_url} target="_blank">{repo.full_name}</a>
          </h3>
          <p>{repo.description}</p>
          <p>
            <strong>Stars:</strong> {repo.stargazers_count}
          </p>
          <p>
            <strong>Forks:</strong> {repo.forks_count}
          </p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
