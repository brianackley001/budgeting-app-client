import { useCallback, useState, useEffect } from "react";
import{ Button, Dropdown } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { setLinkedItems } from "@store/plaidSlice"; 
import { useSetSyncAccount } from "@hooks/useSyncAccount";
import { useSyncRequestManager } from "@hooks/useSyncRequestManager";
import { logEvent } from "@utils/logger";
import  axiosInstance  from '@utils/axiosInstance';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation, faRightFromBracket } from '@fortawesome/free-solid-svg-icons';
import {
  usePlaidLink,
  PlaidLinkOnSuccessMetadata
} from 'react-plaid-link';


export const RefreshCredentialsButton = (props) => {
  const userId = useAppSelector(state => state.userSlice.userId);
  const {itemId, isError} = props;
  const [plaidLinkToken, setPlaidLinkToken] = useState<string | null>(null);
  const [refreshInProgress, setRefreshInProgress] = useState(false);
  const dispatch = useAppDispatch();
  useSetSyncAccount();
  useSyncRequestManager();

  const handleUpdateSuccess = async () => {
    // validate item/institution error is resolved
    const response = await axiosInstance.get(`/item/${itemId}/${userId}`);
    if(response.data && response.data.item.error == null){
      // update itemError object to resolve the issue
    const updatedLinkedItems = await axiosInstance.post(`/item/error`, {userId: userId, itemId: itemId});
    //update Redux store
    dispatch(setLinkedItems(updatedLinkedItems.data));
    logEvent('PlaidUpdateLinkSuccess', {user_id: userId, itemId: itemId});
    }
  };

  const onSuccess = useCallback((_publicToken:string, metadata: PlaidLinkOnSuccessMetadata) => {
    if(metadata.link_session_id && metadata.accounts){
      handleUpdateSuccess();
    }  
  }, []);
    

  const { open} = usePlaidLink({
    token: plaidLinkToken,
    onSuccess,
    // onEvent
    // onExit
  });

  const refreshItemCredentials = async () => {
    setRefreshInProgress(true);
    logEvent("RefreshCredentialsButton: refreshAccountBalances", { userId: userId, itemId: itemId });
  };

  useEffect(() => {
    const createLinkToken = async () => {
      if(!plaidLinkToken || plaidLinkToken?.length === 0){
      const response = await axiosInstance.post('create_link_token_update',{ userId: userId, itemId: itemId });
      const { link_token } = await response.data;
      setPlaidLinkToken(link_token);
      }
    };

    const openLink = async () => {
      if(plaidLinkToken && plaidLinkToken.length > 0 && refreshInProgress){
        await open();
      }
    };
    createLinkToken();
    openLink();
  }, [refreshInProgress, plaidLinkToken]);

  return (
    <>
    {isError && 
    <Button variant="danger" size="sm" data-testid="button-item-credentials-refresh" onClick={() => refreshItemCredentials()}>
        <FontAwesomeIcon icon={faCircleExclamation} color="white" className='iconStyle' /><span>Repair Credentials</span>
    </Button>}
    {!isError && 
    <Dropdown.Item onClick={refreshItemCredentials} as="button" data-testid="delete-institution-dropdown-item-button">
      <FontAwesomeIcon icon={faRightFromBracket} size='lg' className="iconStyle" style={{ color: "gray" }} />Refresh Credentials
    </Dropdown.Item>}
    </>
    
  );
};