import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";
import { useAppDispatch } from "@hooks/useStoreHooks";
import { setAccessToken, setUid } from "@store/msalSlice";
//import { selectTransactionPagination } from "@store/transactionSlice"; 
import { setName, setUserId, setUserName } from "@store/userSlice";
import {useSetSessionUser} from "@hooks/useSetSessionUser";
import { setAlertState } from "@store/alertSlice";
import { logError, logEvent } from "@utils/logger";

const useMsalEvents = () => {
  const [token, setToken] = useState("");

  const { instance } = useMsal();
  const dispatch = useAppDispatch();
  useSetSessionUser();

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS &&
        event.payload.account
      ) {
        setToken(event.payload.accessToken);
        dispatch(setAccessToken(event.payload.accessToken));
        dispatch(setUid(event.payload.uniqueId));

        const userLoginSuccess= sessionStorage.getItem("msal_LOGIN_SUCCESS");
        if (userLoginSuccess) {
          logEvent("user-login", {userId: event.payload.uniqueId});
          dispatch(setAlertState({
            headerText: "Syncing",
            inProgress: true,
            messageText: "Please wait while we sync your accounts...",
            showAlert: true
          }));
          }
      }

      if (
        event.eventType === EventType.LOGIN_SUCCESS &&
        event.payload.account
      ) {
        // persist user to Redux store
        dispatch(setUserId(event.payload.account.localAccountId));
        dispatch(setUserName(event.payload.account.username));
        dispatch(setName(event.payload.account.name));
        sessionStorage.setItem("msal_LOGIN_SUCCESS", true);
        sessionStorage.setItem("userId", event.payload.account.localAccountId);
        sessionStorage.setItem("userName", event.payload.account.username);
        sessionStorage.setItem("userShortName", event.payload.account.name);
      }
    });

    return () => {
      if (callbackId) {
        instance.removeEventCallback(callbackId);
      }
    };
  }, [instance]);

  return token;
};
export { useMsalEvents };
