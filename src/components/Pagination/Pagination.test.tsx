import { render, fireEvent } from '@testing-library/react';
import React from 'react';
import { Pagination } from './Pagination';

describe('Pagination', () => {
  it('renders the correct number of page buttons', () => {
    const { getAllByRole } = render(
      <Pagination
        currentPage={1}
        totalResults={100}
        onPageChange={jest.fn()}
        perPage={10}
      />
    );
    const pageButtons = getAllByRole('button');
    expect(pageButtons).toHaveLength(12);
  });

  it('calls the onPageChange callback with the correct page number when a page button is clicked', () => {
    const onPageChange = jest.fn();
    const { getAllByRole } = render(
      <Pagination
        currentPage={1}
        totalResults={100}
        onPageChange={onPageChange}
        perPage={10}
      />
    );
    const pageButtons = getAllByRole('button');
    fireEvent.click(pageButtons[2]);
    expect(onPageChange).toHaveBeenCalledWith(2);
  });

  it('disables the previous button on the first page', () => {
    const { getByText } = render(
      <Pagination
        currentPage={1}
        totalResults={100}
        onPageChange={jest.fn()}
        perPage={10}
      />
    );
    const previousButton = getByText('Prev');
    expect(previousButton).toHaveAttribute("aria-disabled", "true");
  });

  it('disables the next button on the last page', () => {
    const { getByText } = render(
      <Pagination
        currentPage={10}
        totalResults={100}
        onPageChange={jest.fn()}
        perPage={10}
      />
    );
    const nextButton = getByText('Next');
    expect(nextButton).toHaveAttribute("aria-disabled", "true");
  });
});
