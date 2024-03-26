import { faGear, faTriangleExclamation } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect, useState } from "react";
import { Alert, Badge, Button, Card, CardBody, Col, Form, Modal, Row } from "react-bootstrap";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { deleteTransactionTag, updateTransactionTag } from '@/store/userSlice';

{/* <Badge pill bg="secondary" key={index}>{tag}</Badge> */ }

/**
 * Renders mesaging to user that no transaction data matches the current filter criteria
 * @param props
 */

export default function EditTag(props) {
  const { tag, tags, userId } = props;
  const [validated, setValidated] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [formTagValue, setFormTagValue] = useState(tag);
  const [showDupeTagMessage, setShowDupeTagMessage] = useState(false);
  const dispatch = useAppDispatch();

  useEffect(() => {
    if (tags && tags.length > 0) {
      let dupeExists = false;
      const formItemIndex = tags.indexOf(tag); 
      tags.forEach((element, index) => {
        if (element.toLowerCase() === formTagValue.toLowerCase() && index !== formItemIndex) {
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

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  }; 
  const handleDelete = async () => {
    //dispatch form action to Redux
    await dispatch(deleteTransactionTag(userId, tag, tags));
    toggleDeleteMode();
    toggleEditMode();
  };

  const handleFormSubmit = async (event) => {
    const form = event.currentTarget;
    event.preventDefault();
    event.stopPropagation();

    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      
      //dispatch form action to Redux
      await dispatch(updateTransactionTag(
        userId,
        {originalTagValue: tag, modifiedTagValue: formTagValue},
        tags
      ));
      toggleEditMode();
      setFormTagValue("");
      setValidated(false);
    }
  };
  const handleTextAreaChange = (event) => {
    setFormTagValue(event.target.value);
  };

  return (
    <>
      <Badge pill bg="secondary" className="settings-tag-pill" onClick={toggleEditMode}>
        <FontAwesomeIcon className="tag-settings-icon-padding" icon={faGear} color="white" />{tag}
      </Badge>

      <Modal show={isEditMode}
        tag={tag}
        size="lg"
        onHide={toggleEditMode}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Form noValidate validated={validated} onSubmit={handleFormSubmit} data-testid="accordion-form" >
          <Modal.Header closeButton>
            <Modal.Title as="h6">Edit "{tag}" Tag</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <CardBody>
                <Row className="mb-3">
                  <Col xs={5}>
                    <Form.Group as={Col} controlId="formGridTransactionDescription">
                      <Form.Label>Tag Value</Form.Label>
                      <Form.Control required
                        placeholder="Tag Value"
                        type="text"
                        name="tagDescription"
                        data-testid="tag-detail-form-tag-name"
                        autoFocus
                        defaultValue={formTagValue}
                        title={formTagValue}
                        onChange={handleTextAreaChange}
                        style={{ fontSize: ".90em" }} />
                      <Form.Control.Feedback data-testid="tag-detail-form-tag-name-is-valid" >Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid" data-testid="tag-detail-form-tag-name-is-invalid">
                        Please provide a valid  description.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
                {showDupeTagMessage && 
                <Row className="mb-3"><Col xs={12}>
                <Alert variant="danger"><FontAwesomeIcon icon={faTriangleExclamation} />&nbsp;Tag <b>"{formTagValue}"</b> already exists. Please provide a unique tag name.</Alert>
                </Col></Row>}
              </CardBody>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={toggleEditMode}>Close</Button>
            <Button variant="outline-danger" onClick={toggleDeleteMode}>Delete</Button>
            <Button variant="primary" type="submit" data-testid="tag-detail-form-submit-btn">
              Save Changes
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>

      <Modal show={isDeleteMode}
        tag={tag}
        size="sm"
        onHide={toggleDeleteMode}
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Modal.Header closeButton>
          <Modal.Title as="h6">Delete "{tag}" Tag</Modal.Title>
        </Modal.Header>
        <Modal.Body>
              <Row className="mb-3">
                <Col xs={12}>
                  <p>Are you sure you want to delete this tag?</p>
                </Col>
              </Row>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={toggleDeleteMode}>No</Button>
          <Button variant="danger" onClick={handleDelete}>Yes</Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}