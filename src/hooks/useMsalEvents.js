import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";
import { useAppSelector, useAppDispatch } from "../hooks/storeHooks";
import { setAccessToken, setUid } from "../store/msalSlice";
// import { setName, setUserId, setUserName } from "../store/userSlice";
// import { selectName, selectUserName, selectUserId } from "../store/userSlice";
import { axiosInstance } from "../utils/axiosInstance";
//import {saveUser} from '../types/saveUser.ts'

const useMsalEvents = () => {
  const [token, setToken] = useState("");
  const [userInfoSaved, setUserInfoSaved] = useState(true);

  const { instance } = useMsal();
  const dispatch = useAppDispatch();

  useEffect(() => {
    const callbackId = instance.addEventCallback((event) => {
      //store/update token in state
      if (
        event.eventType === EventType.ACQUIRE_TOKEN_SUCCESS &&
        event.payload.account
      ) {
        setToken(event.payload.accessToken);
        dispatch(setAccessToken(event.payload.accessToken));
        dispatch(setUid(event.payload.uniqueId));

        const userInfoSaved = sessionStorage.getItem("msal_LOGIN_SUCCESS");
        if (userInfoSaved) {
          const config = {
            headers: {
              Authorization: "Bearer " + event.payload.accessToken,
            },
          };

          const saveUserPayload = {
            id: sessionStorage.getItem("userId"),
            userId: sessionStorage.getItem("userId"),
            userName: sessionStorage.getItem("userName"),
            userShortName: sessionStorage.getItem("userShortName"),
            linkedItems: [{id: -100, name: "placeholder"}],
            transactions_cursor: "",
          };

          axiosInstance
            .post(`user`, saveUserPayload, config)
            .then((response) => {
              //console.log(response.data);
              sessionStorage.removeItem('msal_LOGIN_SUCCESS');
            })
            .catch((error) => {
              console.error(error);
            });
        }
      }

      // persist user to data store
      if (
        event.eventType === EventType.LOGIN_SUCCESS &&
        event.payload.account
      ) {
        console.log(event.payload.account);
        setUserInfoSaved(false);
        // dispatch(setUserId(event.payload.account.localAccountId));
        // dispatch(setUserName(event.payload.account.username));
        // dispatch(setName(event.payload.account.name));
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
