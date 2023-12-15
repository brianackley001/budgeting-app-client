import React, { useCallback, useState } from 'react';
import { Button } from "react-bootstrap";

import { usePlaidLink, PlaidLinkOnSuccess } from 'react-plaid-link';

const SimplePlaidLink = ({msalTokenValue}) => {
  const [token, setToken] = useState<string | null>(null);

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
      const response = await fetch(`${process.env.REACT_APP_API_URL}/api/create_link_token`, config);
      const { link_token } = await response.json();
      
      setToken(link_token);
      console.log(`link_token: ${link_token}`);
    };
    createLinkToken();
  }, []);

  const onSuccess = useCallback<PlaidLinkOnSuccess>((publicToken, metadata) => {
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow
    console.log(publicToken, metadata);
  }, []);

  const { open, ready } = usePlaidLink({
    token,
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