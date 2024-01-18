import React from "react";
import { useEffect, useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { selectAccessToken } from "../../store/msalSlice";
import { selectTransactionPagination, setPaginationSortBy, setPaginationSortDirection } from "../../store/transactionSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";


/**
 * Renders sort icon for transaction table headers and updates Redux state with new sort order
 * @param props
 */

export default function  SortableHeader(props){
  const{ sortBy} = props;
  const accessToken = useAppSelector(selectAccessToken);
  const dispatch = useAppDispatch();
  const pagination = useAppSelector(selectTransactionPagination);

  const [sortDirection, setSortDirection] = pagination.sortBy === sortBy? 
    useState(pagination.sortDirection) :
    useState("");

  useEffect(() => {
    dispatch(setPaginationSortDirection(sortDirection));
  }, [sortDirection]);

  const handleSort = (direction) => {
    if (direction === "") {
      setSortDirection("asc");
    } else if (direction === "asc") {
      setSortDirection("desc");
    } else if (direction === "desc") {
      setSortDirection("asc");
    }

    dispatch(setPaginationSortBy(sortBy));
  }

  return (
    <>
        {sortDirection === "" ? <FontAwesomeIcon size="sm" icon={faSort} onClick={() => handleSort("")}  />: null}
        {sortDirection === "asc" ? <FontAwesomeIcon size="sm" icon={faSortUp} onClick={() => handleSort("asc")} /> : null}
        {sortDirection === "desc" ? <FontAwesomeIcon size="sm" icon={faSortDown} onClick={() => handleSort("desc")} /> : null}
    </>
  );
}