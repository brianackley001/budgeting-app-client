import React, { useCallback, useEffect, useState } from "react";
//import { useAppSelector, useAppDispatch } from "@hooks/storeHooks";
import { setAccounts } from "@store/accountSlice";
import { setLinkedItems } from "@store/plaidSlice";
import { setPaginationPageSize, setPagedTransactions, setPaginationAccountIds, setPaginationUserId } from "@store/transactionSlice"; 
import { setName, setTransactionsPerPage, setTransactionTags, setUserId, setUserName } from "@store/userSlice";
import  axiosInstance from "@utils/axiosInstance";
import {
  setHeaderText,
  setMessageText,
  setInProgress,
  setShowAlert,
  setVariantStyle,
} from "../store/alertSlice";



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

const setTransactionState = async (dispatch, paginationSelector, user) => {
  if(user.accounts && user.accounts.length > 0) {
    try {
      //const itemsPerPage = useAppSelector(selectTransactionItemsPerPage);
      // const config = {
      //   headers: {
      //     Authorization: "Bearer " + accessTokenValue,
      //   },
      // };

      // GetTransactionsByDate fr all linked accounts - preserve if needed elsewhere...
      //PIVOT to SYNC methos ehre for getting all account data based on last cursor date...

      // let postBodies = new Array<Object>();
      // linkedItems.forEach((item) => {
      //   const body = {
      //     itemId: item.item_id,
      //     userId: item.user_id,
      //     startDate: '2023-01-01',
      //     endDate: '2024-01-31',
      //     institution: {id: item.institution_id, name: item.institution_name}
      //   };
      //   postBodies.push(body);
      // });

      // const postRequests = postBodies.map(postBody =>{
      //   return axiosInstance.post("/transactionsByDate", postBody, config)
      // });

      // let outputCollection = new Array<Object>();
      // const responses = await Promise.all(postRequests);
      // for(const response of responses) {
      //   if(outputCollection.length === 0) {
      //     outputCollection = response.data.transactions.transactions;
      //   }else {
      //     outputCollection = outputCollection.concat(response.data.transactions.transactions); // = [outputCollection, ...response];
      //   }
      // }
      // GET page one of PagedTransactions from DB...
      const linkedItemAccountIds = user.accounts.map((item) => item.accountId).join(",");
      dispatch(setPaginationAccountIds(linkedItemAccountIds));
      dispatch(setPaginationUserId(user.id)); 
      dispatch(setPaginationPageSize(user.preferences.transactionItemsPerPage));

      const postBody = {
        "accountIds": linkedItemAccountIds,
        "endDate": paginationSelector.endDate,
        "pageNumber": paginationSelector.pageNumber,
        "pageSize": user.preferences.transactionItemsPerPage, //paginationSelector.pageSize,
        "sortBy": paginationSelector.sortBy,
        "sortDirection": paginationSelector.sortDirection,
        "startDate": paginationSelector.startDate,
        "tagSearchValue": paginationSelector.tagSearchValue,
        "userId": user.id,
        "userNotesSearchValue": paginationSelector.userNotesSearchValue
    }
      const response = await axiosInstance.post("/transactions", postBody);
      // Update the State with collection of transactions:
      dispatch(setPagedTransactions(response.data));
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
}

 const loginSync = async (user, dispatch, paginationSelector) => {

  if (user) {
    await beginSyncOperation(dispatch);
    let success = await setUserState(dispatch, user);

    if (user.linkedItems && success) {
      success &&= await setPlaidState(dispatch, user.linkedItems);

      if (user.accounts && success) {
        success &&= await setAccountState(dispatch, user.accounts);
      }

      if(success) {
        success &&= await setTransactionState(dispatch, paginationSelector, user);
      }
    }

    //All steps complete, end sync operation:
    await endSyncOperation(dispatch);
  }
};

export  { loginSync } ;
