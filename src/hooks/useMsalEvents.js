import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";
import { useAppDispatch } from "@hooks/useStoreHooks";
import { setAccessToken, setUid } from "@store/msalSlice";
import { setSyncRequestItems } from "@store/syncRequestSlice";
import { setName, setSyncUserRequest, setUserId, setUserName } from "@store/userSlice";
import { useSetSyncAccount } from "@hooks/useSyncAccount";
import { useSyncRequestManager } from "@hooks/useSyncRequestManager";
import { useSetSessionUser } from "@hooks/useSetSessionUser";
import { useSetSyncTransaction } from "@hooks/useSyncTransaction";
import { logEvent } from "@utils/logger";

const useMsalEvents = () => {
  const [token, setToken] = useState("");
  const { instance } = useMsal();
  const dispatch = useAppDispatch();
  useSetSyncAccount();
  useSetSessionUser();
  useSetSyncTransaction();
  useSyncRequestManager();

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      if (
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS &&
        event.payload.account
      ) {
        setToken(event.payload.accessToken);
        dispatch(setAccessToken(event.payload.accessToken));
        dispatch(setUid(event.payload.uniqueId));

        const userLoginSuccess = sessionStorage.getItem("msal_LOGIN_SUCCESS");
        if (userLoginSuccess) {
          logEvent("user-login", { userId: event.payload.uniqueId });
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

        // Initiate user/account/transaction sync:
        dispatch(setSyncRequestItems(["user", "account", "transaction"]));
        dispatch(setSyncUserRequest({inProgress: true, standAloneRequest: false, errors: []}));
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
