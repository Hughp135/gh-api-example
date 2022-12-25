import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import { SearchPage } from './SearchPage';
import { useApi } from '../../hooks/useApi';

jest.mock('../../hooks/useApi');

describe('SearchPage', () => {
  beforeEach(() => {
    (useApi as jest.Mock).mockReturnValue([
      false,
      null,
      { total_count: 100, items: [] },
    ]);
  });

  it('should render the search input and the sort dropdown', () => {
    const { getByText, getByPlaceholderText } = render(<SearchPage />);
    expect(getByPlaceholderText('Search repositories...')).toBeInTheDocument();
    expect(getByText('Sort results by:')).toBeInTheDocument();
  });

  it('should update the search query and reset the page when the search input is submitted', () => {
    const { getByPlaceholderText } = render(<SearchPage />);
    const input = getByPlaceholderText(
      'Search repositories...'
    ) as HTMLInputElement;
    fireEvent.change(input, { target: { value: 'react' } });
    fireEvent.submit(input);
    expect(input.value).toBe('react');
  });

  it('should render the pagination component if the total number of results is greater than zero', () => {
    const { getByText } = render(<SearchPage />);
    expect(getByText('Results (total: 100)')).toBeInTheDocument();
    expect(getByText('1')).toBeInTheDocument();
  });

  it('should render the loading message when loading is true', () => {
    (useApi as jest.Mock).mockReturnValue([true, null, null]);
    const { getByText } = render(<SearchPage />);
    expect(getByText('Loading...')).toBeInTheDocument();
  });

  it('should render the error message when there is an error', () => {
    (useApi as jest.Mock).mockReturnValue([
      false,
      new Error('API error'),
      null,
    ]);
    const { getByText } = render(<SearchPage />);
    expect(getByText('Error: API error')).toBeInTheDocument();
  });
});
