import React, { useState } from "react";
import {Button, Card, Col, Row, Form, CardBody } from "react-bootstrap";

/**
 * Renders edit form for Transaction Details
 * @param props
 */

export default function TransactionDetailForm(props){ 
  const { item, setter } = props;
  const [formTranDescription, setFormTranDescription] = useState(item.merchant);
  const [formTranCategory, setFormTranCategory] = useState(item.category);
  const [formTranNotes, setFormTranNotes] = useState(item.notes);
  const [formTranTags, setFormTranTags] = useState(item.labels);
  const [formTranDateValue, setFormTranDateValue] = useState(new Date(item.date).toLocaleDateString('en-CA'));
  const [validated, setValidated] = useState(false);

  function handleTextareaChange(e) {
    switch(e.target.id) {
      case "formGridTransactionDate":
        setFormTranDateValue(e.target.value);
        updateParent();
        break;
      case "formGridCategory":
        setFormTranCategory(e.target.value);
        updateParent();
        break;
      case "formGridNotes":
        setFormTranNotes(e.target.value);
        updateParent();
        break;
      case "formGridLabels":
        setFormTranTags(e.target.value);
        updateParent();
        break;
      default:
          setFormTranDescription(e.target.value);
          updateParent();
    }
  }
  // function handleCheckboxChange(e) {
  // }
  const updateParent = () => {
    setter({
      merchant: formTranDescription,
      category: formTranCategory,
      notes: formTranNotes,
      labels: formTranTags,
      date: formTranDateValue,
    });
  }
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
  return(
    <>
    <span className="card-text" id="transactionDetailEditFormTransaction" data-testid="transaction-detail=read-only-container">
    <Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="accordion-form">
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
                  //defaultValue={item.category} 
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  title={item.category} 
                  value={item.category} 
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
              <Form.Group as={Col} controlId="formGridLabels">
                <Form.Label>Labels</Form.Label>
                <Form.Control as="textarea"  
                  aria-label="With textarea" 
                  name="categoryName" 
                  data-testid="transaction-detail-form-transaction-labels"
                  defaultValue={formTranTags} 
                  style={{fontSize: ".75em"}} />
              </Form.Group>
      </Col>
    </Row>
           
            <Button variant="primary" type="submit" data-testid="transaction-detail-form-submit-btn"> 
              Save
            </Button>
          </Form>
    </span>
    </>
  );
}