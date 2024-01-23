import React from 'react';
import { Pagination} from "react-bootstrap";
import { paginationLinkSet } from "@utils/transactionUtils"
import { useAxiosInterceptor } from "@/hooks/axiosInterceptor";
import { selectTransactionPagination, setPagedTransactions, setPaginationPageNumber } from "../../store/transactionSlice";
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";


export default function TrasactionPagination(props) {
  const {collectionTotal, itemsPerPage, currentPage} = props;
  const { axBe } = useAxiosInterceptor();
  const paginationConfig = useAppSelector(state => state.transactionSlice.transactionPagination);
  const dispatch = useAppDispatch();

  const pages = Math.ceil(collectionTotal / itemsPerPage);
  const maxInteractivePages = 5;
  let interactivePages = paginationLinkSet(currentPage, -1, maxInteractivePages, pages, -1, false, false); 
  const showLeftEllipsis = interactivePages[0] > 2;
  const showRightEllipsis = interactivePages[interactivePages.length-1] <= pages - 1;
  const showLast = !interactivePages.includes(pages);

  const handlePrevClick = () => {
    handleStateChange(paginationConfig.pageNumber - 1);
    interactivePages = paginationLinkSet(currentPage, -1, maxInteractivePages, pages, -1, true, false);
  };
  const handleNextClick = () => {
    handleStateChange(paginationConfig.pageNumber + 1);
    interactivePages = paginationLinkSet(currentPage, -1, maxInteractivePages, pages, -1, false, true);
  };

  const handlePageClick = (page, pageIndex) => {
    handleStateChange(page);
    interactivePages = paginationLinkSet(currentPage, page, maxInteractivePages, pages, pageIndex, false, false);
  };

  const handleFirstClick = () => {
    handleStateChange(1);
    interactivePages = paginationLinkSet(currentPage, 1, maxInteractivePages, pages, -1, false, false);
  };
  const handleLastClick = () => {
    handleStateChange(pages);
    interactivePages = paginationLinkSet(currentPage, pages, maxInteractivePages, pages, -1, false, false);
  };

  const handleStateChange = (pageNumber) => {
    dispatch(setPaginationPageNumber(pageNumber));
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
    { pages && pages > 1 && 
    <Pagination className='transactionPaginationContainer' data-testid="transaction-pagination-container">
      {currentPage != 1 && <Pagination.Item onClick={handleFirstClick} key={1} />}
      {currentPage > 1 && <Pagination.Prev onClick={handlePrevClick} key={-1} />}
      
      <Pagination.Item active={currentPage===1} onClick={() => handlePageClick(1, 1)}>{1}</Pagination.Item>
      {showLeftEllipsis && <Pagination.Ellipsis className='cursorNotAllowed' disabled />}

      {interactivePages.map((page, index) => (
        page > 1 && page != pages &&<Pagination.Item active={currentPage == page} onClick={() => handlePageClick(page, index)} key={index}>{page}</Pagination.Item>
      ))}

      {showRightEllipsis && <Pagination.Ellipsis className='cursorNotAllowed' disabled />}
      {showLast && <Pagination.Item active={currentPage == pages} onClick={() => handleLastClick()} key={pages}>{pages}</Pagination.Item>}
      {currentPage != pages && <Pagination.Next onClick={handleNextClick}key={-2}  />}
      </Pagination>
    }
    </>
  );
}
