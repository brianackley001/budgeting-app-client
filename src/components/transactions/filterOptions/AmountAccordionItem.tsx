import { Accordion, Col, Form, InputGroup, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function AmountAccordionItem(props) {
  const { eventKey, onSelect, trackedFromAmount, trackedToAmount } = props;
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header data-testid="amount-accordion-item-header">{(trackedFromAmount.length > 0 || trackedToAmount.length > 0)  && <FontAwesomeIcon icon={faFilter} flip="horizontal" size='xs'  className="iconStyle text-primary" />}Amount</Accordion.Header>
      <Accordion.Body data-testid="amount-accordion-item-body">
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
                  data-testid="amount-accordion-item-from-value" />
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
                  data-testid="amount-accordion-item-to-value" />
              </InputGroup>
            </Form.Group>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  )
};