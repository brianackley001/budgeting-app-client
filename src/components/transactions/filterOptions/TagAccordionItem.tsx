import { Accordion, Form } from 'react-bootstrap';

export default function TagAccordianItem(props) {
  const { eventKey, onSelect, tags, trackedTags } = props;
  return (
    <>
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header data-testid="tag-accordion-item-header">Tags</Accordion.Header>
        <Accordion.Body data-testid="tag-accordion-item-body">
          {
            tags.map((tag, index) => (
              <Form.Check
                key={index}
                label={tag}
                name={tag}
                type="checkbox"
                id={index}
                value={tag}
                data-testid={`tag-accordion-item-checkbox-${tag}-${index}`}
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
