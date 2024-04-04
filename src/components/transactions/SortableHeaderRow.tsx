import React from 'react'; 
import SortableHeaderItem from "./SortableHeaderItem";

/**
 * Renders sort icon for transaction table headers and updates Redux state with new sort order
 * @param props
 */

export default function SortableHeaderRow(props) {
  const { currentSortBy, currentSortDirection } = props;
  return (
    <thead>
      <tr>
        <th><SortableHeaderItem sortBy={"date"} sortLabel={"Date"} currentSortBy={currentSortBy} currentSortDirection={currentSortDirection}></SortableHeaderItem></th>
        <th><SortableHeaderItem sortBy={"merchant"} sortLabel={"Merchant"} currentSortBy={currentSortBy} currentSortDirection={currentSortDirection}></SortableHeaderItem></th>
        <th><SortableHeaderItem sortBy={"amount"} sortLabel={"Amount"} currentSortBy={currentSortBy} currentSortDirection={currentSortDirection}></SortableHeaderItem></th>
        <th><SortableHeaderItem sortBy={"category"} sortLabel={"Category"} currentSortBy={currentSortBy} currentSortDirection={currentSortDirection}></SortableHeaderItem></th>
      </tr>
    </thead>
  );
};