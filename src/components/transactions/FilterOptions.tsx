import { useState } from 'react';
import { Accordion, Button, Col, Form, FormGroup, FormControl, Offcanvas, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter} from "@fortawesome/free-solid-svg-icons"

export default function FilterOptions(props){
  const { accounts, placement, tags } = props;

  const depositoryAccounts = accounts.filter((account) => account.type.toLowerCase() === "depository").sort((a, b) => {
    return a.institutionName > b.institutionName ? 1 : b.institutionName < a.institutionName ? -1 : 0;
  });
  const creditAccounts = accounts.filter((account) => account.type.toLowerCase() === "credit").sort((a, b) => {
    return a.institutionName > b.institutionName ? 1 : b.institutionName < a.institutionName ? -1 : 0;
  });
  const investmentAccounts = accounts.filter((account) => account.type.toLowerCase() === "investment").sort((a, b) => {
    return a.institutionName > b.institutionName ? 1 : b.institutionName < a.institutionName ? -1 : 0;
  });
  const loanAccounts = accounts.filter((account) => account.type.toLowerCase() === "loan").sort((a, b) => {
    return a.institutionName > b.institutionName ? 1 : b.institutionName < a.institutionName ? -1 : 0;
  });

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  const handleClose = () => {
    setShow(false);
    // Clear all Values if the form has not been submitted...?
  };
  const handleShow = () => setShow(true);

  const handleFormSubmit = () =>{
    console.log("Save");
  }

  const handleReset = () => {
    console.log("Reset");
  } 

  return (
    <>
      <span className='cardHeaderIconRight'>
        <Button variant="primary" onClick={handleShow} className="me-2">
          <FontAwesomeIcon icon={faFilter} className='iconStyle'/>Filters
        </Button>
      </span>
      <Offcanvas show={show} onHide={handleClose} placement={placement}  backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title as="div"><FontAwesomeIcon icon={faFilter} className='iconStyle' color='#0d6efd'/><span style={{fontSize: "20px", fontWeight: "600", color: "#0d6efd"}}>Transaction Filters</span></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
        <Form noValidate validated={validated} data-testid="filter-options-form" onSubmit={handleFormSubmit}>
          {/* Account Types | Tags/Dates/Notes */}
          <Row>
            <Col xs={6}>
              <h6>Account Types</h6>
            </Col>
            <Col xs={6}>
            <h6>Other Filters</h6>
            </Col>
          </Row>
          <Row>
            <Col xs={6}>
              <Accordion flush>
                {depositoryAccounts.length > 0 && 
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Checking and Savings</Accordion.Header>
                  <Accordion.Body>
                    {
                    depositoryAccounts.map((accountItem) => (
                      <OverlayTrigger key={accountItem.id} placement='right' overlay={
                        <Tooltip id={`tooltip-${accountItem.id}`}>
                          <strong>{accountItem.institutionName}</strong>
                        </Tooltip>
                      }>
                        <Form.Check
                        key={accountItem.id}
                        label={accountItem.name}
                        name="depsitoryAccounts"
                        type="checkbox"
                        id={accountItem.id}
                        title={accountItem.institutionName}
                      />
                      </OverlayTrigger>
                      ))
                    }
                  </Accordion.Body>
                </Accordion.Item>}
                {creditAccounts.length > 0 && 
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Credit</Accordion.Header>
                  <Accordion.Body>
                    {
                      creditAccounts.map((accountItem) => (
                      <OverlayTrigger key={accountItem.id} placement='right' overlay={
                        <Tooltip id={`tooltip-${accountItem.id}`}>
                          <strong>{accountItem.institutionName}</strong>
                        </Tooltip>
                      }>
                        <Form.Check
                        key={accountItem.id}
                        label={accountItem.name}
                        name="creditAccounts"
                        type="checkbox"
                        id={accountItem.id}
                        title={accountItem.institutionName}
                      />
                      </OverlayTrigger>
                      ))
                    }
                  </Accordion.Body>
                </Accordion.Item>}
                {investmentAccounts.length > 0 &&
                <Accordion.Item eventKey="2">
                  <Accordion.Header>Investment</Accordion.Header>
                  <Accordion.Body>
                    {
                      investmentAccounts.map((accountItem) => (
                        <OverlayTrigger key={accountItem.id} placement='right' overlay={
                          <Tooltip id={`tooltip-${accountItem.id}`}>
                            <strong>{accountItem.institutionName}</strong>
                          </Tooltip>
                        }>
                        <Form.Check
                        key={accountItem.id}
                        label={accountItem.name}
                        name="investmentAccounts"
                        type="checkbox"
                        id={accountItem.id}
                        title={accountItem.institutionName}
                      />
                      </OverlayTrigger>
                      ))
                    }
                  </Accordion.Body>
                </Accordion.Item>}
                {loanAccounts.length > 0 &&
                <Accordion.Item eventKey="3">
                  <Accordion.Header>Loan</Accordion.Header>
                  <Accordion.Body>
                    {
                      loanAccounts.map((accountItem) => (
                        <OverlayTrigger key={accountItem.id} placement='right' overlay={
                          <Tooltip id={`tooltip-${accountItem.id}`}>
                            <strong>{accountItem.institutionName}</strong>
                          </Tooltip>
                        }>
                        <Form.Check
                        key={accountItem.id}
                        label={accountItem.name}
                        name="loanAccounts"
                        type="checkbox"
                        id={accountItem.id}
                        title={accountItem.institutionName}
                      />
                      </OverlayTrigger>
                      ))
                    }
                  </Accordion.Body>
                </Accordion.Item>}
              </Accordion>
            </Col>
            <Col xs={6}>
            <Accordion flush>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Date Range</Accordion.Header>
                  <Accordion.Body>
                    <Row>
                      <Col xs={6}>
                        <Form.Group className="mb-3" controlId="formStartDate">
                          <Form.Label>Start</Form.Label>
                          <Form.Control type="date" placeholder="Start Date" />
                        </Form.Group>
                      </Col>
                      <Col xs={6}>
                        <Form.Group className="mb-3" controlId="formEndDate">
                          <Form.Label>End</Form.Label>
                          <Form.Control type="date" placeholder="End Date" />
                        </Form.Group>
                      </Col>
                    </Row>
                  </Accordion.Body>
                </Accordion.Item>
                <Accordion.Item eventKey="1">
                  <Accordion.Header>Tags</Accordion.Header>
                  <Accordion.Body>
                    {
                      tags.map((tag) => (
                        <Form.Check
                        key={tag}
                        label={tag}
                        name={`transaction-tag-${tag}`}
                        type="checkbox"
                        id={tag}
                      />
                      ))
                    }
                  </Accordion.Body>
                </Accordion.Item>
                  <Accordion.Item eventKey="2">
                    <Accordion.Header>Notes</Accordion.Header>
                    <Accordion.Body>
                      <Form.Group className="mb-3" controlId="formUserNotes">
                        <Form.Label>User Notes</Form.Label>
                        <Form.Control as="textarea" rows={3} placeholder="Search for..." />
                      </Form.Group>
                    </Accordion.Body>
                  </Accordion.Item>
                </Accordion>
            </Col>
          </Row>
          <Row>
            <Col xs={7}>
              &nbsp;
            </Col>
            <Col xs={5}>
              <Button variant="secondary" onClick={handleReset} className="me-2">Reset</Button>
              <Button variant="primary" onClick={handleShow} className="me-2">Apply Filters
              </Button>
            </Col>
          </Row>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
      
    </>
  );
}
