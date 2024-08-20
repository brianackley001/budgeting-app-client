import { useEffect, useState } from "react";
import { Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faListCheck } from '@fortawesome/free-solid-svg-icons'
import { logEvent } from "@utils/logger";
import { Link } from 'react-router-dom';


export const BulkUpdateTransactionsButton = (props) => {
    const { paginationConfig} = props;
    const userId = useAppSelector(state => state.userSlice.userId);
    logEvent("BulkUpdateTransactionsButton: NavigateToBulkUpdateTransactions", { userId: userId, requestedItemTotal: paginationConfig.total });

  return (
    <>
      <Link
        to="/bulk-edit-transactions"
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