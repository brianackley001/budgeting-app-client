
import React, { useCallback, useState, useEffect } from 'react';
import{ Button, Card, Row, Col } from "react-bootstrap";
import AccountSummaryList from "@components/accounts/AccountSummaryList.tsx";
import { useAppSelector, useAppDispatch } from "@hooks/storeHooks.ts";
import { useAcquireAccessToken } from "@hooks/useAcquireAccessToken.js";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faRotate } from '@fortawesome/free-solid-svg-icons'
import {getAccountBalances} from '@store/accountSlice.ts';
import { title } from 'process';


export const Dashboard = () => {
  useAcquireAccessToken();
  // const accessToken = useAppSelector(state => state.msalSlice.accessToken); 
  const accountItems = useAppSelector(state => state.accountSlice.accounts);
  const userId = useAppSelector(state => state.userSlice.userId);
  const dispatch = useAppDispatch();
  
  const netWorth = accountItems
    .filter((item) => (item.type === 'depository' || item.type === 'investment'))
    .reduce((a, item) => a + item.balances.current, 0);
  const debtTotal = accountItems
    .filter((item) => item.type === 'credit' || item.type === 'loan')
    .reduce((a, item) => a + item.balances.current, 0);
    const netWorthDisplayValue =( netWorth - debtTotal).toLocaleString('en-US', { style: 'currency', currency: 'USD' }) 

  const refreshAccountBalances = async() => {
    await dispatch(getAccountBalances(userId)); 
  };

  // useEffect(() => {
    
  // }, [Dashboard]);

  return (
    <>
      <div className="dashboardAccountContainer">
        <Card>
          <Card.Body>
            <Card.Title>Accounts <span className='cardHeaderIconRight'><Button variant="outline-secondary"><FontAwesomeIcon icon={faRotate} onClick={() => refreshAccountBalances()}  title="Refresh Account Balances"/></Button></span></Card.Title>
            {accountItems.length > 0 &&
             <Card.Subtitle className="mb-2 mt-4 text-muted">Net Worth</Card.Subtitle>}
            {accountItems.length > 0 &&
              <Card.Subtitle className="mb-2 mt-2 text-bold">{netWorthDisplayValue}</Card.Subtitle>}
            {accountItems.length < 1 &&
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
