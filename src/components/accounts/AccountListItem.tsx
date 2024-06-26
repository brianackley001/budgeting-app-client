import React, { useState } from "react";
import {Button, Col, Row, Accordion, Form } from "react-bootstrap";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { upsertAccount } from "@store/accountSlice.ts";

/**
 * Account List Item
 * @param props
 */

function AccountListItem({item}) {
  const dispatch = useAppDispatch();
  const userId = useAppSelector(state => state.userSlice.userId);

  const [activeAccordionKeys, setActiveAccordionKeys] = useState<string[]>([]);
  const [formAccountName, setFormAccountName] = useState((item.customName && item.customName.length > 0) ? item.customName : item.name);
  const [formUseInTransactions, setFormUseInTransactions] = useState(item.includeAccountTransactions);
  const [validated, setValidated] = useState(false);
  const typeDisplayValue = `${item.type} (${item.subtype})`;
  const accountDisplayValue = item.customName && item.customName.length > 0 ? item.customName : item.name;



  function handleTextareaChange(e) {
    setFormAccountName(e.target.value);
  }

  function handleCheckboxChange(e) {
    setFormUseInTransactions(e.target.checked);
  }

  const handleSelect = (eventKey: any) => setActiveAccordionKeys(eventKey as string[]);

  const handleCollapseClick = () => {
    setActiveAccordionKeys([]);
  }

  const handleSubmit = (event) => {
    const form = event.currentTarget;
    if (form.checkValidity() === true) {
      event.preventDefault();
      event.stopPropagation();
      console.log('form submitted');
      // Save User Object to DB (accounts are child nodes of User in the DB):
      let account = {
        ...item,
        customName: formAccountName,
        includeAccountTransactions: formUseInTransactions
      }
      dispatch(upsertAccount(userId, account));

      event.preventDefault();
      handleCollapseClick();
      setValidated(false);
    } else {
      event.preventDefault();
      event.stopPropagation();
      setValidated(true);
    }
  };

  return (
    <Accordion data-testid="accordion-container"  activeKey={activeAccordionKeys} onSelect={handleSelect}>
      <Accordion.Item eventKey="0" >
        <Accordion.Header data-testid="accordion-header">{accountDisplayValue} (<i>...{item.mask}</i>)</Accordion.Header>
        <Accordion.Body data-testid="accordion-body">
          <Form noValidate validated={validated} onSubmit={handleSubmit} data-testid="accordion-form">
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridSystemName">
                <Form.Label>Original Imported Name (system)</Form.Label>
                <Form.Control 
                  type="text" 
                  name="accountName" 
                  data-testid="accordion-form-account-name" 
                  defaultValue={item.name} 
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
                  data-testid="accordion-form-account-name" 
                  defaultValue={formAccountName} 
                  onChange={handleTextareaChange}
                  style={{fontSize: ".90em"}} />
                <Form.Control.Feedback data-testid="accordion-form-account-name-is-valid" >Looks good!</Form.Control.Feedback>
                <Form.Control.Feedback type="invalid" data-testid="accordion-form-account-name-is-invalid">
                  Please provide a valid (custom) account name.
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
                  defaultChecked={formUseInTransactions}
                  onChange={handleCheckboxChange}
                  data-testid="accordion-form-include-in-transactions" 
                />
                </Form.Group>
              </Col>
            </Row>

            <Button variant="primary" type="submit" data-testid="accordion-form-submit-btn"> 
              Save
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccountListItem;
