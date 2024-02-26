import { faGear } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";
import { Badge, Button, Card, CardBody, Col, Form, Modal, Row } from "react-bootstrap";

{/* <Badge pill bg="secondary" key={index}>{tag}</Badge> */ }

/**
 * Renders mesaging to user that no transaction data matches the current filter criteria
 * @param props
 */

export default function EditTag({ tag, tagCollection }) {
  const [validated, setValidated] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [isDeleteMode, setIsDeleteMode] = useState(false);
  const [formTagValue, setFormTagValue] = useState(tag);

  const toggleEditMode = () => {
    setIsEditMode(!isEditMode);
  };
  const toggleDeleteMode = () => {
    setIsDeleteMode(!isDeleteMode);
  }; 
  const handleDelete = () => {
    console.log('delete tag');

    // dispatch(deleteTag(tag));
    toggleDeleteMode();
    toggleEditMode();
  };

  const handleFormSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }
    setValidated(true);
    toggleEditMode();
  };
  const handleTextareaChange = (event) => {
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
        <Form noValidate validated={validated} data-testid="accordian-form" onSubmit={handleFormSubmit}>
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
                        onChange={handleTextareaChange}
                        style={{ fontSize: ".90em" }} />
                      <Form.Control.Feedback data-testid="tag-detail-form-tag-name-is-valid" >Looks good!</Form.Control.Feedback>
                      <Form.Control.Feedback type="invalid" data-testid="tag-detail-form-tag-name-is-invalid">
                        Please provide a valid  description.
                      </Form.Control.Feedback>
                    </Form.Group>
                  </Col>
                </Row>
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