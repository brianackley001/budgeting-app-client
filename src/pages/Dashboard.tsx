
import React, { useCallback, useState, useEffect } from 'react';
import{ Card, Row, Col } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import AccountSummaryListItem from "../components/accounts/AccountSummaryListItem.tsx";
import { AccountSummaryListItemType} from "../types/accountSummaryListItem.ts";
import { useAppSelector, useAppDispatch } from "../hooks/storeHooks.ts";
import { useAcquireAccessToken } from "../hooks/useAcquireAccessToken.js";
import { selectAccessToken } from "../store/msalSlice.ts";
// import { selectAccessToken } from "../store/userSlice.ts";
// import { axiosInstance } from '../utils/axiosInstance';
// import Button from "react-bootstrap/Button";
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
// import { faCheckCircle, faTriangleExclamation, faRotate } from '@fortawesome/free-solid-svg-icons'
// import { setHeaderText, setIcon,  setMessageText, setInProgress, setShowAlert, setVariantStyle } from '../store/alertSlice'


export const Dashboard = () => {
  useAcquireAccessToken();
  const accessToken = useAppSelector(state => state.msalSlice.accessToken); 
  const accountItems = useAppSelector(state => state.accountSlice.accounts);

  // useEffect(() => {
    
  // }, [Dashboard]);

  return (
    <>
      <div className="dashboardAccountContainer">
        <Card>
          <Card.Body>
            <Card.Title>Accounts</Card.Title>
            <Card.Text>
              <ListGroup variant="flush">
                {accountItems.map((accountItem) => (
                  <AccountSummaryListItem item={accountItem} key={accountItem.id} />
                ))}
              </ListGroup>
            </Card.Text>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
