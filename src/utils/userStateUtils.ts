import { setAccounts } from "@store/accountSlice";
import { setLinkedItems } from "@store/plaidSlice";
import { getAccountBalances } from "@store/accountSlice";
import {
  getPagedTransactions,
  setTransactionPagination,
  syncTransactions,
} from "@store/transactionSlice";
import {
  setName,
  setTransactionsPerPage,
  setTransactionTags,
  setUserId,
  setUserName,
} from "@store/userSlice";
import { setAlertState } from "@store/alertSlice";
import { logError } from "@utils/logger";

const beginSyncOperation = async (dispatch) => {
  dispatch(
    setAlertState({
      headerText: "Syncing",
      inProgress: false,
      messageText: "Please wait while we sync your accounts...",
      showAlert: true,
      variantStyle: "info",
    })
  );
};
const broadcastSyncError = async (dispatch, error) => {
  dispatch(
    setAlertState({
      headerText: error.header,
      inProgress: false,
      messageText: error.message,
      showAlert: true,
      variantStyle: "danger",
    })
  );
  console.error(`loginStateUtils - broadcastSyncError: ${error.message}`);
};

const endSyncOperation = async (dispatch) => {
  dispatch(
    setAlertState({
      headerText: "Sync Completed",
      inProgress: false,
      messageText: "Your account sync is complete.",
      showAlert: true,
      variantStyle: "success",
    })
  );
};

const setAccountState = async (dispatch, user) => {
  try {
    dispatch(setAccounts(user.accounts));
    dispatch(getAccountBalances(user.id));
    return true;
  } catch (error) {
    console.log(error);
    logError(error as Error);
    broadcastSyncError(dispatch, {
      header: "Sync Error",
      message: "Error setting account information.",
    });
    return false;
  }
};

const setPlaidState = async (dispatch, linkedItems) => {
  try {
    dispatch(setLinkedItems(linkedItems));
    return true;
  } catch (error) {
    console.log(error);
    logError(error as Error);
    broadcastSyncError(dispatch, {
      header: "Sync Error",
      message: "Error setting plaid account item information.",
    });
    return false;
  }
};

const setUserState = async (dispatch, user) => {
  try {
    dispatch(setUserId(user.id));
    dispatch(setUserName(user.userName));
    dispatch(setName(user.userShortName));
    dispatch(setTransactionTags(user.transactionTags));
    dispatch(setTransactionsPerPage(user.preferences.transactionItemsPerPage));
    return true;
  } catch (error) {
    console.log(error);
    logError(error as Error);
    broadcastSyncError(dispatch, {
      header: "Sync Error",
      message: "Error setting user information.",
    });
    return false;
  }
};

const setTransactionState = async (dispatch, paginationConfig, user) => {
  if (user.accounts && user.accounts.length > 0) {
    try {
      let itemRequests = new Array();
      let investmentItemRequests = new Array();
      user.linkedItems.forEach((item) => {
        if (
          user.accounts.find((account) => account.itemId === item.item_id)
            .type !== "investment"
        ) {
          const body = {
            itemId: item.item_id,
            userId: item.user_id,
            institution: {
              id: item.institution_id,
              name: item.institution_name,
            },
          };
          itemRequests.push(body);
        }

        // Account for Investment Account Transaction requests...
        if (
          user.accounts.find((account) => account.itemId === item.item_id)
            .type === "investment"
        ) {
          const body = {
            itemId: item.item_id,
            userId: item.user_id,
            institution: {
              id: item.institution_id,
              name: item.institution_name,
            },
          };
          investmentItemRequests.push(body);
        }
      });

      const storeRequests = itemRequests.map((request) => {
        dispatch(syncTransactions(request.userId));
      });

      await Promise.all(storeRequests)
        .then((values) => {
          console.log(values);
          return values;
        })
        .catch((error) => {
          console.log(error);
          logError(error as Error);
          return null;
        });

      // GET page one of PagedTransactions from DB...
      const updatedPaginationConfig = {
        ...paginationConfig,
        accountIds: user.accounts
          .filter((item) => item.includeAccountTransactions)
          .map((item) => item.accountId),
        pageSize: user.preferences.transactionItemsPerPage,
        userId: user.id,
      };

      dispatch(setTransactionPagination(updatedPaginationConfig));
      dispatch(getPagedTransactions(updatedPaginationConfig));

      return true;
    } catch (error) {
      console.error(`loginStateUtils - setTransactionState error: ${error}`);
      logError(error as Error);
      broadcastSyncError(dispatch, {
        header: "Sync Error",
        message: "Error retrieving transaction data.",
      });
      return false;
    }
  }
  return true;
};

const loginSync = async (user, dispatch, paginationConfig) => {
  if (user) {
    await beginSyncOperation(dispatch);
    let success = await setUserState(dispatch, user);

    if (user.linkedItems && success) {
      success &&= await setPlaidState(dispatch, user.linkedItems);

      if (user.accounts && success) {
        success &&= await setAccountState(dispatch, user);
      }

      if (success) {
        success &&= await setTransactionState(dispatch, paginationConfig, user);
      }
    }

    //All steps complete, end sync operation:
    await endSyncOperation(dispatch);
  }
};

export { loginSync };