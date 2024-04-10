import { useEffect, useState } from 'react';
import { Alert, Button, Card, CardBody, Col, Form, Modal, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTriangleExclamation, faPlus } from '@fortawesome/free-solid-svg-icons'
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { createTransactionTag } from '@/store/userSlice';

/**
 * Create new tag for transaction list items
 * @param props
 */

export default function CreateTag(props) {
  const { userId, tags } = props;
  const [validated, setValidated] = useState(false);
  const [modalIsVisible, setModalIsVisible] = useState(false);
  const [showDupeTagMessage, setShowDupeTagMessage] = useState(false);
  const [formTagValue, setFormTagValue] = useState("");
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tags && tags.length > 0) {
      let dupeExists = false;
      tags.forEach(element => {
        if (element.toLowerCase() === formTagValue.toLowerCase()) {
          dupeExists = true;
        }
      });
      if (!dupeExists) {
        setShowDupeTagMessage(false);
      } else {
        setShowDupeTagMessage(true);
      };
    }
  }, [formTagValue]);

  const handleFormSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();

      //dispatch form action to Redux
      await dispatch(createTransactionTag(
        userId,
        formTagValue,
        tags
      ));
      
      toggleModal();
      setFormTagValue("");
      setValidated(false);
    }
    else{
      setValidated(true);
    }
  }

  const handleTextAreaChange = (event) => {
    setFormTagValue(event.target.value);
    
  };

  const toggleModal = () => {
    setModalIsVisible(!modalIsVisible);
  };

  return (
    <>
      <Button variant="outline-primary" size="sm" className='addAccountButton' onClick={toggleModal}>
        <FontAwesomeIcon icon={faPlus} className='iconStyle' />Create Tag
      </Button>

      <Modal show={modalIsVisible}
        tag={formTagValue}
        size="lg"
        onHide={toggleModal}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Form noValidate  validated={validated} onSubmit={handleFormSubmit} data-testid="create-tag-form">
          <Modal.Header closeButton>
            <Modal.Title as="h6">Create New Tag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <CardBody>
                <Row className="mb-3">
                  <Col xs={8}>
                    <Form.Group as={Col} controlId="formGridCreateTagDescription">
                      <Form.Label>Tag Name</Form.Label>
                      <Form.Control 
                        required
                        placeholder="Tag Name"
                        type="text"
                        minLength={1}
                        data-testid="tag-create-form-tag-name"
                        autoFocus
                        defaultValue={formTagValue}
                        title={formTagValue}
                        onChange={handleTextAreaChange}
                        style={{ fontSize: ".90em" }} />
                      <Form.Control.Feedback data-testid="tag-create-form-tag-name-is-valid" >Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid" data-testid="tag-create-form-tag-name-is-invalid">Please provide a valid tag name
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                {showDupeTagMessage && 
                <Row className="mb-3"><Col xs={12}>
                <Alert variant="danger"><FontAwesomeIcon icon={faTriangleExclamation} />Tag <b>"{formTagValue}"</b> already exists. Please provide a unique tag name.</Alert>
                </Col></Row>}
              </CardBody>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleModal}>Close</Button>
            <Button variant="primary" type="submit" data-testid="tag-create-form-submit-btn">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    </>
  );
}