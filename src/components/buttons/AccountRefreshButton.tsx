import { useState, useEffect } from "react";
import{ Button, Spinner } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { getAccountBalances, setSyncAccountRequest } from '@store/accountSlice';
import { setSyncRequestItems } from "@store/syncRequestSlice"; 
import { useSetSyncAccount } from "@hooks/useSyncAccount";
import { useSyncRequestManager } from "@hooks/useSyncRequestManager";
import { logEvent } from "@utils/logger";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'


export const AccountRefreshButton = () => {
  const [isAccountBalanceLoading, setAccountBalanceLoading] = useState(false);
  const userId = useAppSelector(state => state.userSlice.userId);
  const syncAccountRequest = useAppSelector((state) => state.accountSlice.syncAccountRequest);
  const dispatch = useAppDispatch();
  useSetSyncAccount();
  useSyncRequestManager();

  const refreshAccountBalances = async() => {
    logEvent("AccountRefreshButton: refreshAccountBalances", { userId: userId });

    // Initiate account balance sync:
    dispatch(setSyncRequestItems(["account"]));
    dispatch(setSyncAccountRequest({inProgress: true, standAloneRequest: false, errors: []}));

    setAccountBalanceLoading(true);
    await dispatch(getAccountBalances(userId));
  };

  useEffect(() => {
    if (isAccountBalanceLoading && !syncAccountRequest.inProgress) {
      setAccountBalanceLoading(false);
    }
  }, [isAccountBalanceLoading, syncAccountRequest.inProgress]);

  return (
    <Button variant={isAccountBalanceLoading ? "secondary" : "outline-secondary"} disabled={isAccountBalanceLoading}>
      {!isAccountBalanceLoading &&
        <FontAwesomeIcon icon={faRotate} onClick={() => refreshAccountBalances()} title="Refresh Account Balances" />}
      {isAccountBalanceLoading &&
        <Spinner
          as="span"
          animation="border"
          size="sm"
          role="status"
          aria-hidden="true"
        />}
    </Button>
  );
};