import React, { useCallback, useState } from 'react';
import { Button } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreHooks";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { selectAccessToken } from "@store/msalSlice";
import { getItemAccounts } from "@store/accountSlice";
import  axiosInstance  from '@utils/axiosInstance';
import {logError, logEvent } from "@utils/logger";


import {
  usePlaidLink,
  PlaidLinkOnSuccessMetadata
} from 'react-plaid-link';

const SimplePlaidLink = () => {
  const [plaidLinkToken, setPlaidLinkToken] = useState<string | null>(null);
  const accessToken = useAppSelector(selectAccessToken);
  const userId = useAppSelector(state => state.userSlice.userId);
  const dispatch = useAppDispatch();

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

  const onSuccess = useCallback((publicToken:string, metadata: PlaidLinkOnSuccessMetadata) => {
    logEvent('PlaidLinkSuccess', {user_id: userId, institution_id: metadata.institution!.institution_id});
    const linkedItemObject = {
      public_token: publicToken,
      user_id: userId,
      institution_id: metadata.institution!.institution_id,
      institution_name:metadata.institution!.name
    };

    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow 
    //dispatch(setPublicToken(publicToken));

    // handle DB/API updates & calls..
    handleLinkSuccessData(linkedItemObject);
  }, []);

  const handleLinkSuccessData = async(linkedItemObject) => {
    try {
      const tokenResponse = await axiosInstance.post('set_access_token', linkedItemObject);
      await dispatch(getItemAccounts(userId, tokenResponse.data.item_id));
    }
    catch (error) {
      logError(error as Error);
    }
  };

  const { open } = usePlaidLink({
    token: plaidLinkToken,
    onSuccess,
    // onEvent
    // onExit
  });

  return (
    <Button variant="outline-success" size="sm" className='addAccountButton' onClick={() => open()} tabIndex={0}>
      <FontAwesomeIcon icon={faPlus} className='iconStyle' />Add Account
    </Button>
  );
};

export default SimplePlaidLink;