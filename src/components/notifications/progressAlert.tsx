import { useState } from 'react';
import { Alert, AlertHeading, Container, Navbar, Spinner, Toast, ToastContainer   } from 'react-bootstrap';
import divWithClassName from 'react-bootstrap/esm/divWithClassName';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle, faTriangleExclamation, faRotate } from '@fortawesome/free-solid-svg-icons'
import { useAppSelector, useAppDispatch } from "@hooks/useStoreHooks";
import { selectHeaderText, selectIcon, selectInProgress, selectMessageText, selectShowAlert, selectVariantStyle, setShowAlert } from "@store/alertSlice"


function AlertDismissible() {
  const showComponent = useAppSelector(selectShowAlert);
  const dispatch = useAppDispatch();
  const headerText = useAppSelector(selectHeaderText);
  const messageText = useAppSelector(selectMessageText);
  const icon = useAppSelector(selectIcon);
  const inProgress = useAppSelector(selectInProgress);
  const variantStyle = useAppSelector(selectVariantStyle);
  // const toastTimeout = variantStyle === "danger" ? 7000 :
  //   variantStyle === "info" ? 65000 :
  //     variantStyle === "success" ? 2500 :
  //       4000;

  return (
    <>
      <Container fluid>
        <ToastContainer
          className="p-3"
          position="middle-center"
          style={{ zIndex: 10 }}>
          <Toast onClose={() => { dispatch(setShowAlert(false)) }}
            show={showComponent}
            delay={variantStyle === "error" ? 7000 : 3000}
            autohide
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
    </>
  );
}

export default AlertDismissible;