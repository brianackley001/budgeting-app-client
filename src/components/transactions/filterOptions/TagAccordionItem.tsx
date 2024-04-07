import { Accordion, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";

export default function TagAccordionItem(props) {
  const { eventKey, onSelect, tags, trackedTags } = props;
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header data-testid="tag-accordion-item-header">{trackedTags.length > 0 && <FontAwesomeIcon icon={faFilter} flip="horizontal" size='xs'  className="iconStyle text-primary" />}Tags</Accordion.Header>
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
  )
};
