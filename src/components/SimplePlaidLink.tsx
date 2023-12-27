import React, { useCallback, useState } from 'react';
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../hooks/storeHooks";
import { setPublicToken } from "../store/plaidSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from "../hooks/storeHooks";
import { selectAccessToken } from "../store/msalSlice";
import { axiosInstance } from '../utils/axiosInstance';
// import { useAxiosInterceptor } from '@/hooks/useAxiosInterceptor';


import MsalUtils from  '../utils/msalToken'
import { usePlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';

const SimplePlaidLink = () => {
  const [plaidLinkToken, setPlaidLinkToken] = useState<string | null>(null);
  const accessToken = useAppSelector(selectAccessToken);
 // const msalTokenValue =  MsalUtils();  //useAppSelector(selectAccessToken);
  const dispatch = useAppDispatch();
  // const { axBe } = useAxiosInterceptor();

  // get link_token from your server when component mounts
  React.useEffect(() => {//
    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      method: 'POST'
    };
    
    const createLinkToken = async () => {
      const response = await axiosInstance.post('create_link_token', {}, config);
      const { link_token } = await response.data;
      
      setPlaidLinkToken(link_token);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    console.log(publicToken, metadata);
    sessionStorage.setItem('plaidApiPublicToken',publicToken);
    dispatch(setPublicToken(publicToken));
  }, []);
 
  const { open, ready } = usePlaidLink({
    token: plaidLinkToken,
    onSuccess,
    // onEvent
    // onExit
  });

  return (
    <>
      <FontAwesomeIcon icon={faPlus} className='iconStyle' onClick={() => open()} /><span onClick={() => open()}>Add Account</span>
    
    </>
  );
};

export default SimplePlaidLink;