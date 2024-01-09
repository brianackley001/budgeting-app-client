import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from "../../hooks/storeHooks";
import { selectInProgress, selectHeaderText, selectMessageText, selectShowAlert, setInProgress, setShowAlert } from "../../store/alertSlice";
import Alert from 'react-bootstrap/Alert';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';


function AlertDismissible() {
  //const [show, setShow] = useState(true);

  const showComponent = useAppSelector(selectShowAlert);
  const dispatch = useAppDispatch();
  const headerText = useAppSelector(selectHeaderText);
  const messageText = useAppSelector(selectMessageText);
  const inProgress = useAppSelector(selectInProgress); //dispatch(setAccessToken(event.payload.accessToken));
  // useEffect(() => {
  // }, []);

  return (
    <>
      <Alert show={showComponent} variant="dark" dismissible onClose={() => dispatch(setShowAlert(false))} className='alertFooter' >
        <Alert.Heading>{headerText}</Alert.Heading>
        {inProgress ? <Spinner animation="border" role="status" size="sm"  /> : null}
        <p>{messageText}</p>
        {/* <hr />
        <div className="d-flex justify-content-end">
          <Button onClick={() => dispatch(setShowAlert(false))} variant="outline-success">
            Dismiss
          </Button>
        </div> */}
      </Alert>

      {/* {!showComponent && <Button onClick={() => dispatch(setShowAlert(true))}>Show Alert</Button>} */}
    </>
  );
}

export default AlertDismissible;