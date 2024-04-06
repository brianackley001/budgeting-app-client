import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSort, faSortUp, faSortDown } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { getPagedTransactions, setPaginationSortBy, setPaginationSortDirection } from "@store/transactionSlice";
import { Button } from 'react-bootstrap';


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
      <Button variant="link" className='buttonLinkSortableHeader' onClick={() => handleSort("", sortBy)}>{sortLabel}&nbsp;&nbsp;
      <FontAwesomeIcon size="sm" icon={faSort} style={{ color: iconColorValue, }} /></Button>}
      {currentSortBy === sortBy && currentSortDirection === "asc" && 
      <Button variant="link" className='buttonLinkSortableHeaderSelected' onClick={() => handleSort("asc", sortBy)}>{sortLabel}&nbsp;&nbsp;<FontAwesomeIcon size="sm" icon={faSortUp} style={{ color: iconColorValue, }} />
      </Button>}
      {currentSortBy === sortBy && currentSortDirection === "desc" && 
      <Button variant="link" className='buttonLinkSortableHeaderSelected' onClick={() => handleSort("desc", sortBy)}>{sortLabel}&nbsp;&nbsp;<FontAwesomeIcon size="sm" icon={faSortDown} style={{ color: iconColorValue, }}/>
      </Button>}
    </>
  );
}