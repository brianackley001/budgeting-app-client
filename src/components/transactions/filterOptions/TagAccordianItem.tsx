import { Accordion, Form } from 'react-bootstrap';

export default function TagAccordianItem(props) {
  const { eventKey, onSelect, tags, trackedTags } = props;
  return (
    <>
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>Tags</Accordion.Header>
        <Accordion.Body>
          {
            tags.map((tag, index) => (
              <Form.Check
                key={index}
                label={tag}
                name={tag}
                type="checkbox"
                id={index}
                value={tag}
                checked={trackedTags.includes(tag)}
                onChange={(event) => { onSelect(event) }}
              />
            ))
          }
        </Accordion.Body>
      </Accordion.Item>
    </>
  )
};
