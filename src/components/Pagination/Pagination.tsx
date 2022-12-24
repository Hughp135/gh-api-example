import React from 'react';
import Paginate from 'react-paginate';
import './Pagination.css';

interface Props {
  currentPage: number;
  totalResults: number;
  onPageChange: (page: number) => void;
  perPage: number;
}

export const Pagination: React.FC<Props> = ({
  currentPage,
  totalResults,
  onPageChange,
  perPage,
}) => {
  const pageCount = Math.ceil(totalResults / perPage);

  return (
    <Paginate
      pageCount={pageCount}
      pageRangeDisplayed={16}
      marginPagesDisplayed={0}
      previousLabel="Prev"
      nextLabel="Next"
      breakLabel="..."
      breakClassName="break-me"
      containerClassName="pagination"
      activeClassName="active"
      onPageChange={({ selected }) => onPageChange(selected + 1)}
      forcePage={currentPage - 1}
    />
  );
};
