import React, { useCallback, useState } from 'react';
import { Button } from "react-bootstrap";
import { useAppDispatch } from "../hooks/storeHooks";
import { setPublicToken } from "../store/plaidSlice";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector } from "../hooks/storeHooks";
import { selectAccessToken, selectUid } from "../store/msalSlice";
import { setAccounts } from "../store/accountSlice";
import { axiosInstance } from '../utils/axiosInstance';
// import { useAxiosInterceptor } from '@/hooks/useAxiosInterceptor';


import MsalUtils from '../utils/msalToken'
import {
  usePlaidLink,
  PlaidLinkOnSuccessMetadata,
  PlaidLinkOnExitMetadata,
  PlaidLinkError,
  PlaidLinkOptionsWithLinkToken,
  PlaidLinkOnEventMetadata,
  PlaidLinkStableEvent,
} from 'react-plaid-link';

const SimplePlaidLink = () => {
  const [plaidLinkToken, setPlaidLinkToken] = useState<string | null>(null);
  const accessToken = useAppSelector(selectAccessToken);
  const userId = useAppSelector(selectUid);
  const msalTokenValue =  MsalUtils();  //useAppSelector(selectAccessToken);
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

  const onSuccess = useCallback((publicToken:string, metadata: PlaidLinkOnSuccessMetadata) => {
    const linkedItemObject = {
      public_token: publicToken,
      user_id: userId,
      institution_id: metadata.institution!.institution_id,
      institution_name:metadata.institution!.name
    };
    const institutionAccounts = {
      user_id: userId,
      institution: metadata.institution,
      accounts: metadata.accounts,
    }

    const config = {
      headers: {
        'Content-type': 'application/json',
        'Authorization': `Bearer ${accessToken}`,
      },
      method: 'POST'
    };
    // send public_token to your server
    // https://plaid.com/docs/api/tokens/#token-exchange-flow 
    dispatch(setPublicToken(publicToken));
    console.log(`publicToken: ${publicToken}`);
    axiosInstance.post('set_access_token', linkedItemObject, config)
      .then((response) => {
        console.log(response.data);
        axiosInstance.get(`item/${response.data.item_id}/${userId}`, config)
          .then((response) => {
            console.log(response.data);
            //dispatch(setAccounts(response.data.accounts));
          }
          ).catch((error) => {
            console.log(error);
          });
      }
      ).catch((error) => {
        console.log(error);
      });
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