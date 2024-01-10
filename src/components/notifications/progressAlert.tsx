import { useEffect, useState } from 'react';
import { useAppSelector, useAppDispatch } from "../../hooks/storeHooks";
import { selectHeaderText, selectIcon, selectInProgress, selectMessageText, selectShowAlert, selectVariantStyle, setShowAlert } from "../../store/alertSlice";
import Alert from 'react-bootstrap/Alert';
import Spinner from 'react-bootstrap/Spinner';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTriangleExclamation, faRotate } from '@fortawesome/free-solid-svg-icons'
import divWithClassName from 'react-bootstrap/esm/divWithClassName';

function AlertDismissible() {

  const showComponent = useAppSelector(selectShowAlert);
  const dispatch = useAppDispatch();
  const headerText = useAppSelector(selectHeaderText);
  const messageText = useAppSelector(selectMessageText);
  const icon = useAppSelector(selectIcon);
  const inProgress = useAppSelector(selectInProgress);
  const variantStyle = useAppSelector(selectVariantStyle);
  const DivStyledAsH6 = divWithClassName('h6')
  // useEffect(() => {
  // }, []);

  return (
    <>
      <Alert show={showComponent} variant={variantStyle} dismissible onClose={() => dispatch(setShowAlert(false))} className='alertFooter' >
        <Alert.Heading as={DivStyledAsH6}>{headerText}</Alert.Heading>
        {inProgress ? <Spinner animation="border" role="status" size="sm"  /> : null}
        <p>
          <span className='iconStyle'>
            {icon.iconType === 'error' && icon.isVisible ?   <FontAwesomeIcon icon={faTriangleExclamation}  /> : null}
            {icon.iconType === 'success' && icon.isVisible ? <FontAwesomeIcon icon={faCheckCircle} /> : null}
            {icon.iconType === 'sync' && icon.isVisible ? <FontAwesomeIcon icon={faRotate} /> : null}
            </span>
          {messageText}
        </p>
      </Alert>
    </>
  );
}

export default AlertDismissible;