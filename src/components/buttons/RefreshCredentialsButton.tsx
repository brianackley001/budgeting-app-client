import { useState, useEffect } from "react";
import{ Button, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { getAccountBalances, setSyncAccountRequest } from '@store/accountSlice';
import { setSyncRequestItems } from "@store/syncRequestSlice"; 
import { useSetSyncAccount } from "@hooks/useSyncAccount";
import { useSyncRequestManager } from "@hooks/useSyncRequestManager";
import { logEvent } from "@utils/logger";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleExclamation } from '@fortawesome/free-solid-svg-icons'


export const RefreshCredentialsButton = () => {
  const userId = useAppSelector(state => state.userSlice.userId);
  const syncAccountRequest = useAppSelector((state) => state.accountSlice.syncAccountRequest);
  const dispatch = useAppDispatch();
  useSetSyncAccount();
  useSyncRequestManager();

  const refreshItemCredentials = async() => {
    logEvent("RefreshCredentialsButton: refreshAccountBalances", { userId: userId });

    // Initiate account balance sync:
    // dispatch(setSyncRequestItems(["account"]));
    // dispatch(setSyncAccountRequest({inProgress: true, standAloneRequest: false, errors: []}));

  };

  // useEffect(() => {
  //   if (isAccountBalanceLoading && !syncAccountRequest.inProgress) {
  //     setAccountBalanceLoading(false);
  //   }
  // }, [isAccountBalanceLoading, syncAccountRequest.inProgress]);

  return (
    <Button variant="danger" size="sm" data-testid="button-item-credentials-refresh" onClick={() => refreshItemCredentials()}>
      <FontAwesomeIcon icon={faCircleExclamation} color="white" className='iconStyle' /><span>Repair Credentials</span>
  </Button>
  );
};