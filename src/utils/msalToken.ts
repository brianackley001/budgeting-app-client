import { useAppSelector, useAppDispatch } from "../hooks/storeHooks";
import { selectAccessToken, setAccessToken } from "../store/msalSlice";
import { msalConfig } from "../config/authConfig";


const MsalUtils = () => {
  const dispatch = useAppDispatch();
  const msalTokenStoreValue = useAppSelector(selectAccessToken);
  let msalToken = ''
  if (!msalTokenStoreValue || msalTokenStoreValue === '') {
    // retrieve from SESSION  storage
    const msalTokens = sessionStorage.getItem(`msal.token.keys.${msalConfig.auth.clientId}`) ?? '';
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
  return msalTokenStoreValue;
}


export default MsalUtils;