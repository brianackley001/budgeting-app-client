import React, { useState } from "react";
import Button from "react-bootstrap/Button";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import { Accordion } from "react-bootstrap";

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */
function AccountListItem(props) {
  const [accountName, setAccountName] = useState(props.accountName);

  function handleTextareaChange(e) {
    setAccountName(e.target.value);
  }
  function saveAccount() {  
    console.log("Saving account...");
  }

  return (
      <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{accountName} (<i>...{props.accountMask}</i>)&nbsp;-&nbsp;<b>${props.accountBalance}</b></Accordion.Header>
        <Accordion.Body>
          <Form>
            <Row className="mb-3">
              <Form.Group as={Col} controlId="formGridAccountName">
                <Form.Label>Name</Form.Label>
                <Form.Control placeholder="Enter account name" value={accountName} onChange={handleTextareaChange} />
              </Form.Group>

              <Form.Group as={Col} controlId="formGridAccountType">
                <Form.Label>Type</Form.Label>
                <Form.Control
                  placeholder="Type"
                  aria-label="Disabled input example"
                  disabled
                  readOnly
                  value={props.accountType}
                />
              </Form.Group>
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
