import { loginSync } from '../../utils/loginStateUtils.ts';
import { useAppSelector, useAppDispatch } from "../../hooks/storeHooks";
import { selectAccessToken, selectUid} from "../../store/msalSlice";
import { axiosInstance } from "../../utils/axiosInstance";
import Button from "react-bootstrap/Button";

export const StoreRefreshButton = () => {
  const dispatch = useAppDispatch();
  const useSyncUser = loginSync;
  const accessToken = useAppSelector(selectAccessToken);
  const userId = useAppSelector(selectUid);

  const config = {
    headers: {
      Authorization: "Bearer " + accessToken,
    },
  };
  
  
  const handleRefresh = () => {
    // Get User from DB:
    axiosInstance
    .get(`/user/${userId}`, config)
    .then(async (response) => {
      //User Exists:
      if(response.data && response.data.id.length > 0){
        await useSyncUser(response.data, dispatch, accessToken);
      }
    })
    .catch((error) => {
      console.error(error);
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
