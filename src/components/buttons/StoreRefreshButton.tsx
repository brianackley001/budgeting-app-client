import { loginSync } from '@/utils/userStateUtils';
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreHooks";
import { setAlertState } from "@store/alertSlice";
import { selectAccessToken, selectUid} from "@store/msalSlice";
import { selectTransactionPagination } from "@store/transactionSlice"; 
import axiosInstance from "@utils/axiosInstance";
import Button from "react-bootstrap/Button";
import { logError, logEvent } from "@utils/logger";

export const StoreRefreshButton = () => {
  const dispatch = useAppDispatch();
  const useSyncUser = loginSync;
  const accessToken = useAppSelector(selectAccessToken);
  const paginationSelector = useAppSelector(selectTransactionPagination);
  const userId = useAppSelector(selectUid);

  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };
  
  
  const handleRefresh = () => {
    logEvent("store-refresh", {userId: userId});
    // Get User from DB:
    axiosInstance
    .get(`/user/${userId}`, config)
    .then(async (response) => {
      //User Exists:
      if(response.data && response.data.id.length > 0){
        await useSyncUser(response.data, dispatch, paginationSelector);
      }
    })
    .catch((error) => {
      console.error(error);
      logError(error);
      dispatch(
        setAlertState({
          headerText: "There was an error refreshing your accounts.",
          icon: {
            iconType:'error', 
            isVisible: true,
            iconSize: '',
            iconColor: 'white',
          },
          inProgress: false,
          messageText: error.message,
          showAlert: true,
          variantStyle: "danger",
        })
      );
    });
    
  };
  return (
    <Button
      variant="info"
      className="ml-auto"
      data-testid="button-store-refresh"
      onClick={() => handleRefresh()}
    >
      Refresh
    </Button>
  );
};
