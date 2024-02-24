import React, { useState } from "react";
import {Button, Card, Col, Row, Form, CardBody } from "react-bootstrap";

/**
 * Renders mesaging to user that no transaction data matches the current filter criteria
 * @param props
 */

export default function CreateTag() {
  // const { item, setter } = props;
  const [formTranDescription, setFormTranDescription] = "";
  const [validated, setValidated] = useState(false);

  const handleTextareaChange = (event) => {
  };

  const handleSubmit = (event) => {
  }

  return (
    <div>
       <span className="card-text" id="transactionDetailEditFormTransaction" data-testid="transaction-detail=read-only-container">
        <Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="accordian-form">
          <Row className="mb-3 transactionModalSummary">
            <Col xs={12}><b>Create a new tag</b></Col>
          </Row>
          <Row className="mb-3">
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
                  style={{ fontSize: ".90em" }} />
                <Form.Control.Feedback data-testid="transaction-detail-form-transaction-name-is-valid" >Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid" data-testid="transaction-detail-form-transaction-name-is-invalid">
                  Please provide a valid  description.
                </Form.Control.Feedback>
              </Form.Group>
            </Col>
          </Row>
         

          <Button variant="primary" type="submit" data-testid="transaction-detail-form-submit-btn">
            Save
          </Button>
        </Form>
      </span>
    </div>
  );
}