import { useState } from "react";
import{ Button } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { setAccounts } from "@store/accountSlice";
import { setAlertState } from "@store/alertSlice";
import { deleteLinkedItem } from "@store/plaidSlice"; 
import { logError } from "@utils/logger";


export const DeleteInstitutionButton = (props) => {
  const userId = useAppSelector(state => state.userSlice.userId);
  const {handleClose, institutionName, itemId} = props;
  const [deleteInProgress, setDeleteInProgress] = useState(false);
  const dispatch = useAppDispatch();

  const handleDeleteAction = async () => {
    try {
      setDeleteInProgress(true);
      console.log(`delete institution/item:  ${itemId} | userId: ${userId}`);
      const response = await dispatch(deleteLinkedItem(userId, itemId));
      if(response)
        dispatch(setAccounts(response.updatedAccounts));
      
      dispatch(
        setAlertState({
          headerText: `"${institutionName}" Removed`,
          inProgress: false,
          messageText: `"${institutionName}" successfully removed. ${response?.deleteSummary.transactions.deletedTransactionTotal} transactions removed.`,
          showAlert: true,
          variantStyle: "success",
        })
      );
      handleClose();
      setDeleteInProgress(false);
    } catch (error: any) {
      logError(error as Error);
      dispatch(
        setAlertState({
          headerText: `"${institutionName}" removal error`,
          inProgress: false,
          messageText: error.message,
          showAlert: true,
          variantStyle: "danger",
        })
      );
    }
  }

  return (
    <Button variant="primary" onClick={handleDeleteAction} data-testid="institution-delete-modal-save-button" disabled={deleteInProgress}>
      Delete
    </Button>
  );
};