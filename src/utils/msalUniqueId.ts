import { useAppSelector, useAppDispatch } from "../hooks/storeHooks";
import { selectUid, setUid } from "../store/msalSlice";
import { msalConfig } from "../config/authConfig";

const MsalUidUtils = () => {
  const dispatch = useAppDispatch();
  const msalUniqueId = useAppSelector(selectUid);
  let msalUid = ''
  if (!msalUniqueId || msalUniqueId === '') {
    // retrieve from SESSION  storage
    const msalTokens = sessionStorage.getItem(`msal.token.keys.${msalConfig.auth.clientId}`) ?? '';
    if(msalTokens && msalTokens["accessToken"] !== '') {
      try{
        let tokenValues = JSON.parse(msalTokens).accessToken[0].split('.');
        msalUid = sessionStorage.getItem(tokenValues[0]) ?? '';
        dispatch(setUid(msalUid));
        return msalUid;
      }
      catch(e) {
        console.log(e);
        return '';
      }
    }
  }
  return msalUniqueId;
}

export default MsalUidUtils;