import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { getAccountBalances } from "@store/accountSlice";
import { logError, logEvent } from "@utils/logger";

const useSetSyncAccount = () => {
  const dispatch = useAppDispatch();
  const syncAccountSyncRequest = useAppSelector(
    (state) => state.accountSlice.syncAccountRequest
  );
  const userId = useAppSelector((state) => state.userSlice.userId);
  const [syncInProgress, setSyncInProgress] = useState(false);

  useEffect(() => {
    const fetchAccountData = async () => {
      setSyncInProgress(true);
      //API Call:
      try {
        logEvent("useSyncAccounts: getAccountBalances", { userId: userId });
        await dispatch(getAccountBalances(userId));
      } catch (error) {
        console.log(error);
        logError(error as Error);
      } finally {
        logEvent("getAccountBalances END", { userId: userId });
        setSyncInProgress(false);
      }
    };

    if (syncAccountSyncRequest.inProgress && !syncInProgress) {
      fetchAccountData();
    }
  }, [
    syncAccountSyncRequest.errors,
    syncAccountSyncRequest.inProgress,
    syncInProgress,
  ]);

  return syncAccountSyncRequest;
};
export { useSetSyncAccount };
