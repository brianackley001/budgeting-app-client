import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import {
  getPagedTransactions,
  setTransactionPagination,
  setPaginationPageSize,
  syncTransactions,
  setSyncTransactionRequest,
} from "@store/transactionSlice";
import { logError, logEvent } from "@utils/logger";

interface ILinkedItem {
  item_id: string;
  user_id: string;
  institution_id: string;
  institution_name: string;
  transactions_cursor: string;
  dateCreated: string;
  dateUpdated: string;
}
const useSetSyncTransaction = () => {
  const dispatch = useAppDispatch();
  const syncTransactionRequest = useAppSelector(
    (state) => state.transactionSlice.syncTransactionRequest
  );
  const linkedItems = useAppSelector((state) => state.plaidSlice.linkedItems);
  const userId = useAppSelector((state) => state.userSlice.userId);
  const transactionItemsPerPage = useAppSelector((state) => state.userSlice.preferences.transactionItemsPerPage);
  const [syncInProgress, setSyncInProgress] = useState(false);

  useEffect(() => {
    const fetchTransactionData = async () => {
      let requestErrors = [];
      if (linkedItems && linkedItems.length > 0) {
        setSyncInProgress(true);
        dispatch(setPaginationPageSize(transactionItemsPerPage));
        try {
          logEvent("transaction-sync", {
            type: "BEGIN sync transaction",
            standAloneRequest:
              syncTransactionRequest.standAloneRequest.toString(),
          });
          await dispatch(syncTransactions(userId));
        } catch (error) {
          console.error(
            `useSetSyncTransaction: error syncing transactions: ${error}`
          );
          logError(error as Error);
        } finally {
          setSyncInProgress(false);
        }
      }
    };

    if (syncTransactionRequest.inProgress && !syncInProgress) {
      fetchTransactionData();
    }
  }, [syncInProgress, syncTransactionRequest.errors, syncTransactionRequest.inProgress]);

  return syncTransactionRequest;
};
export { useSetSyncTransaction };
