import { useState, useEffect } from "react";
import{ Button, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { logEvent } from "@utils/logger";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faFileCsv } from '@fortawesome/free-solid-svg-icons'


export const ExportTransactionCsvButton = (props) => {
  const { paginationConfig} = props;
  const userId = useAppSelector(state => state.userSlice.userId);
  const dispatch = useAppDispatch();

  const exportTransactions = async() => {
    logEvent("ExportTransactionCsvButton: exportCsvItems", { userId: userId });
    console.log("Exporting transactions to CSV file...");
    const exportConfig = {
      userId: userId,
      startDate: paginationConfig.startDate,
      endDate: paginationConfig.endDate,
      categorySearchValue: paginationConfig.categorySearchValue,
      merchantNameSearchValue: paginationConfig.merchantNameSearchValue,
      userNotesSearchValue: paginationConfig.userNotesSearchValue,
      tagSearchValue: paginationConfig.tagSearchValue,
      amountFrom: paginationConfig.amountFrom,
      amountTo: paginationConfig.amountTo,
      sortBy: paginationConfig.sortBy,
      sortDirection: paginationConfig.sortDirection,
      pageNumber: paginationConfig.pageNumber,
      pageSize: paginationConfig.pageSize
    };

    // Initiate account balance sync:
    // dispatch(setSyncRequestItems(["account"]));
    // dispatch(setSyncAccountRequest({inProgress: true, standAloneRequest: false, errors: []}));

    //await dispatch(getAccountBalances(userId));
  };

  // useEffect(() => {
  //   if (isAccountBalanceLoading && !syncAccountRequest.inProgress) {
  //     setIsAccountBalanceLoading(false);
  //   }
  // }, [isAccountBalanceLoading, syncAccountRequest.inProgress]);

  return (
    <Button variant="outline-primary">
        <FontAwesomeIcon icon={faFileCsv} onClick={() => exportTransactions()} title="Export Transactions to CSV file" /> Export Transactions
    </Button>
  );
};