import { Accordion, Col, Form, InputGroup, Row } from "react-bootstrap"

export default function AmountAccordianItem(props) {
  const { eventKey, onSelect, trackedFromAmount, trackedToAmount } = props;
  return(
    <>
    <Accordion.Item eventKey={eventKey}>
        <Accordion.Header data-testid="amount-accordian-item-header">Amount</Accordion.Header>
        <Accordion.Body data-testid="amount-accordian-item-body">
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="formFromAmount">
                <Form.Label>From</Form.Label>
                <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  onChange={(event) => { onSelect(event, "fromAmount") }} 
                  type="number" 
                  value={trackedFromAmount}
                  placeholder="From amount"
                  data-testid="amount-accordian-item-from-value" />
                </InputGroup>
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="formToAmount">
                <Form.Label>To</Form.Label>
                <InputGroup>
                <InputGroup.Text>$</InputGroup.Text>
                <Form.Control
                  onChange={(event) => { onSelect(event, "toAmount") }}  
                  type="number" 
                  value={trackedToAmount}
                  placeholder="To amount"
                  data-testid="amount-accordian-item-to-value" />
                </InputGroup>
              </Form.Group>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </>
  ) 
};