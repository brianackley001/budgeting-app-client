import { useState, useEffect } from "react";
import { Container, Spinner, Toast, ToastContainer } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTriangleExclamation, faRotate } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector, useAppDispatch } from "@hooks/useStoreHooks";
import { selectHeaderText, selectIcon, selectInProgress, selectMessageText, selectShowAlert, selectVariantStyle, setShowAlert } from "@store/alertSlice"


function AlertDismissible() {
  const dispatch = useAppDispatch();
  const headerText = useAppSelector(selectHeaderText);
  const icon = useAppSelector(selectIcon);
  const inProgress = useAppSelector(selectInProgress);
  const messageText = useAppSelector(selectMessageText);
  const showComponent = useAppSelector(selectShowAlert);
  const variantStyle = useAppSelector(selectVariantStyle);
  const [autoHide, setAutoHide] = useState(true);
  const [toastTimeout, setToastTimeout] = useState(1000);

  useEffect(() => {
    if (variantStyle === "error") {
      setToastTimeout(7000);
      setAutoHide(true);
    } else if (variantStyle === "info") {
      setToastTimeout(960000);
      setAutoHide(false);
    } else if (variantStyle === "success") {
      setToastTimeout(2500);
      setAutoHide(true);
    } else {
      setToastTimeout(4000);
      setAutoHide(true);
    }
  }, [autoHide, variantStyle]);
  return (
    <Container fluid>
      <ToastContainer
        className="p-3"
        position="middle-center"
        style={{ zIndex: 10 }}>
        <Toast onClose={() => { dispatch(setShowAlert(false)) }}
          show={showComponent}
          delay={toastTimeout}
          autohide={autoHide}
          className="d-inline-block m-1 p-3"
          style={{ zIndex: 1 }}
          bg={variantStyle}>
          <Toast.Header>
            <strong className="me-auto">
              {headerText}
            </strong>
          </Toast.Header>
          <Toast.Body className={'text-white'}>
            {inProgress ? <Spinner animation="border" role="status" size="sm" /> : null}
            <p>
              <span className='iconStyle'>
                {icon && icon.iconType === 'error' && icon.isVisible ? <FontAwesomeIcon icon={faTriangleExclamation} /> : null}
                {icon && icon.iconType === 'success' && icon.isVisible ? <FontAwesomeIcon icon={faCheckCircle} /> : null}
                {icon && icon.iconType === 'sync' && icon.isVisible ? <FontAwesomeIcon icon={faRotate} /> : null}
              </span>
              {messageText}
            </p>
          </Toast.Body>
        </Toast>
      </ToastContainer>
    </Container>
  );
}

export default AlertDismissible; 