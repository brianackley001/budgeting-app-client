import React , { useState, useRef } from 'react';
import{ Card, Row, Col, CardTitle, CardSubtitle, CardBody } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faGear, faPencil } from '@fortawesome/free-solid-svg-icons'
import TransactionDetailReadOnly from "./TransactionDetailReadOnly"
import TransactionDetailForm from "./TransactionDetailForm"

/**
 * Renders information about the transaction list item
 * @param props
 */
export const TransactionListItem = (item) =>{
  const [showDetail, setShowDetail] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  // Form Models
  const [formTranDescription, setFormTranDescription] = useState(item.merchant);
  const [formTranCategory, setFormTranCategory] = useState(item.category);
  const [formTranNotes, setFormTranNotes] = useState(item.notes);
  const [formTranTags, setFormTranTags] = useState(item.labels);
  const [formTranDateValue, setFormTranDateValue] = useState(new Date(item.date).toLocaleDateString('en-CA'));
  const [validated, setValidated] = useState(false);


  const handleModalClose = () => {
    setIsEditMode(false);
    setShowDetail(false);
  };

  const handleShowDetail = () => setShowDetail(true);

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
    console.log('form submitted');
    event.preventDefault();
  };
  
  
  function handleTextareaChange(e) {
    switch(e.target.id) {
      case "formGridTransactionDate":
        setFormTranDateValue(e.target.value);
        break;
      case "formGridCategory":
        setFormTranCategory(e.target.value);
        break;
      case "formGridNotes":
        setFormTranNotes(e.target.value);
        break;
      case "formGridTags":
        setFormTranTags(e.target.value);
        break;
      default:
        setFormTranDescription(e.target.value);
    }
  }

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  }
  return (
    <>
    <tr onClick={handleShowDetail}>
      <td className="transactionGridLineItem">{item.date}</td>
      <td className="transactionGridLineItem">{item.merchant}</td>
      <td className="transactionGridLineItem">{item.amount}</td>
      <td className="transactionGridLineItem">{item.category}</td>
    </tr>

    <Modal show={showDetail} 
      onHide={handleModalClose}
      item={item}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Modal.Header closeButton>
          <Modal.Title as="h6">Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <CardTitle as="h6" className='navbarStyle'> {isEditMode ? "Edit Transaction": `Account: ${item.bankAccountName}`} 
            <span className='cardHeaderIconRight' aria-label="Edit Transaction" title="Edit Institution">
              {!isEditMode ?   <Button variant="outline-dark" size="sm" className='addAccountButton' onClick={() => handleToggleEditMode()}>
              <FontAwesomeIcon icon={faPencil} className='iconStyle' /><span onClick={() => handleToggleEditMode()}>Edit</span>
            </Button> : null }
            </span>
            </CardTitle>
            <CardBody>
              {!isEditMode ?
                <TransactionDetailReadOnly item={item} />: null}
              {isEditMode ?
              <span className="card-text" id="transactionDetailEditFormTransaction" data-testid="transaction-detail=read-only-container">
              <Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="accordian-form">
              <Row className="mb-3 transactionModalSummary">
                <Col xs={12}>Appears on your <b>{item.bankAccountName}</b> statement as "<b>{item.merchant}</b>" on <b>{item.date}</b></Col>
              </Row>
              <Row className="mb-3">
                <Col xs={2}>
                  <Form.Group className="mb-3" controlId="formGridTransactionDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      placeholder="System Name"
                      style={{fontSize: ".75em"}}
                      value={formTranDateValue} name="transactionDate" type="date" onChange={handleTextareaChange}
                    />
                  </Form.Group>
                </Col>
                <Col xs={5}>
                  <Form.Group as={Col} controlId="formGridTransactionDescription">
                    <Form.Label>Description</Form.Label>
                    <Form.Control required 
                      placeholder="Description" 
                      type="text" 
                      name="transactionDescription" 
                      data-testid="transaction-detail-form-transaction-name" 
                      defaultValue={formTranDescription} 
                      title={formTranDescription} 
                      onChange={handleTextareaChange}
                      style={{fontSize: ".90em"}} />
                    <Form.Control.Feedback data-testid="transaction-detail-form-transaction-name-is-valid" >Looks good!</Form.Control.Feedback>
                    <Form.Control.Feedback type="invalid" data-testid="transaction-detail-form-transaction-name-is-invalid">
                      Please provide a valid  description.
                    </Form.Control.Feedback>
                  </Form.Group>
                </Col>
                <Col xs={3}>
                        <Form.Group as={Col} controlId="formGridCategory">
                          <Form.Label>Category</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="categoryName" 
                            data-testid="transaction-detail-form-transaction-category" 
                            defaultValue={item.category} 
                            aria-label="Disabled input example"
                            disabled
                            readOnly
                            title={item.category} 
                            style={{fontSize: ".75em"}} />
                        </Form.Group>
                </Col>
                <Col xs={2}>
                        <Form.Group as={Col} controlId="formGridAmount">
                          <Form.Label>Amount</Form.Label>
                          <Form.Control 
                            type="text" 
                            name="categoryName" 
                            data-testid="transaction-detail-form-transaction-amount" 
                            defaultValue={item.amount} 
                            aria-label="Disabled input example"
                            disabled
                            readOnly
                            className="text-lowercase"
                            style={{fontSize: ".75em"}} />
                        </Form.Group>
                </Col>
              </Row>
              <Row className="mb-3">
                <Col xs={6}>
                        <Form.Group as={Col} controlId="formGridNotes">
                          <Form.Label>Notes</Form.Label>
                          <Form.Control as="textarea" 
                            aria-label="With textarea" 
                            name="categoryName" 
                            data-testid="transaction-detail-form-transaction-notes"
                            defaultValue={formTranNotes} 
                            style={{fontSize: ".75em"}} />
                        </Form.Group>
                </Col>
                <Col xs={6}>
                        <Form.Group as={Col} controlId="formGridTags">
                          <Form.Label>Labels</Form.Label>
                          <Form.Control as="textarea"  
                            aria-label="With textarea" 
                            name="tagName" 
                            data-testid="transaction-detail-form-transaction-tags"
                            defaultValue={formTranTags} 
                            style={{fontSize: ".75em"}} />
                        </Form.Group>
                </Col>
              </Row>
                    </Form>
              </span> : null}
          </CardBody>
          </Card>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {!isEditMode ? null : 
          <Button variant="primary" type="submit" data-testid="transaction-detail-form-submit-btn" onClick={handleModalClose}>
            Save Changes
          </Button>}
        </Modal.Footer>
      </Modal>
    </> 
  );
};
