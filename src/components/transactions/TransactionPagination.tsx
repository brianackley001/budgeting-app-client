import React from 'react';
import { Pagination } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { getPagedTransactions, setActivePageItems, setTransactionPagination } from "@store/transactionSlice";
import { paginationLinkSet } from "@utils/transactionUtils"


export default function TrasactionPagination(props) {
  const { collectionTotal, itemsPerPage, currentPage } = props;
  const dispatch = useAppDispatch();

  const paginationConfig = useAppSelector(state => state.transactionSlice.transactionPagination);
  const activePageItems = useAppSelector(state => state.transactionSlice.activePageItems);

  const pages = Math.ceil(collectionTotal / itemsPerPage);
  const maxInteractivePages = Number(import.meta.env.VITE_TRANSACTION_PAGINATION_SET_SIZE) || 5;
  const interactivePages = activePageItems.length > 0 ?
    activePageItems :
    paginationLinkSet(currentPage, -1, maxInteractivePages, pages, false, false);

  const showLeftEllipsis = interactivePages[0] > 2;
  const showRightEllipsis = interactivePages[interactivePages.length - 1] <= pages - 1;
  const showLast = !interactivePages.includes(pages) && paginationConfig.pageNumber != pages;

  // Pagination Button Methods:
  const handleLastClick = () => {
    const activePageSet = paginationLinkSet(currentPage, pages, maxInteractivePages, pages, false, false);
    handleStateChange(pages, activePageSet);
  };

  const handleNextClick = () => {
    const activePageSet = paginationLinkSet(currentPage, -1, maxInteractivePages, pages, false, true);
    handleStateChange(paginationConfig.pageNumber + 1, activePageSet);
  };

  const handlePageClick = (page) => {
    const activePageSet = paginationLinkSet(currentPage, page, maxInteractivePages, pages, false, false);
    handleStateChange(page, activePageSet);
  };

  const handlePrevClick = () => {
    const activePageSet = paginationLinkSet(currentPage, -1, maxInteractivePages, pages, true, false);
    handleStateChange(paginationConfig.pageNumber - 1, activePageSet);
  };

  const handleStateChange = (pageNumber, activePageSet) => {
    const updatedPaginationConfig = {
      ...paginationConfig,
      pageNumber: pageNumber
    };
    
    dispatch(setTransactionPagination(updatedPaginationConfig));
    dispatch(setActivePageItems(activePageSet));
    dispatch(getPagedTransactions(updatedPaginationConfig));
  };

  return (
    <>
      <br />
      {pages && pages > 1 &&
        <Pagination className='transactionPaginationContainer' data-testid="transaction-pagination-container">
          
          {currentPage <=interactivePages.length &&  <Pagination.Prev onClick={handlePrevClick} key={-5} />}

          <Pagination.Item active={currentPage === 1} onClick={() => handlePageClick(1)}>{1}</Pagination.Item>
          {showLeftEllipsis && <Pagination.Ellipsis className='cursorNotAllowed' disabled />}
          {currentPage <=interactivePages.length && showLeftEllipsis && <Pagination.Prev onClick={handlePrevClick} key={-4} />}
          {currentPage > maxInteractivePages && <Pagination.Prev onClick={handlePrevClick} key={-1} />}

          {interactivePages.map((page, index) => (
            page > 1 && page != pages && <Pagination.Item active={currentPage == page} onClick={() => handlePageClick(page)} key={index}>{page}</Pagination.Item> ||
            !showLast && <Pagination.Item active={currentPage == pages} onClick={() => handlePageClick(page)} key={index}>{page}</Pagination.Item>
          ))}
          

          {currentPage != pages  && <Pagination.Next onClick={handleNextClick} key={-2} />}
          {showRightEllipsis && <Pagination.Ellipsis className='cursorNotAllowed' disabled />}
          {showLast && <Pagination.Item active={currentPage == pages} onClick={() => handleLastClick()} key={pages}>{pages}</Pagination.Item>}
        </Pagination>
      }
    </>
  );
}
