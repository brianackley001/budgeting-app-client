import React , { useState } from 'react';
import { Pagination} from "react-bootstrap";


export default function TrasactionPagination(props) {
  const {collectionTotal, itemsPerPage, currentPage} = props;
  const pages = Math.ceil(collectionTotal / itemsPerPage);
  const maxInteractivePages = 5;
  //let interactivePages = [2,3,4,5,6];
  //let interactivePages = [7,8,9,10,11];
  let interactivePages = [3,4,5,6,7];
  const showLeftEllipsis = interactivePages[0] > 2;
  const showRightEllipsis = interactivePages[interactivePages.length-1] <= pages - 1;
  const showLast = !interactivePages.includes(pages);
  // const [paginationTotalItems, setPaginationTotalItems] = useState(100);
  // const [paginationItemsPerPage, setPaginationItemsPerPage] = useState(10);
  // const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);

  const handlePrevClick = () => {
    console.log('prev');
  };
  const handleNextClick = () => {
    console.log('next');
  };
  const handlePageClick = (page) => {
    console.log('page', page);
  };
  const handleFirstClick = () => {
    console.log('first');
  };
  const handleLastClick = () => {
    console.log('last');
  };
  return (
    <>
    <br />
    <Pagination className='transactionPaginationContainer' data-testid="transaction-pagination-container">
      {currentPage != 1 && <Pagination.Prev onClick={handlePrevClick} />}
      
      <Pagination.Item active={currentPage == 1} onClick={() => handlePageClick(1)}>{1}</Pagination.Item>
      {showLeftEllipsis && <Pagination.Ellipsis className='cursorNotAllowed' disabled />}
      {interactivePages.map((page) => (
        <Pagination.Item active={currentPage == page} onClick={() => handlePageClick(page)}>{page}</Pagination.Item>
      ))}
      {showRightEllipsis && <Pagination.Ellipsis className='cursorNotAllowed' disabled />}
      {showLast && <Pagination.Item active={currentPage == pages} onClick={() => handlePageClick(pages)}>{pages}</Pagination.Item>}
      {currentPage != pages && <Pagination.Next onClick={handleNextClick} />}
      </Pagination>
    </>
  );
}
