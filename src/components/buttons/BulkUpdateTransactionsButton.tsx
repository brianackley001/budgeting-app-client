import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { logEvent } from "@utils/logger";
import { Link } from 'react-router-dom';


export const BulkUpdateTransactionsButton = (props) => {
    const { paginationConfig, transactionItems} = props;
    const userId = useAppSelector(state => state.userSlice.userId);
    const [filterCategoryValue, setFilterCategoryValue] = useState("");
    const [filterSubCategoryValue, setFilterSubCategoryValue] = useState("");
    const navUrl = `/bulk-edit-transactions`;
    logEvent("BulkUpdateTransactionsButton: NavigateToBulkUpdateTransactions", { userId: userId, requestedItemTotal: paginationConfig.total });
    
    useEffect(() => {
      //Accounts:
      const sampleItem = transactionItems.items[0];
      setFilterCategoryValue(
        sampleItem?.personalFinanceCategory?.primary || ""
      );
      setFilterSubCategoryValue(
        sampleItem?.personalFinanceCategory?.detailed || ""
      );
      //setNavUrl(`/bulkEditTransactions?category=${filterCategoryValue}&subcategory=${filterSubCategoryValue}`);
    }, [transactionItems, filterCategoryValue, filterSubCategoryValue]);
  
  return (
    <>
      <Link
        to={{pathname: navUrl, search: `?category=${filterCategoryValue}&subcategory=${filterSubCategoryValue}`}}
        data-testid="navlink-bulk-edit-transactions"
        className="mx-2"
      >
        <Button variant="outline-primary">
          <FontAwesomeIcon
            icon={faListCheck}
            title="Bulk Update selected Transactions"
          />Bulk Update
        </Button>
      </Link>
    </>
  );
};