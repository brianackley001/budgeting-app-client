
import { useState } from 'react';
import{ Button, Card, Spinner } from "react-bootstrap";
import AccountSummaryList from "@components/accounts/AccountSummaryList.tsx";
import {AccountRefreshButton} from "@components/buttons/AccountRefreshButton.tsx";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreHooks";
import { useAcquireAccessToken } from "@hooks/useAcquireAccessToken.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import {getAccountBalances} from '@store/accountSlice.ts';
// import { title } from 'process';
import {logTrace} from "@utils/logger";


export const Dashboard = () => {
  useAcquireAccessToken();
  logTrace('Dashboard.tsx');
  const accountItems = useAppSelector(state => state.accountSlice.accounts);
  const userId = useAppSelector(state => state.userSlice.userId);
  const dispatch = useAppDispatch();
  const [isAccountBalanceLoading, setAccountBalanceLoading] = useState(false);
  
  const netWorth = accountItems && accountItems.length > 0 ? accountItems
    .filter((item) => (item.type === 'depository' || item.type === 'investment'))
    .reduce((a, item) => a + item.balances.current, 0) : 0;
  const debtTotal = accountItems && accountItems.length > 0 ? accountItems
    .filter((item) => item.type === 'credit' || item.type === 'loan')
    .reduce((a, item) => a + item.balances.current, 0) : 0;
    const netWorthDisplayValue =( netWorth - debtTotal).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) 

  const refreshAccountBalances = async() => {
    setAccountBalanceLoading(true);
    await dispatch(getAccountBalances(userId));
    // delay timer to allow for the loading spinner to be displayed for a minimum amount of time 
    setTimeout(() => {
      setAccountBalanceLoading(false);
    }, 125);  
  };
  return (
    <>
      <div className="dashboardAccountContainer">
        <Card>
          <Card.Body>
            <Card.Title>Accounts {accountItems && accountItems.length > 0 && <span className='cardHeaderIconRight'>
              <AccountRefreshButton /></span>}
            </Card.Title>
            {accountItems && accountItems.length > 0 &&
             <Card.Subtitle className="mb-2 mt-4 text-muted">Net Worth</Card.Subtitle>}
            {accountItems && accountItems.length > 0 &&
              <Card.Subtitle className="mb-2 mt-2 text-bold">{netWorthDisplayValue}</Card.Subtitle>}
            {accountItems && accountItems.length < 1 &&
              <Card.Subtitle className="mb-2 mt-2 text-bold">Please Navigate to the "Accounts" page and use the "Add Account" button to link a financial account</Card.Subtitle>}
            <span className='card-text'>
              <AccountSummaryList items={accountItems} />
            </span>
          </Card.Body>
        </Card>
      </div>
      {/* To-Do: Add Trends */}
    </>
  );
};
