
import React, { useCallback, useState, useEffect } from 'react';
import{ Card, Row, Col } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../hooks/storeHooks";
import { useAcquireAccessToken } from "../hooks/useAcquireAccessToken";
import { selectAccessToken } from "../store/msalSlice";
import { axiosInstance } from '../utils/axiosInstance';
import Button from "react-bootstrap/Button";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTriangleExclamation, faRotate } from '@fortawesome/free-solid-svg-icons'
import { setHeaderText, setIcon,  setMessageText, setInProgress, setShowAlert, setVariantStyle } from '../store/alertSlice'



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

  const beginSyncOperation = async (dispatch) => {
    dispatch(setInProgress(true));
    dispatch(setHeaderText("Syncing"));
    dispatch(setMessageText("Please wait while we sync your accounts..."));
    dispatch(setIcon({iconType: 'sync', isVisible: true}));
    dispatch(setVariantStyle("secondary"));
    dispatch(setShowAlert(true));
  };
  const broadcastSyncError = async (dispatch, error) => {
    dispatch(setInProgress(false));
    dispatch(setHeaderText(error.header));
    dispatch(setMessageText(error.message));
    dispatch(setVariantStyle("danger"));
    dispatch(setIcon({iconType: 'error', isVisible: true}));
    dispatch(setShowAlert(true));
  };
  
  const endSyncOperation = async (dispatch) => {
    dispatch(setInProgress(false));
    dispatch(setHeaderText("Sync Completed"));
    dispatch(setMessageText("Your account sync is complete."));
    dispatch(setVariantStyle("success"));
    dispatch(setIcon({iconType: 'success', isVisible: true}));
    dispatch(setShowAlert(true));
  };
  function toggleAlert (alertType) {
    switch (alertType) {
      case 0:
        beginSyncOperation(dispatch);
        break;
      case 1:
        endSyncOperation(dispatch);
        break;
      case 2:
        broadcastSyncError(dispatch, {header: "Sync Error", message: "There was an error syncing your account."});
        break;
      default:
        break;
    }
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
                  {/* <button onClick={toggleAlert}>toggleAlert</button> 
                  <button onClick={toggleProgress}>toggleProgress</button>  */}
                  <Button
                    variant="secondary"
                    className='iconStyle'
                    onClick={() => toggleAlert(0)}>
                      <FontAwesomeIcon icon={faRotate} size='xs' />
                    </Button>
                  <Button
                    variant="success"
                    className='iconStyle'
                    onClick={() => toggleAlert(1)}>
                      <FontAwesomeIcon icon={faCheckCircle} size='xs' />
                    </Button>
                  <Button
                    variant="danger"
                    className='iconStyle'
                    onClick={() => toggleAlert(2)}>
                      <FontAwesomeIcon icon={faTriangleExclamation} size='xs' />
                    </Button>
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={1}>
            &nbsp;
          </Col>
        </Row>
      </div>
      
    </>
  );
};
