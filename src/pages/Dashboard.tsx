import { useState } from "react";
import{ Button, Card } from "react-bootstrap";
import AccountSummaryList from "@components/accounts/AccountSummaryList.tsx";
import { AccountRefreshButton } from "@components/buttons/AccountRefreshButton.tsx";
import { useAppSelector } from "@/hooks/useStoreHooks";
import { useAcquireAccessToken } from "@hooks/useAcquireAccessToken.js";
import {logTrace} from "@utils/logger";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChartPie, faList } from '@fortawesome/free-solid-svg-icons';
import NetWorthChart from '@components/charts/NetWorthChart';

export const Dashboard = () => {
  useAcquireAccessToken();
  logTrace('Dashboard.tsx');
  const accountItems = useAppSelector(state => state.accountSlice.accounts);
  const [showChart, setShowChart] = useState(false);
  
  const netWorth = accountItems?.length > 0 ? accountItems
    .filter((item) => (item.type === 'depository' || item.type === 'investment'))
    .reduce((a, item) => a + item.balances.current, 0) : 0;
  const debtTotal = accountItems?.length > 0 ? accountItems
    .filter((item) => item.type === 'credit' || item.type === 'loan')
    .reduce((a, item) => a + item.balances.current, 0) : 0;
    const netWorthDisplayValue =( netWorth - debtTotal).toLocaleString('en-US', { style: 'currency', currency: 'USD' }); 

    const toggleSummaryView = () => {
      setShowChart(!showChart);
    }
  return (
    <div className="dashboardAccountContainer">
      <Card>
        <Card.Body>
          <Card.Title>Accounts {accountItems && accountItems.length > 0 && <span className='cardHeaderIconRight'>
          <Button variant={"outline-secondary"} className="buttonSpacer"  onClick={() => toggleSummaryView()} >
            {!showChart &&
              <FontAwesomeIcon icon={faChartPie}title="Show Chart" />}
            {showChart &&
              <FontAwesomeIcon icon={faList} title="Show List" />}
          </Button>
            <AccountRefreshButton /></span>}
          </Card.Title>
          {accountItems && accountItems.length > 0 &&
            <Card.Subtitle className="mb-2 mt-4 text-muted">Net Worth</Card.Subtitle>}
          {accountItems && accountItems.length > 0 &&
            <Card.Subtitle className="mb-2 mt-2 text-bold">{netWorthDisplayValue}</Card.Subtitle>}
          {accountItems && accountItems.length < 1 &&
            <Card.Subtitle className="mb-2 mt-2 text-bold">Please Navigate to the "Accounts" page and use the "Add Account" button to link a financial account</Card.Subtitle>}
          <span className='card-text'>
            {!showChart && <AccountSummaryList items={accountItems} />}
            {showChart && <NetWorthChart accountItems={accountItems} />}
          </span>
        </Card.Body>
      </Card>
    </div>
  );
};