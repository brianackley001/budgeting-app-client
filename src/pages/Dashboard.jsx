
import React, { useCallback, useState, useEffect } from 'react';
import{ Card, Row, Col } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../hooks/storeHooks";
import { useAcquireAccessToken } from "../hooks/useAcquireAccessToken";
import { selectAccessToken } from "../store/msalSlice";
import { axiosInstance } from '../utils/axiosInstance';
import AlertDismissible from '../components/notifications/progressAlert';
import { setHeaderText, setMessageText, setInProgress, setShowAlert } from '../store/alertSlice'



const accountItems = [
  { id: 1, name: "Account 1" },
  { id: 2, name: "Account 2" },
  { id: 3, name: "Account 3" },
  { id: 4, name: "Account 4" },
  { id: 5, name: "Account 5" },
  { id: 6, name: "Account 6" },
  { id: 7, name: "Account 7" },
  { id: 8, name: "Account 8" },
  { id: 9, name: "Account 9" },
  { id: 10, name: "Account 10" },
];

export const Dashboard = () => {
  useAcquireAccessToken();
  const accessToken = useAppSelector(selectAccessToken);  
  const [localInProgress, setLocalInProgress] = useState(false);
  const [localShowAlert, setLocalShowAlert] = useState(false);
  
  const dispatch = useAppDispatch();

  function toggleAlert () {
    dispatch(setHeaderText("This is your alert message..."));
    dispatch(setMessageText("Things are happening..."));
    setLocalInProgress(!localInProgress);
    dispatch(setInProgress(localInProgress));
    setLocalShowAlert(!localShowAlert);
    dispatch(setShowAlert(localShowAlert));
  }
  function toggleProgress () {
    setLocalInProgress(!localInProgress);
    dispatch(setInProgress(localInProgress));
  }


  // useEffect(() => {
    
  // }, [Dashboard]);

  return (
    <>
      <div className="d-flex justify-content-around">
        <Row>
          <Col xs={1}>
            &nbsp;
          </Col>
          <Col xs={8}>
            <Card style={{ width: "22rem" }}>
              <Card.Body>
                <Card.Header>Add Accounts</Card.Header>
                <Card.Text>
                  Add external financial accounts to your dashboard to start
                  pulling in transaction data.
                  <br />  
                  {/* <button onClick={() => getApiPublicToken()}>Get Info from API</button> */}
                  <button onClick={toggleAlert}>toggleAlert</button> 
                  <button onClick={toggleProgress}>toggleProgress</button> 
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={1}>
            &nbsp;
          </Col>
        </Row>
      </div>
      
      <AlertDismissible />
    </>
  );
};
