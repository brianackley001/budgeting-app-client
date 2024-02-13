import React, { useCallback, useEffect, useState } from "react";
//import { useAppSelector, useAppDispatch } from "@hooks/storeHooks";
import { setAccounts } from "@store/accountSlice";
import { setLinkedItems } from "@store/plaidSlice";
import { getPagedTransactions, setTransactionPagination, syncTransactions } from "@store/transactionSlice"; 
import { setName, setTransactionsPerPage, setTransactionTags, setUserId, setUserName } from "@store/userSlice";
import  axiosInstance from "@utils/axiosInstance";
import {
  setHeaderText,
  setMessageText,
  setInProgress,
  setShowAlert,
  setVariantStyle,
} from "@store/alertSlice";



const beginSyncOperation = async (dispatch) => {
  dispatch(setInProgress(true));
  dispatch(setHeaderText("Syncing"));
  dispatch(setMessageText("Please wait while we sync your accounts..."));
  dispatch(setShowAlert(true));
};
const broadcastSyncError = async (dispatch, error) => {
  dispatch(setInProgress(false));
  dispatch(setHeaderText(error.header));
  dispatch(setMessageText(error.message));
  dispatch(setVariantStyle("danger"));
  dispatch(setShowAlert(true));
};

const endSyncOperation = async (dispatch) => {
  dispatch(setInProgress(false));
  dispatch(setHeaderText("Sync Completed"));
  dispatch(setMessageText("Your account sync is complete."));
  dispatch(setVariantStyle("success"));
  dispatch(setShowAlert(true));
};

const setAccountState = async (dispatch, accounts) => {
  try {
    
    dispatch(setAccounts(accounts));
    return true;
  } catch (error) {
    console.log(error);
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
      //  syncTransactions(userId: string, itemId: string, institution: any, showAlert: boolean = true)
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

      const storeRequests = itemRequests.map((request) =>{
        dispatch(syncTransactions(request.userId, request.itemId, request.institution, false))
      });

      // let investmentStoreRequests = new Array();
      // if(investmentItemRequests.length > 0) {
      //   investmentStoreRequests = investmentItemRequests.map((request) =>{
      //     return dispatch(syncTransactions(request.userId, request.itemId, request.institution, false))
      //   });
      // }

      //let outputCollection = new Array<Object>();
      const responses = await Promise.all(storeRequests)
        .then((values) => {console.log(values); return values;})
        .catch((error) => {console.log(error); return null;})
      // for(const response of responses) {
      //   if(outputCollection.length === 0) {
      //     outputCollection = response.data.transactions.transactions;
      //   }else {
      //     outputCollection = outputCollection.concat(response.data.transactions.transactions); // = [outputCollection, ...response];
      //   }
      // }

      // GET page one of PagedTransactions from DB...
      const updatedPaginationConfig = {
        ...paginationConfig,
        accountIds: user.accounts
          .filter((item) => item.includeAccountTransactions)
          .map((item) => item.accountId).join(","),
        pageSize: user.preferences.transactionItemsPerPage,
        userId: user.id,
      };

      dispatch(setTransactionPagination(updatedPaginationConfig));
      dispatch(getPagedTransactions(updatedPaginationConfig));

      return true;
    } catch (error) {
      console.log(error);
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
        success &&= await setAccountState(dispatch, user.accounts);
      }

      if(success) {
        success &&= await setTransactionState(dispatch, paginationConfig, user);
      }
    }

    //All steps complete, end sync operation:
    await endSyncOperation(dispatch);
  }
};

export  { loginSync } ;
