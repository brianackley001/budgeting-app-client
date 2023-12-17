import React, { useCallback, useState } from 'react';
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../hooks/storeHooks";
import { setPublicToken } from "../store/plaidSlice";


import MsalUtils from  '../utils/msalToken'
import { usePlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';

const SimplePlaidLink = () => {
  const [plaidLinkToken, setPlaidLinkToken] = useState<string | null>(null);
  const msalTokenValue =  MsalUtils();
  const dispatch = useAppDispatch();

  // get link_token from your server when component mounts
  React.useEffect(() => {
    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${msalTokenValue}`,
      },
      method: 'POST'
    };
    
    const createLinkToken = async () => {
      const response = await fetch(`${import.meta.env.VITE_API_URL}/api/create_link_token`, config);
      const { link_token } = await response.json();
      
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
    <Button variant="primary" onClick={() => open()} disabled={!ready}>
      Connect a bank account
    </Button>
  );
};

export default SimplePlaidLink;