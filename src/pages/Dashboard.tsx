import{ Card } from "react-bootstrap";
import AccountSummaryList from "@components/accounts/AccountSummaryList.tsx";
import {AccountRefreshButton} from "@components/buttons/AccountRefreshButton.tsx";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { useAcquireAccessToken } from "@hooks/useAcquireAccessToken.js";
import {logTrace} from "@utils/logger";

export const Dashboard = () => {
  useAcquireAccessToken();
  logTrace('Dashboard.tsx');
  const accountItems = useAppSelector(state => state.accountSlice.accounts);
  
  const netWorth = accountItems?.length > 0 ? accountItems
    .filter((item) => (item.type === 'depository' || item.type === 'investment'))
    .reduce((a, item) => a + item.balances.current, 0) : 0;
  const debtTotal = accountItems?.length > 0 ? accountItems
    .filter((item) => item.type === 'credit' || item.type === 'loan')
    .reduce((a, item) => a + item.balances.current, 0) : 0;
    const netWorthDisplayValue =( netWorth - debtTotal).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) 

  return (
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
  );
};