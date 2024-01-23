import SortableHeaderItem from "./SortableHeaderItem";



/**
 * Renders sort icon for transaction table headers and updates Redux state with new sort order
 * @param props
 */

export default function SortableHeaderRow() {
  return (
    <>
      <thead>
        <tr>
          <th><SortableHeaderItem sortBy={"date"} sortLabel={"Date"}></SortableHeaderItem></th>
          <th><SortableHeaderItem sortBy={"merchant"} sortLabel={"Merchant"}></SortableHeaderItem></th>
          <th><SortableHeaderItem sortBy={"amount"} sortLabel={"Amount"}></SortableHeaderItem></th>
          <th><SortableHeaderItem sortBy={"category"} sortLabel={"Category"}></SortableHeaderItem></th>
        </tr>
      </thead>
    </>
  );
};