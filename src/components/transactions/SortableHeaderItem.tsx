import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { getPagedTransactions, selectTransactionPagination, setPaginationSortBy, setPaginationSortDirection } from "@store/transactionSlice";


/**
 * Renders sort icon for transaction table headers and updates Redux state with new sort order
 * @param props
 */

export default function  SortableHeaderItem(props){
  const{ currentSortBy, currentSortDirection, sortBy, sortLabel} = props;
  const paginationConfig = useAppSelector(state => state.transactionSlice.transactionPagination);
  const dispatch = useAppDispatch();
  const iconColorValue = currentSortBy === sortBy ? "#198754" : "#9997a1";

  const handleSort = (direction, sortByValue) => {
    let updatedSortDirection = "";

    if (direction === "") {
      updatedSortDirection = "desc";
    } else if (direction === "asc") {
      updatedSortDirection = "desc";
    } else if (direction === "desc") {
      updatedSortDirection = "asc";
    }
    
    const updatedPaginationConfig = {
      ...paginationConfig,
      sortBy: sortByValue,
      sortDirection: updatedSortDirection,
    };

    dispatch(setPaginationSortDirection(updatedSortDirection));
    dispatch(setPaginationSortBy(sortByValue));
    dispatch(getPagedTransactions(updatedPaginationConfig));
  }

  return (
    <>
      {currentSortBy !== sortBy && 
      <span  onClick={() => handleSort("", sortBy)}>{sortLabel}&nbsp;&nbsp;
      <FontAwesomeIcon size="sm" icon={faSort} style={{ color: iconColorValue, }} />
      </span>}
      {currentSortBy === sortBy && currentSortDirection === "asc" && 
      <span  onClick={() => handleSort("asc", sortBy)}>{sortLabel}&nbsp;&nbsp;<FontAwesomeIcon size="sm" icon={faSortUp} style={{ color: iconColorValue, }} />
      </span>}
      {currentSortBy === sortBy && currentSortDirection === "desc" && 
      <span  onClick={() => handleSort("desc", sortBy)}>{sortLabel}&nbsp;&nbsp;<FontAwesomeIcon size="sm" icon={faSortDown} style={{ color: iconColorValue, }}/>
      </span>}
    </>
  );
}