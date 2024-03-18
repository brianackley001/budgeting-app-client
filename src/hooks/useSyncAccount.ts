import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { setAccounts } from "@store/accountSlice";
import { setSyncAccountRequest } from "@store/accountSlice"; 
import { logError, logEvent } from "@utils/logger";
import axiosInstance from "@utils/axiosInstance";

const useSetSyncAccount = () => {
  const dispatch = useAppDispatch();
  const syncAccountSyncRequest = useAppSelector(
    (state) => state.accountSlice.syncAccountRequest
  );
  const userId = useAppSelector((state) => state.userSlice.userId);
  const [syncInProgress, setSyncInProgress] = useState(false);

  useEffect(() => {
    const fetchAccountData = async () => {
      let requestErrors = [];
      setSyncInProgress(true);
      //API Call:
      try {
        logEvent("useSyncAccounts: getAccountBalances", { userId: userId });
        const response = await axiosInstance.post(`accountbalance`, {
          userId: userId,
        });
        requestErrors = response.data.errors ? response.data.errors : [];
        dispatch(setAccounts(response.data.accounts));
      } catch (error) {
        console.log(error);
        logError(error as Error);
      } finally {
        logEvent("getAccountBalances END", { userId: userId });
        dispatch(
          setSyncAccountRequest({
            inProgress: false,
            standAloneRequest: syncAccountSyncRequest.standAloneRequest,
            errors: requestErrors,
          })
        );
        setSyncInProgress(false);
      }
    };

    if(syncAccountSyncRequest.inProgress && !syncInProgress) {
      fetchAccountData();
    }


  },  [syncAccountSyncRequest.errors, syncAccountSyncRequest.inProgress, syncInProgress]);

  return syncAccountSyncRequest;
};
export { useSetSyncAccount };