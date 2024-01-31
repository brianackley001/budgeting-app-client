import { Accordion, Form} from 'react-bootstrap';

export default function NotesAccordianItem(props) {
  const { eventKey, onSelect, trackedValue } = props;
  return (
    <>
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>Notes</Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3" controlId="formUserNotes">
            {/* <Form.Label>Notes</Form.Label> */}
            <Form.Control as="textarea" rows={1} placeholder="Search for..." 
            onChange={(event) => { onSelect(event) }}
            value={trackedValue}
            data-testid="notes-accordian-item-text-search-text-value" />
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </>
  )
};
