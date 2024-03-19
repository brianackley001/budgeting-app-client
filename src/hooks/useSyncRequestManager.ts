import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { setAlertState } from "@store/alertSlice";
import { setSyncAccountRequest } from "@store/accountSlice";
import { setSyncRequestItems } from "@store/syncRequestSlice";
import { setSyncTransactionRequest } from "@store/transactionSlice";
import { setSyncUserRequest } from "@store/userSlice";

const useSyncRequestManager = () => {
  const alertIsVisible = useAppSelector((state) => state.alertSlice.showAlert);
  const syncAccountRequest = useAppSelector((state) => state.accountSlice.syncAccountRequest);
  const syncTransactionRequest = useAppSelector((state) => state.transactionSlice.syncTransactionRequest);
  const syncUserRequest = useAppSelector((state) => state.userSlice.syncUserRequest);
  const transactionSyncItems = useAppSelector((state) => state.syncRequestSlice.syncRequestItems);
  const dispatch = useAppDispatch();
  const [syncOperationComplete, setSyncOperationComplete] = useState(false);
  const [syncOperationHasErrors, setSyncOperationHasErrors] = useState(false);

  const getPlaidGeneralErrorMessage = (errors) => {
    let message = "";

    errors.forEach((error) => {
      if (error.error_message) {
        if (message.indexOf(error.error_message) === -1) {
          message += error.error_message + " ";
        }
      }
    });
    return message;
  };

  const isPlaidLoginError = (errors) => {
    return errors.some((error) => {
      return error.error_code && error.error_code === "ITEM_LOGIN_REQUIRED";
    });
  };

  const isPlaidOtherError = (errors) => {
    return errors.some((error) => {
      return error.error_type && error.error_code !== "ITEM_LOGIN_REQUIRED";
    });
  };

  const syncRequestTransactionHasErrors = () => {
    setSyncOperationHasErrors(
      syncAccountRequest.errors.length > 0 ||
        syncTransactionRequest.errors.length > 0 ||
        syncUserRequest.errors.length > 0
    );
  };
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

  const showErrorMessage = () => {
    let message = "";
    let headerText = "";
    if (syncUserRequest.errors.length > 0) {
      message = syncUserRequest.errors.join(", ");
      headerText = "Error syncing your user account...";
    } else {
      if (syncAccountRequest.errors.length > 0) {
        message = isPlaidLoginError(syncAccountRequest.errors)
          ? "One or more of your account credentials needs to be reviewed. Please visit the Accounts page to update your credentials."
          : isPlaidOtherError(syncAccountRequest.errors)
          ? getPlaidGeneralErrorMessage(syncAccountRequest.errors)
          : syncAccountRequest.errors.join(", ");
        headerText = "Error syncing your accounts...";
      }
      if (syncTransactionRequest.errors.length > 0) {
        message = isPlaidLoginError(syncTransactionRequest.errors)
          ? "One or more of your account credentials needs to be reviewed. Please visit the Accounts page to update your credentials."
          : isPlaidOtherError(syncTransactionRequest.errors)
          ? getPlaidGeneralErrorMessage(syncTransactionRequest.errors)
          : syncTransactionRequest.errors.join(", ");
        headerText = "Error syncing your transactions...";
      }
    }
    dispatch(
      setAlertState({
        headerText: headerText,
        inProgress: false,
        messageText: message,
        showAlert: true,
        variantStyle: "danger",
      })
    );
    resetSyncState();
  };

  const showSuccessMessage = () => {
    let message = "";
    let headerText = "";
    if (transactionSyncItems.length === 1 && transactionSyncItems.includes("transaction")
    ) {
      message = "Your transactions have been synced.";
      headerText = "Sync complete";
    } else {
      if (syncAccountRequest.errors.length === 0) {
        message = "Your accounts have been synced.";
        headerText = "Sync complete";
      }
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
