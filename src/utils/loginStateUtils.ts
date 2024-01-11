import React, { useCallback, useEffect, useState } from "react";
import { useAppSelector, useAppDispatch } from "../hooks/storeHooks";
import { setAccounts } from "../store/accountSlice";
// import { selectAccessToken} from "../store/msalSlice";
import { setInstitutions, setLinkedItems, selectInstitutions } from "../store/plaidSlice";
import { setTransactions } from "../store/transactionSlice"; 
import { setName, setUserId, setUserName } from "../store/userSlice";
import { axiosInstance } from "../utils/axiosInstance";
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

const setTransactionState = async (accessTokenValue, dispatch, linkedItems) => {
  if(linkedItems && linkedItems.length > 0) {
    try {
      const config = {
        headers: {
          Authorization: "Bearer " + accessTokenValue,
        },
      };

      let postBodies = new Array<Object>();
      linkedItems.forEach((item) => {
        const body = {
          itemId: item.item_id,
          userId: item.user_id,
          startDate: '2023-01-01',
          endDate: '2024-01-31',
          institution: {id: item.institution_id, name: item.institution_name}
        };
        postBodies.push(body);
      });

      const postRequests = postBodies.map(postBody =>{
        return axiosInstance.post("/transactionsByDate", postBody, config)
      });

      let outputCollection = new Array<Object>();
      const responses = await Promise.all(postRequests);
      for(const response of responses) {
        if(outputCollection.length === 0) {
          outputCollection = response.data.transactions.transactions;
        }else {
          outputCollection = outputCollection.concat(response.data.transactions.transactions); // = [outputCollection, ...response];
        }
      }

      // Update the State with collection of transactions:
      dispatch(setTransactions(outputCollection));
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

 const loginSync = async (user, dispatch, accessTokenValue) => {

  if (user) {
    await beginSyncOperation(dispatch);
    let success = await setUserState(dispatch, user);

    if (user.linkedItems && success) {
      success &&= await setPlaidState(dispatch, user.linkedItems);

      if (user.accounts && success) {
        success &&= await setAccountState(dispatch, user.accounts);
      }

      if(success) {
        success &&= await setTransactionState(accessTokenValue, dispatch, user.linkedItems);
      }
    }

    //All steps complete, end sync operation:
    await endSyncOperation(dispatch);
  }
};

export  { loginSync } ;