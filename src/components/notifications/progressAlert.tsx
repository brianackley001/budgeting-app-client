import { Alert, Container, Navbar, Spinner } from 'react-bootstrap';
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
  const DivStyledAsH6 = divWithClassName('h6');

  return (
    <>
      <Container fluid>
        <Navbar expand="lg" fixed="bottom">
          <Alert show={showComponent} variant={variantStyle} dismissible onClose={() => dispatch(setShowAlert(false))} className='alertFooter me-auto my-2 my-lg-0 mb-3' >
            <Alert.Heading as={DivStyledAsH6}>{headerText}</Alert.Heading>
            {inProgress ? <Spinner animation="border" role="status" size="sm" /> : null}
            <p>
              <span className='iconStyle'>
                {icon && icon.iconType === 'error' && icon.isVisible ? <FontAwesomeIcon icon={faTriangleExclamation} /> : null}
                {icon && icon.iconType === 'success' && icon.isVisible ? <FontAwesomeIcon icon={faCheckCircle} /> : null}
                {icon && icon.iconType === 'sync' && icon.isVisible ? <FontAwesomeIcon icon={faRotate} /> : null}
              </span>
              {messageText}
            </p>
          </Alert>
        </Navbar>
      </Container>
    </>
  );
}

export default AlertDismissible;