import React from 'react';
import { Pagination} from "react-bootstrap";
import { paginationLinkSet } from "@utils/transactionUtils"
import { useAxiosInterceptor } from "@/hooks/axiosInterceptor";
import { setActivePageItems, setPagedTransactions, setPaginationPageNumber } from "../../store/transactionSlice";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";


export default function TrasactionPagination(props) {
  const {collectionTotal, itemsPerPage, currentPage} = props;
  const { axBe } = useAxiosInterceptor();
  const dispatch = useAppDispatch();
  const paginationConfig = useAppSelector(state => state.transactionSlice.transactionPagination);
  const activePageItems = useAppSelector(state => state.transactionSlice.activePageItems);

  const pages = Math.ceil(collectionTotal / itemsPerPage);
  const maxInteractivePages = 5;
  const interactivePages = activePageItems.length > 0 ? 
    activePageItems : 
    paginationLinkSet(currentPage, -1, maxInteractivePages, pages, -1, false, false); 

  const showLeftEllipsis = interactivePages[0] > 2;
  const showRightEllipsis = interactivePages[interactivePages.length-1] <= pages - 1;
  const showLast = !interactivePages.includes(pages) && paginationConfig.pageNumber != pages;

  const handlePrevClick = () => {
    const activePageSet = paginationLinkSet(currentPage, -1, maxInteractivePages, pages, -1, true, false);
    handleStateChange(paginationConfig.pageNumber - 1, activePageSet);
  };
  const handleNextClick = () => {
    const activePageSet = paginationLinkSet(currentPage, -1, maxInteractivePages, pages, -1, false, true);
    handleStateChange(paginationConfig.pageNumber + 1, activePageSet);
  };

  const handlePageClick = (page, pageIndex) => {
    const activePageSet = paginationLinkSet(currentPage, page, maxInteractivePages, pages, pageIndex, false, false);
    handleStateChange(page, activePageSet);
  };

  const handleFirstClick = () => {
    const activePageSet = paginationLinkSet(currentPage, 1, maxInteractivePages, pages, -1, false, false);
    handleStateChange(1, activePageSet);
  };
  const handleLastClick = () => {
    const activePageSet = paginationLinkSet(currentPage, pages, maxInteractivePages, pages, -1, false, false);
    handleStateChange(pages, activePageSet);
  };

  const handleStateChange = (pageNumber, activePageSet) => {
    dispatch(setPaginationPageNumber(pageNumber));
    dispatch(setActivePageItems(activePageSet));

    const updatedPaginationConfig = {
      ...paginationConfig,
      pageNumber: pageNumber
    };

    axBe.post("/transactions", updatedPaginationConfig)
      .then((response) => {
        dispatch(setPagedTransactions(response.data));
      })
      .catch((error) => {
        // Handle any errors
        console.log(error);
      });
  };

  return (
    <>
      <br />
      {pages && pages > 1 &&
        <Pagination className='transactionPaginationContainer' data-testid="transaction-pagination-container">
          
          {currentPage <=interactivePages.length &&  <Pagination.Prev onClick={handlePrevClick} key={-1} />}

          <Pagination.Item active={currentPage === 1} onClick={() => handlePageClick(1, 1)}>{1}</Pagination.Item>
          {showLeftEllipsis && <Pagination.Ellipsis className='cursorNotAllowed' disabled />}
          {currentPage <=interactivePages.length && showLeftEllipsis && <Pagination.Prev onClick={handlePrevClick} key={-1} />}
          {currentPage > maxInteractivePages && <Pagination.Prev onClick={handlePrevClick} key={-1} />}

          {interactivePages.map((page, index) => (
            page > 1 && page != pages && <Pagination.Item active={currentPage == page} onClick={() => handlePageClick(page, index)} key={index}>{page}</Pagination.Item> ||
            !showLast && <Pagination.Item active={currentPage == pages} onClick={() => handlePageClick(page, index)} key={index}>{page}</Pagination.Item>
          ))}
          


          {currentPage != pages  && <Pagination.Next onClick={handleNextClick} key={-2} />}
          {showRightEllipsis && <Pagination.Ellipsis className='cursorNotAllowed' disabled />}
          {showLast && <Pagination.Item active={currentPage == pages} onClick={() => handleLastClick()} key={pages}>{pages}</Pagination.Item>}
        </Pagination>
      }
    </>
  );
}
