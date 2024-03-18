import { useEffect, useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { setAccounts } from "@store/accountSlice";
import { setLinkedItems } from "@store/plaidSlice";
import { setName, setSyncUserRequest, setTransactionsPerPage, setTransactionTags, setUserId, setUserName } from "@store/userSlice";
import { setSyncTransactionRequest } from "@store/transactionSlice"; 
import { setSyncAccountRequest } from "@store/accountSlice"; 
import { logError, logEvent } from "@utils/logger";
import axiosInstance from "@utils/axiosInstance";

const useSetSessionUser = () => {
  const syncAccountRequest =  useAppSelector(state => state.accountSlice.syncAccountRequest);
  const syncTransactionRequest =  useAppSelector(state => state.transactionSlice.syncTransactionRequest);
  const syncUserRequest =  useAppSelector(state => state.userSlice.syncUserRequest);
  let sessionUser = {};
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const dispatch = useAppDispatch();

  const saveNewUser = async (sessionUser) => {
    // NEW User, save to DB:
    logEvent("user-login", {
      type: "BEGIN save new user to DB",
      userId: sessionStorage.getItem("userId") || "unknown",
    });
    const saveUserPayload = {
      id: sessionStorage.getItem("userId"),
      userId: sessionStorage.getItem("userId"),
      userName: sessionStorage.getItem("userName"),
      userShortName: sessionStorage.getItem("userShortName"),
      preferences: { transactionItemsPerPage: 10 },
      transactionTags: ["Verify"],
      dateCreated: new Date().toUTCString(),
      dateUpdated: new Date().toUTCString(),
    };

    await axiosInstance
      .post(`user`, saveUserPayload)
      .then((response) => {
        sessionStorage.removeItem("msal_LOGIN_SUCCESS");
        sessionUser = response.data;
        logEvent("user-login", {
          type: "END save new user to DB",
          userId: account ? account.localAccountId: "unknown",
        });
      })
      .catch((error) => {
        console.error(
          `useMsalEvents: error saving/posting new user to DB: ${error}`
        );
        logError(error);
        dispatch(setSyncUserRequest({ ...syncUserRequest, errors: ["Error saving new user"]}));
      });
      return sessionUser;
  };
  
  const setUserState = async (sessionUser) => {
    try {
      dispatch(setUserId(sessionUser.id));
      dispatch(setUserName(sessionUser.userName));
      dispatch(setName(sessionUser.userShortName));
      dispatch(setTransactionTags(sessionUser.transactionTags));
      dispatch(setTransactionsPerPage(sessionUser.preferences.transactionItemsPerPage));

      if(sessionUser.linkedItems && sessionUser.linkedItems.length > 0)
        dispatch(setLinkedItems(sessionUser.linkedItems));

      if(sessionUser.accounts && sessionUser.accounts.length > 0){
        // cached account status in DB:
        dispatch(setAccounts(sessionUser.accounts));
      }

      // Initiate Account Balance Request, if linked items exist and not already in progress...
      if(!syncAccountRequest.inProgress && sessionUser.linkedItems.length > 0)
        dispatch(setSyncAccountRequest({inProgress: true, standAloneRequest: false, errors: []},));

      // Initiate syncTransactions, if linked items exist and not already in progress...
      if(!syncTransactionRequest.inProgress && sessionUser.linkedItems.length > 0)
        dispatch(setSyncTransactionRequest({inProgress: true, standAloneRequest: false, errors: []},));
    }
    catch (error) {
      console.error(`useSetUserState: error setting user state: ${error}`);
      logError(error as Error);
    }
  }

  const syncLinkedItems = async (sessionUser) => {
    try {
      if (
        sessionUser &&
        sessionUser.linkedItems &&
        sessionUser.linkedItems.length > 0
      ) {
        try {
          dispatch(setLinkedItems(sessionUser.linkedItems));
          return true;
        } catch (error) {
          console.log(error);
          logError(error as Error);
          dispatch(setSyncUserRequest({ ...syncUserRequest, errors: ["Error saving new user"]}));
          return false;
        }
      } else {
        console.log("syncLinkedItems: user.linkedItems.length <= 0");
        console.log(
          "loginStateUtils -endSyncOperation - dispatch Alert: 'Your account sync is complete'."
        );
      }
    } catch (error) {
      console.log(error);
      logError(error as Error);
    }
  };

  useEffect(() => {
    if (account && syncUserRequest.inProgress) {
      const fetchUserData = async () => {
        // Get User from DB:
        axiosInstance
          .get(`/user/${account.localAccountId}`)
          .then(async (response) => {
            //User Exists:
            if (response.data && response.data.id.length > 0) {
              sessionStorage.setItem("DB_USER_EXISTS", "true");
              sessionStorage.removeItem("msal_LOGIN_SUCCESS");
              sessionUser = response.data;
            } else {
              sessionUser = await saveNewUser(sessionUser);
            }
            await setUserState(sessionUser);
            await syncLinkedItems(sessionUser);
          })
          .catch((error) => {
            console.error(
              `useMsalEvents - getUser catch => error getting user from DB: ${error}`
            );
            logError(error);
            dispatch(
              setSyncUserRequest({
                ...syncUserRequest,
                errors: ["Error retrieving user details"],
              })
            );
          })
          .finally(() => {
            dispatch(
              setSyncUserRequest({ ...syncUserRequest, inProgress: false })
            );
          });
      };

      // Start the user sync process...
      dispatch(setSyncUserRequest({ ...syncUserRequest, inProgress: true, standAloneRequest: false}));
      fetchUserData();
    }
  }, [account]);

  return sessionUser;
};
export { useSetSessionUser };
