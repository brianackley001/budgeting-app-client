import { Accordion, Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"

export default function DateRangeAccordionItem(props) {
  const { eventKey, onSelect, trackedStartDate, trackedEndDate } = props;
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{(trackedStartDate.length > 0 ||trackedEndDate.length > 0)  && <FontAwesomeIcon icon={faFilter} flip="horizontal" size='xs'  className="iconStyle text-primary" />}Date Range</Accordion.Header>
      <Accordion.Body>
        <Row>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="formStartDate">
              <Form.Label>Start</Form.Label>
              <Form.Control
                onChange={(event) => { onSelect(event, "startDate") }}
                type="date"
                value={trackedStartDate}
                placeholder="Start Date"
                data-testid="date-range-accordion-item-start-date" />
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group className="mb-3" controlId="formEndDate">
              <Form.Label>End</Form.Label>
              <Form.Control
                onChange={(event) => { onSelect(event, "endDate") }}
                type="date"
                value={trackedEndDate}
                placeholder="End Date"
                data-testid="date-range-accordion-item-end-date" />
            </Form.Group>
          </Col>
        </Row>
      </Accordion.Body>
    </Accordion.Item>
  )
};
