import { useState } from 'react';
import { Button, Card, Dropdown, Form, Modal } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faGear, faPencil } from '@fortawesome/free-solid-svg-icons'
import { RefreshCredentialsButton } from "@components/buttons/RefreshCredentialsButton";
import { DeleteInstitutionButton } from '@components/buttons/DeleteInstitutionButton';

/**
 * Renders Institution Header item with display and edit capabilities
 * @param props
 */

export default function InstitutionHeaderItem({institution}) {
  const [showEdit, setShowEdit] = useState(false);
  const [showDelete, setShowDelete] = useState(false);
  const [formInstitutionName, setFormInstitutionName] = useState(institution.accounts[0].institutionName);
  const hasCredentialError = institution.itemError && institution.itemError.errorCode === "ITEM_LOGIN_REQUIRED" && !institution.itemError.isResolved;

  const handleDeleteClose = () => setShowDelete(false);
  const handleDeleteShow = () => setShowDelete(true);
  const handleEditClose = () => setShowEdit(false);
  const handleEditShow = () => {
    setShowEdit(true)
  };

  function handleTextareaChange(e) {
    setFormInstitutionName(e.target.value);
  }

  return (
    <>
      <Card.Subtitle className="headerBottomMargin">{institution.accounts[0].institutionName}
        {hasCredentialError && <span className='cardHeaderIconRight' aria-label="Refresh Credentials" title="Refresh Credentials">
          <RefreshCredentialsButton itemId={institution.itemId} isError={true}></RefreshCredentialsButton>
        </span>}
        {!hasCredentialError &&
          <span className='cardHeaderIconRight' aria-label="Edit Institution" title="Edit Institution">
            <Dropdown>
              <Dropdown.Toggle variant="outline-light" id="dropdown-basic" data-testid="institution-dropdown-toggle">
                <FontAwesomeIcon icon={faGear} color="gray" />
              </Dropdown.Toggle>

              <Dropdown.Menu>
                <Dropdown.Item onClick={handleEditShow} as="button" data-testid="edit-institution-dropdown-item-button">
                  <FontAwesomeIcon icon={faPencil} size='lg' className="iconStyle" style={{ color: "gray" }} />Edit
                </Dropdown.Item>
                <RefreshCredentialsButton itemId={institution.itemId} isError={false}></RefreshCredentialsButton>
                <Dropdown.Item onClick={handleDeleteShow} as="button" data-testid="delete-institution-dropdown-item-button">
                  <FontAwesomeIcon icon={faTrashCan} size='lg' className="iconStyle" style={{ color: "gray" }} />Delete
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
          </span>
        }
      </Card.Subtitle>

      <Modal show={showEdit} onHide={handleEditClose} data-testid="edit-institution-modal-container">
        <Modal.Header closeButton>
          <Modal.Title as="h6">Edit {institution.accounts[0].institutionName}</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group className="mb-3" controlId="formGridAccountType">
                <Form.Label>Original Imported Name (system)</Form.Label>
                <Form.Control
                  placeholder="Type"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  value={institution.accounts[0].institutionName}
                  style={{fontSize: ".75em"}}
                />
              </Form.Group>
            <Form.Group className="mb-3" controlId="exampleForm.ControlInput1">
              <Form.Label>Custom Nickname</Form.Label>
              <Form.Control
                placeholder="Your nickname..."
                defaultValue={formInstitutionName} 
                onChange={handleTextareaChange}
                style={{fontSize: ".75em"}}
                autoFocus
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleEditClose} data-testid="institution-edit-modal-close-button">
            Close
          </Button>
          <Button variant="primary" onClick={handleEditClose} data-testid="institution-edit-modal-save-button">
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>

      

      <Modal show={showDelete} onHide={handleDeleteClose}  data-testid="delete-institution-modal-container">
        <Modal.Header closeButton>
          <Modal.Title as="h6">Remove all {institution.accounts[0].institutionName} accounts</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Are you sure you want to remove all <b>{institution.accounts[0].institutionName}</b> accounts?
          <br/><br/>
          <i>(You can link to {institution.accounts[0].institutionName} again in the future with the "Add Account" button) </i>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleDeleteClose} data-testid="institution-delete-modal-close-button">
            Close
          </Button>
          <DeleteInstitutionButton itemId={institution.itemId} handleClose={handleDeleteClose} institutionName={institution.accounts[0].institutionName} />
        </Modal.Footer>
      </Modal>
    </>
  );
}