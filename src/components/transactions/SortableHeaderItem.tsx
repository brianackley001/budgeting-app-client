import React from "react";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from "@hooks/storeHooks";
import { getPagedTransactions, selectTransactionPagination, setPaginationSortBy, setPaginationSortDirection } from "@store/transactionSlice";


/**
 * Renders sort icon for transaction table headers and updates Redux state with new sort order
 * @param props
 */

export default function  SortableHeaderItem(props){
  const{ sortBy, sortLabel} = props;
  const paginationConfig = useAppSelector(state => state.transactionSlice.transactionPagination);

  const dispatch = useAppDispatch();
  const pagination = useAppSelector(selectTransactionPagination);

  const [sortDirection, setSortDirection] = pagination.sortBy === sortBy? 
    useState(pagination.sortDirection) :
    useState("");

  useEffect(() => {
    dispatch(setPaginationSortDirection(sortDirection));
    dispatch(setPaginationSortBy(sortBy));

  }, [sortDirection]);

  const handleSort = (direction, sortByValue) => {
    dispatch(setPaginationSortDirection(direction));
    dispatch(setPaginationSortBy(sortByValue));
    let updatedSortDirection = "";

    if (direction === "") {
      updatedSortDirection = "desc";
      setSortDirection(updatedSortDirection);
    } else if (direction === "asc") {
      updatedSortDirection = "desc";
      setSortDirection(updatedSortDirection);
    } else if (direction === "desc") {
      updatedSortDirection = "asc";
      setSortDirection(updatedSortDirection);
    }

    const updatedPaginationConfig = {
      ...paginationConfig,
      sortBy: sortByValue,
      sortDirection: updatedSortDirection,
    };
    dispatch(getPagedTransactions(updatedPaginationConfig));
  }

  return (
    <>
      {sortDirection === "" && <span  onClick={() => handleSort("", sortBy)}>{sortLabel}&nbsp;&nbsp;<FontAwesomeIcon size="sm" icon={faSort} style={{ color: "#9997a1", }} /></span>}
      {sortDirection === "asc" && <span  onClick={() => handleSort("asc", sortBy)}>{sortLabel}&nbsp;&nbsp;<FontAwesomeIcon size="sm" icon={faSortUp} style={{ color: "#9997a1", }} /></span>}
      {sortDirection === "desc" && <span  onClick={() => handleSort("desc", sortBy)}>{sortLabel}&nbsp;&nbsp;<FontAwesomeIcon size="sm" icon={faSortDown} style={{ color: "#9997a1", }} /></span>}
    </>
  );
}