
import { Accordion, Col, Form, Row } from 'react-bootstrap';
export default function DateRangeAccordianItem(props) {
  const { eventKey, onSelect, trackedStartDate, trackedEndDate } = props;
  return (
    <>
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>Date Range</Accordion.Header>
        <Accordion.Body>
          <Row>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="formStartDate">
                <Form.Label>Start</Form.Label>
                <Form.Control
                  onChange={(event) => { onSelect(event, "startDate") }} 
                  type="date" 
                  value={trackedStartDate}
                  placeholder="Start Date" />
              </Form.Group>
            </Col>
            <Col xs={6}>
              <Form.Group className="mb-3" controlId="formEndDate">
                <Form.Label>End</Form.Label>
                <Form.Control
                  onChange={(event) => { onSelect(event, "endDate") }}  
                  type="date" 
                  value={trackedEndDate}
                  placeholder="End Date" />
              </Form.Group>
            </Col>
          </Row>
        </Accordion.Body>
      </Accordion.Item>
    </>
  )
};