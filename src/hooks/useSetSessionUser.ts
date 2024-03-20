import { useEffect, useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { setAccounts } from "@store/accountSlice";
import { setLinkedItems } from "@store/plaidSlice";
import { createUser, getUser } from "@store/userSlice";
import { setSyncUserRequest } from "@store/userSlice";
import { setSyncTransactionRequest } from "@store/transactionSlice"; 
import { setSyncAccountRequest } from "@store/accountSlice"; 
import { logError, logEvent } from "@utils/logger";

const useSetSessionUser = () => {
  const syncAccountRequest =  useAppSelector(state => state.accountSlice.syncAccountRequest);
  const syncTransactionRequest =  useAppSelector(state => state.transactionSlice.syncTransactionRequest);
  const syncUserRequest =  useAppSelector(state => state.userSlice.syncUserRequest);
  const { accounts } = useMsal();
  const account = useAccount(accounts[0] || {});
  const dispatch = useAppDispatch();

  const saveNewUser = async () => {
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
    return await dispatch(createUser(saveUserPayload));
  };
  
  const setUserState = async (sessionUser) => {
    try {
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
        try {
          const sessionUser = await dispatch(getUser(account.localAccountId));
          if ( sessionUser && sessionUser.id.length > 0 && sessionUser.userShortName.length > 0) {
            sessionStorage.setItem("DB_USER_EXISTS", "true");
            sessionStorage.removeItem("msal_LOGIN_SUCCESS");

            await setUserState(sessionUser);
            await syncLinkedItems(sessionUser);
          } else {
            await saveNewUser();
          }
        } catch (error) {
          logError(error as Error);
          dispatch(
            setSyncUserRequest({
              ...syncUserRequest,
              errors: ["Error retrieving user details"],
            })
          );
        } finally {
          dispatch(
            setSyncUserRequest({ ...syncUserRequest, inProgress: false })
          );
        }
      };

      // Start the user sync process...
      dispatch(setSyncUserRequest({ ...syncUserRequest, inProgress: true, standAloneRequest: false}));
      fetchUserData();
    }
  }, [account]);

  return true;
};
export { useSetSessionUser };
