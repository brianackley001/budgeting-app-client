import { useEffect, useState } from "react";
import { useMsal, useAccount } from "@azure/msal-react";
import { useAppDispatch } from "@hooks/useStoreHooks";
import { setAlertState } from "@store/alertSlice";
import { getAccountBalances, setAccounts } from "@store/accountSlice";
import { setLinkedItems } from "@store/plaidSlice";
import { setName, setTransactionsPerPage, setTransactionTags, setUserId, setUserName } from "@store/userSlice";
import { logError, logEvent } from "@utils/logger";
import axiosInstance from "@utils/axiosInstance";

const useSetSessionUser = () => {
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
        dispatch(setAccounts(sessionUser.accounts));
        dispatch(getAccountBalances(sessionUser.id));
      }
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
        console.log("syncLinkedItems: user.linkedItems.length > 0");
      } else {
        console.log("syncLinkedItems: user.linkedItems.length <= 0");
        dispatch(
          setAlertState({
            headerText: "Sync Completed",
            inProgress: false,
            messageText: "Your account sync is complete.",
            showAlert: true,
            variantStyle: "success",
          })
        );
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
    if (account) {
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
          })
          .catch((error) => {
            console.error(
              `useMsalEvents - getUser catch => error getting user from DB: ${error}`
            );
            logError(error);
            dispatch(
              setAlertState({
                headerText: "Error retrieving user",
                inProgress: false,
                messageText: error.message,
                showAlert: true,
                variantStyle: "danger",
              })
            );
          })
          .finally(() => {
            if (
              sessionUser &&
              sessionUser["id"] &&
              sessionUser["id"].length > 0
            ) {
              setUserState(sessionUser);
              syncLinkedItems(sessionUser);
            }
          });
      };
      fetchUserData();
    }
  }, [account]);

  return sessionUser;
};
export { useSetSessionUser };
