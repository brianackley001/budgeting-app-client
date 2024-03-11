
import Button from "react-bootstrap/Button";
import { useAppSelector, useAppDispatch } from "@hooks/useStoreHooks";
import { selectAccessToken, selectUid} from "@store/msalSlice";
import { getItemAccounts } from "@store/accountSlice";
import { syncTransactions} from "@store/transactionSlice";

export const TestingButton = () => {
  const dispatch = useAppDispatch();
  //const paginationSelector = useAppSelector(selectTransactionPagination);
  const userId = useAppSelector(selectUid);

  
  
  const handleAccounts = () => {
    try {
      dispatch(getItemAccounts(userId, 'b0gv6ge1q7fxD0pNjebruZevZ4OK9bFqrqxqz')); //WF Institution
    }
    catch (error) {
      console.error(error);
    }
    
  };
  const handleTransactionSync = () => {
    try {
      const institution = {
        id: 'ins_127991',
        name: 'Wells Fargo'
      }
      dispatch(syncTransactions(userId, 'b0gv6ge1q7fxD0pNjebruZevZ4OK9bFqrqxqz', institution));
    }
    catch (error) {
      console.error(error);
    }
    
  };

  return (
    <>
      <Button variant="warning" onClick={() => handleAccounts()}>Accounts</Button> <br />
      <Button variant="warning" onClick={() => handleTransactionSync()}>TransactionSync</Button>
    </>
    // <DropdownButton variant="warning" id="dropdown-item-button" title="Testing">
    //   <Dropdown.Item as="button" onClick={() => handleAccounts()}>
    //     Accounts
    //   </Dropdown.Item>
    //   <Dropdown.Item as="button" onClick={() => handleTransactionSync()}>
    //     TransactionSync action
    //   </Dropdown.Item>
    //   <Dropdown.Item as="button" onClick={() => handleAccounts()}>
    //     InvestmentSync
    //   </Dropdown.Item>
    //   <Dropdown.Item as="button" onClick={() => handleAccounts()}>
    //     BalanceSync
    //   </Dropdown.Item>
    // </DropdownButton>
  );
};