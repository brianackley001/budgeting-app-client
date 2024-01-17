import React, { useState } from "react";
import {Button, Col, Row, Accordion, Form } from "react-bootstrap";
import { AccountListItemType } from "../../types/accountListItem.ts";

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */


function AccountListItem({item}) {
  //const { name, mask, type, balances, includeInTransactions } = props;
  const [activeAccordianKeys, setActiveAccordianKeys] = useState<string[]>([]);
  const [formAccountName, setFormAccountName] = useState(item.name);
  const [formUseInTrasactions, setFormUseInTransactions] = useState(item.includeInTransactions);
  const [validated, setValidated] = useState(false);
  const typeDisplayValue = `${item.type} (${item.subtype})`



  function handleTextareaChange(e) {
    setFormAccountName(e.target.value);
  }
  function handleCheckboxChange(e) {
  }

  const handleSelect = (eventKey: any) => setActiveAccordianKeys(eventKey as string[]);

  const handleCollapseClick = () => {
    setActiveAccordianKeys([]);
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
    handleCollapseClick();
  };

  return (
    <Accordion data-testid="accordian-container"  activeKey={activeAccordianKeys} onSelect={handleSelect}>
      <Accordion.Item eventKey="0" >
        <Accordion.Header data-testid="accordian-header">{item.name} (<i>...{item.mask}</i>)</Accordion.Header>
        <Accordion.Body data-testid="accordian-body">
          <Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="accordian-form">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridSystemName">
                <Form.Label>System Account Name</Form.Label>
                <Form.Control 
                  type="text" 
                  name="accountName" 
                  data-testid="accordian-form-account-name" 
                  defaultValue={formAccountName} 
                  onChange={handleTextareaChange}
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  style={{fontSize: ".75em"}} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAccountType">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  placeholder="Type"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  style={{fontSize: ".75em"}}
                  value={typeDisplayValue}
                />
              </Form.Group>
            </Row>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAccountName">
                <Form.Label>Custom Account Nickname</Form.Label>
                <Form.Control required 
                  placeholder="Enter account name" 
                  type="text" 
                  name="accountName" 
                  data-testid="accordian-form-account-name" 
                  defaultValue={formAccountName} 
                  onChange={handleTextareaChange}
                  style={{fontSize: ".90em"}} />
                <Form.Control.Feedback data-testid="accordian-form-account-name-is-valid" >Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid" data-testid="accordian-form-account-name-is-invalid">
                  Please provide a valid account name.
                </Form.Control.Feedback>
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
