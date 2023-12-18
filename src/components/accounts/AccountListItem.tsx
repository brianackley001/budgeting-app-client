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
  const [show, setShow] = useState(false);

//   const onAccordionClick = () => {
//     setShow(!show);
//     console.log("onAccordionClick: " + show);
// }

  function handleTextareaChange(e) {
    setFormAccountName(e.target.value);
  }
  function handleCheckboxChange(e) {
    setFormUseInTransactions(e.target.value);
  }
  function saveAccount() {
    console.log("Saving account...");
  }

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
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAccountName">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter account name" value={formAccountName} onChange={handleTextareaChange} />
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
                <Form.Check
                  type="switch"
                  id="includeInTransactions"
                  label="Include in transactions"
                  defaultChecked={formUseInTrasactions}
                  onChange={handleCheckboxChange} 
                />
              </Col>
            </Row>

            <Button variant="primary" type="button" onClick={saveAccount}>
              Save
            </Button>
          </Form>
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}

export default AccountListItem;
