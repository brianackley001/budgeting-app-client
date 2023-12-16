import React, { useCallback, useState } from 'react';
import { Button } from "react-bootstrap";


import MsalUtils from  '../utils/msalToken'
import { usePlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';

const SimplePlaidLink = () => {
  const [plaidLinkToken, setPlaidLinkToken] = useState<string | null>(null);
  const msalTokenValue =  MsalUtils();  //useAppSelector(selectAccessToken);

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
      console.log(`link_token: ${plaidLinkToken}`);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    console.log(publicToken, metadata);
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