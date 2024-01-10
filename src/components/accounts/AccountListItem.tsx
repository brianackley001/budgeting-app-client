import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Accordion } from "react-bootstrap";
import { AccountListItemType } from "../../types/accountListItem.ts";

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */


function AccountListItem(props: AccountListItemType) {
  //const { name, mask, type, balances, includeInTransactions } = props;
  const [formAccountName, setFormAccountName] = useState(props.name);
  const [formUseInTrasactions, setFormUseInTransactions] = useState(props.includeInTransactions);
  const [validated, setValidated] = useState(false);




  function handleTextareaChange(e) {
    setFormAccountName(e.target.value);
  }
  function handleCheckboxChange(e) {
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    setValidated(true);
  };

  return (
    <Accordion data-testid="accordian-container">
      <Accordion.Item eventKey="0">
        <Accordion.Header data-testid="accordian-header">{props.name} (<i>...{props.mask}</i>)&nbsp;-&nbsp;<b>${props.balances.available}</b></Accordion.Header>
        <Accordion.Body data-testid="accordian-body">
          <Row className="mb-3">
            <Col>
              <b>{props.official_name}</b>
            </Col>
          </Row>
          <Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="accordian-form">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAccountName">
                <Form.Label>Name</Form.Label>
                <Form.Control required 
                  placeholder="Enter account name" 
                  type="text" 
                  name="accountName" 
                  data-testid="accordian-form-account-name" 
                  defaultValue={formAccountName} 
                  onChange={handleTextareaChange} />
                <Form.Control.Feedback data-testid="accordian-form-account-name-is-valid" >Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid" data-testid="accordian-form-account-name-is-invalid">
                  Please provide a valid account name.
                </Form.Control.Feedback>
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAccountType">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  placeholder="Type"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  value={props.type}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Col>
              <Form.Group className="mb-3">
                <Form.Check
                  type="switch"
                  id="includeInTransactions"
                  label="Include in transactions"
                  defaultChecked={formUseInTrasactions}
                  onChange={handleCheckboxChange}
                  data-testid="accordian-form-include-in-transactions" 
                />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" data-testid="accordian-form-submit-btn"> 
              Save
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccountListItem;
