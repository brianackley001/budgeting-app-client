import { useState, useEffect } from "react";
import { useMsal } from "@azure/msal-react";
import { EventType } from "@azure/msal-browser";
import { useAppSelector, useAppDispatch } from "@hooks/storeHooks";
import { setAccessToken, setUid } from "@store/msalSlice";
import { selectTransactionPagination } from "@store/transactionSlice"; 
import { setName, setUserId, setUserName } from "@store/userSlice";
import axiosInstance  from "@utils/axiosInstance";
import { loginSync } from '@utils/loginStateUtils';

const useMsalEvents = () => {
  const [token, setToken] = useState("");
 // const [userInfoSaved, setUserInfoSaved] = useState(true);

  const { instance } = useMsal();
  const dispatch = useAppDispatch();
  const paginationSelector = useAppSelector(selectTransactionPagination);
  // const institutions = useAppSelector(state => state.plaidSlice.institutions);
  //const accessToken = useAppSelector(selectAccessToken);
  const useSyncUser = loginSync;

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
        let accessTokenValue = event.payload.accessToken;

        const userLoginSuccess= sessionStorage.getItem("msal_LOGIN_SUCCESS");
        if (userLoginSuccess) {
          // Get User from DB:
          axiosInstance
            .get(`/user/${event.payload.uniqueId}`)
            .then(async (response) => {
              //User Exists:
              if(response.data && response.data.id.length > 0){
                sessionStorage.setItem("DB_USER_EXISTS", true);
                sessionStorage.removeItem("msal_LOGIN_SUCCESS");
                await useSyncUser(response.data, dispatch, paginationSelector);
              }
              else{
                // NEW User, save to DB:
                const saveUserPayload = {
                  id: sessionStorage.getItem("userId"),
                  userId: sessionStorage.getItem("userId"),
                  userName: sessionStorage.getItem("userName"),
                  userShortName: sessionStorage.getItem("userShortName"),
                  preferences: {transactionItemsPerPage: 10},
                  transactionTags: ["Verify"],
                  dateCreated: new Date().toUTCString(),
                  dateUpdated: new Date().toUTCString(),
                };
    
                axiosInstance
                  .post(`user`, saveUserPayload)
                  .then((response) => {
                    //console.log("New User Saved:/n" + JSON.stringify(response.data));
                    sessionStorage.removeItem("msal_LOGIN_SUCCESS");
                  })
                  .catch((error) => {
                    console.error(error);
                  });;
              }
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
        //setUserInfoSaved(false);
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
