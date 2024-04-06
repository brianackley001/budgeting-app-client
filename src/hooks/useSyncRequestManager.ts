import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { setAlertState } from "@store/alertSlice";
import { setSyncAccountRequest } from "@store/accountSlice";
import { getLinkedItems } from "@store/plaidSlice";
import { setSyncRequestItems } from "@store/syncRequestSlice";
import { setSyncTransactionRequest } from "@store/transactionSlice";
import { setSyncUserRequest } from "@store/userSlice";
import { getSyncRequestErrorDetails} from "@utils/syncRequestErrorMessageUtils";

  /**
   * Manages the sync request process for the application (e.g., sync user transactions, user account balances, etc.).
   */
const useSyncRequestManager = () => {
  const alertIsVisible = useAppSelector((state) => state.alertSlice.showAlert);
  const syncAccountRequest = useAppSelector((state) => state.accountSlice.syncAccountRequest);
  const syncTransactionRequest = useAppSelector((state) => state.transactionSlice.syncTransactionRequest);
  const syncUserRequest = useAppSelector((state) => state.userSlice.syncUserRequest);
  const transactionSyncItems = useAppSelector((state) => state.syncRequestSlice.syncRequestItems);
  const userId = useAppSelector((state) => state.userSlice.userId);
  const dispatch = useAppDispatch();
  const [syncOperationComplete, setSyncOperationComplete] = useState(false);
  const [syncOperationHasErrors, setSyncOperationHasErrors] = useState(false);

  /**
   * Determines if all array members have completed their sync operation.
   */
  const hasSyncOperationCompleted = () => {
    // Presumption: only 3 types of sync requests are possible:  
    //      1. User, 2. Account(Balance), 3. Transaction
    // Therefore, foregoing dynamic evaluation of syncRequestItems array.
    // User will be processed on Login, and Account will be processed on Login and on Account (Refresh) page.
    if(transactionSyncItems.length === 3){
      setSyncOperationComplete(!syncAccountRequest.inProgress && !syncTransactionRequest.inProgress && !syncUserRequest.inProgress); 
    }
    
    if(transactionSyncItems.length === 1 && transactionSyncItems.includes("account")){
      setSyncOperationComplete(!syncAccountRequest.inProgress);
    } 

    if(transactionSyncItems.length === 1 && transactionSyncItems.includes("transaction")){
      setSyncOperationComplete(!syncTransactionRequest.inProgress);
    } 
    syncRequestTransactionHasErrors();
  };
  /**
   * Resets all possible sync request states to their initial state.
   */
  const resetSyncState = () => {
    dispatch(setSyncRequestItems([]));
    dispatch(
      setSyncUserRequest({
        inProgress: false,
        errors: [],
        standAloneRequest: false,
      })
    );
    dispatch(
      setSyncAccountRequest({
        inProgress: false,
        errors: [],
        standAloneRequest: false,
      })
    );
    dispatch(
      setSyncTransactionRequest({
        inProgress: false,
        errors: [],
        standAloneRequest: false,
      })
    );
  };
  /**
   * Displays an alert message to the user indicating the beginning of a sync operation.
   */
  const showBeginSyncAlert = () => {
    // Display BEGIN Sync message
    let message = "";
    if (transactionSyncItems.length === 1 && transactionSyncItems.includes("transactions")
    ) {
      message = "Please wait while we sync your transactions...";
    } else {
      message = "Please wait while we sync your accounts...";
    }

    dispatch(
      setAlertState({
        headerText: "Syncing",
        inProgress: true,
        messageText: message,
        showAlert: true,
        variantStyle: "info",
      })
    );
  };
  /**
   * Displays an alert message to the user indicating the end of a sync operation with errors.
   */
  const showErrorMessage = async () => {
    let { headerText: headerTextResult, message: messageResult, plaidLoginError: plaidLoginErrorResult } =
      getSyncRequestErrorDetails(
        syncUserRequest.errors,
        syncAccountRequest.errors,
        syncTransactionRequest.errors
      );

    dispatch(
      setAlertState({
        headerText: headerTextResult,
        inProgress: false,
        messageText: messageResult,
        showAlert: true,
        variantStyle: "danger",
      })
    );
    
    // If there is a Plaid login error, then pull the user and linkedItems data from the server.
    if (plaidLoginErrorResult) {
      dispatch(getLinkedItems(userId));
    }
    
    resetSyncState();
  };
  /**
   * Displays an alert message to the user indicating the end of a sync operation with no errors.
   */
  const showSuccessMessage = () => {
    let message = "";
    let headerText = "";
    if (transactionSyncItems.length === 1 && transactionSyncItems.includes("transaction")
    ) {
      message = "Your transactions have been synced.";
      headerText = "Sync complete";
    } else {
        message = "Your accounts have been synced.";
        headerText = "Sync complete";
    }
    dispatch(
      setAlertState({
        headerText: headerText,
        inProgress: false,
        messageText: message,
        showAlert: true,
        variantStyle: "success",
      })
    );
    resetSyncState();
  };
  /**
   * Determines if any of the sync requests returned errors.
   */
  const syncRequestTransactionHasErrors = () => {
    setSyncOperationHasErrors(
      syncAccountRequest.errors.length > 0 ||
        syncTransactionRequest.errors.length > 0 ||
        syncUserRequest.errors.length > 0
    );
  };
  

  useEffect(() => {
    const evaluateSyncTransactionState = () => {
      if (!alertIsVisible) {
        showBeginSyncAlert();
      }
      
      hasSyncOperationCompleted();

      if (syncOperationComplete && alertIsVisible && syncOperationHasErrors) {
        showErrorMessage();
      }

      if (syncOperationComplete && alertIsVisible && !syncOperationHasErrors) {
        showSuccessMessage();
      }
    };

    if(transactionSyncItems.length > 0)
      evaluateSyncTransactionState();
  }, [syncOperationComplete, syncAccountRequest.inProgress,syncTransactionRequest.inProgress,syncUserRequest.inProgress,transactionSyncItems]);

  return transactionSyncItems;
};
export { useSyncRequestManager };
