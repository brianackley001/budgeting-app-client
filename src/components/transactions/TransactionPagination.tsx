import React , { useState } from 'react';
import { Pagination} from "react-bootstrap";
import {paginationLinkSet} from "@utils/transactionUtils"


export default function TrasactionPagination(props) {
  const {collectionTotal, itemsPerPage, currentPage} = props;
  const pages = Math.ceil(collectionTotal / itemsPerPage);
  const maxInteractivePages = 5;
  //let interactivePages = [2,3,4,5,6];
  //let interactivePages = [7,8,9,10,11];
  let interactivePages = paginationLinkSet(currentPage, -1, maxInteractivePages, pages, -1, false, false); //[3,4,5,6,7];
  const showLeftEllipsis = interactivePages[0] > 2;
  const showRightEllipsis = interactivePages[interactivePages.length-1] <= pages - 1;
  const showLast = !interactivePages.includes(pages);
  // const [paginationTotalItems, setPaginationTotalItems] = useState(100);
  // const [paginationItemsPerPage, setPaginationItemsPerPage] = useState(10);
  // const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);

  const handlePrevClick = () => {
    console.log('prev');
    interactivePages = paginationLinkSet(currentPage, -1, maxInteractivePages, pages, -1, true, false);
  };
  const handleNextClick = () => {
    console.log('next');
    interactivePages = paginationLinkSet(currentPage, -1, maxInteractivePages, pages, -1, false, true);
  };
  const handlePageClick = (page, pageIndex) => {
    console.log('page', page);
    interactivePages = paginationLinkSet(currentPage, page, maxInteractivePages, pages, pageIndex, false, false);
  };
  const handleFirstClick = () => {
    console.log('first');
    interactivePages = paginationLinkSet(currentPage, 1, maxInteractivePages, pages, -1, false, false);
  };
  const handleLastClick = () => {
    console.log('last');
    interactivePages = paginationLinkSet(currentPage, pages, maxInteractivePages, pages, -1, false, false);
  };
  return (
    <>
    <br />
    { pages && pages > 1 && 
    <Pagination className='transactionPaginationContainer' data-testid="transaction-pagination-container">
      {currentPage != 1 && <Pagination.Prev onClick={handleFirstClick} key={1} />}
      
      <Pagination.Item active={currentPage===1} onClick={() => handlePageClick(1, 1)}>{1}</Pagination.Item>
      {showLeftEllipsis && <Pagination.Ellipsis className='cursorNotAllowed' disabled />}

      {interactivePages.map((page, index) => (
        page > 1 && page != pages &&<Pagination.Item active={currentPage == page} onClick={() => handlePageClick(page, index)} key={index}>{page}</Pagination.Item>
      ))}

      {showRightEllipsis && <Pagination.Ellipsis className='cursorNotAllowed' disabled />}
      {showLast && <Pagination.Item active={currentPage == pages} onClick={() => handleLastClick()} key={pages}>{pages}</Pagination.Item>}
      {currentPage != pages && <Pagination.Next onClick={handleNextClick} />}
      </Pagination>
    }
    </>
  );
}
