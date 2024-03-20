import { useAppSelector, useAppDispatch } from "@/hooks/useStoreHooks";
import { selectAccessToken, setAccessToken } from "@store/msalSlice";
import { msalConfig } from "../config/authConfig";
import { logError }  from "@utils/logger";


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
        logError(e as Error);
        console.log(e);
        return '';
      }
    }
  }
  return msalTokenStoreValue;
}


export default MsalUtils;