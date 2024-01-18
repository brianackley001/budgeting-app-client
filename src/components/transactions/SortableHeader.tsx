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
        {sortDirection === "" ? <FontAwesomeIcon size="sm" icon={faSort} style={{color: "#9997a1",}} onClick={() => handleSort("")}  />: null}
        {sortDirection === "asc" ? <FontAwesomeIcon size="sm" icon={faSortUp} style={{color: "#9997a1",}} onClick={() => handleSort("asc")} /> : null}
        {sortDirection === "desc" ? <FontAwesomeIcon size="sm" icon={faSortDown} style={{color: "#9997a1",}} onClick={() => handleSort("desc")} /> : null}
    </>
  );
}