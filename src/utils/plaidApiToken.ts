import { useAppSelector, useAppDispatch } from "../hooks/storeHooks";
import { setPublicToken, selectPublicToken } from "../store/plaidSlice";

const PlaidTokenUtils = () => {
  const dispatch = useAppDispatch();
  const apiPublicTokenValue = useAppSelector(selectPublicToken);
  if (!apiPublicTokenValue || apiPublicTokenValue === '') {
    // retrieve from SESSION  storage
    const localStoragePublicToken = sessionStorage.getItem("plaidApiPublicToken") ?? '';
    if(localStoragePublicToken && localStoragePublicToken["accessToken"] !== '') {
      try{
        dispatch(setPublicToken(localStoragePublicToken));
        return localStoragePublicToken;
      }
      catch(e) {
        console.log(e);
        return '';
      }
    }
  }
  return apiPublicTokenValue;
}

export default PlaidTokenUtils;