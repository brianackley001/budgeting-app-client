import React , { useState } from 'react';
import { Pagination} from "react-bootstrap";


export default function TrasactionPagination(props) {
  const {collectionTotal, itemsPerPage, currentPage} = props;
  const pages = Math.ceil(collectionTotal / itemsPerPage);
  const maxPages = 6;
  const showFirst = pages > maxPages + 1;
  const showLast = pages > maxPages + 1;
  // const [paginationTotalItems, setPaginationTotalItems] = useState(100);
  // const [paginationItemsPerPage, setPaginationItemsPerPage] = useState(10);
  // const [paginationCurrentPage, setPaginationCurrentPage] = useState(1);
  
  return (
    <>
    <br />
    <Pagination className='transactionPaginationContainer'>
      <Pagination.First />
      <Pagination.Prev />
      <Pagination.Item>{1}</Pagination.Item>

      <Pagination.Item>{10}</Pagination.Item>
      <Pagination.Item>{11}</Pagination.Item>
      <Pagination.Item active>{12}</Pagination.Item>
      <Pagination.Item>{13}</Pagination.Item>

      <Pagination.Item>{20}</Pagination.Item>
      <Pagination.Next />
      <Pagination.Last />
      </Pagination>
    </>
  );
}
