
import React, { useCallback, useState, useEffect } from 'react';
import{ Card, Row, Col } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import AccountSummaryList from "../components/accounts/AccountSummaryList.tsx";
import { AccountSummaryListItemType} from "../types/accountSummaryListItem.ts";
import { useAppSelector, useAppDispatch } from "../hooks/storeHooks.ts";
import { useAcquireAccessToken } from "../hooks/useAcquireAccessToken.js";


export const Dashboard = () => {
  useAcquireAccessToken();
  const accessToken = useAppSelector(state => state.msalSlice.accessToken); 
  const accountItems = useAppSelector(state => state.accountSlice.accounts);
  const netWorth = accountItems
    .filter((item) => (item.type === 'depository' || item.type === 'investment'))
    .reduce((a, item) => a + item.balances.current, 0);
  const debtTotal = accountItems
    .filter((item) => item.type === 'credit' || item.type === 'loan')
    .reduce((a, item) => a + item.balances.current, 0);
    const netWorthDisplayValue =( netWorth - debtTotal).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) 

  // useEffect(() => {
    
  // }, [Dashboard]);

  return (
    <>
      <div className="dashboardAccountContainer">
        <Card>
          <Card.Body>
            <Card.Title>Accounts</Card.Title>
            <Card.Subtitle className="mb-2 mt-4 text-muted">Net Worth</Card.Subtitle>
            <Card.Subtitle className="mb-2 mt-2 text-bold">{netWorthDisplayValue}</Card.Subtitle>
            <Card.Text>
              <AccountSummaryList items={accountItems} />
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};