import { useAppSelector, useAppDispatch } from "../hooks/storeHooks";
import { selectAccessToken, setAccessToken } from "../store/msalSlice";
import { msalConfig } from "../../src/authConfig";


let msalToken = ''
const dispatch = useAppDispatch();


const getStoreValue = () => {
  return useAppSelector(selectAccessToken);
}

const getSessionValue = (key: string) => {
  // retrieve from SESSION  storage
  const msalTokens = sessionStorage.getItem(key) ?? '';
  if(msalTokens && msalTokens["accessToken"] !== '') {
    try{
      let sessionItemID = JSON.parse(msalTokens).accessToken[0];
      let itemValue = sessionStorage.getItem(sessionItemID) ?? '';
      msalToken = JSON.parse(itemValue).secret ?? '';
      dispatch(setAccessToken(msalToken));
      return msalToken;
    }
    catch(e) {
      console.log(e);
      return '';
    }
  }
}

const getAccessToken = () => {
  // const dispatch = useAppDispatch();
  // const msalTokenStoreValue = useAppSelector(selectAccessToken);
  const msalTokenStoreValue = getStoreValue();
  if (!msalTokenStoreValue || msalTokenStoreValue === '') {
    msalToken = getSessionValue(`msal.token.keys.${msalConfig.auth.clientId}`) ?? '';
    if(msalToken && msalToken !== '') {
      dispatch(setAccessToken(msalToken));
      return msalToken;
    }
    // retrieve from SESSION  storage
    // const msalTokens = sessionStorage.getItem(`msal.token.keys.${msalConfig.auth.clientId}`) ?? '';
    // if(msalTokens && msalTokens["accessToken"] !== '') {
    //   try{
    //     let sessionItemID = JSON.parse(msalTokens).accessToken[0];
    //     let itemValue = sessionStorage.getItem(sessionItemID) ?? '';
    //     msalToken = JSON.parse(itemValue).secret ?? '';
    //     dispatch(setAccessToken(msalToken));
    //     return msalToken;
    //   }
    //   catch(e) {
    //     console.log(e);
    //     return '';
    //   }
    // }
  }
  return msalTokenStoreValue;
}

export {getStoreValue, getSessionValue, getAccessToken};