import { Accordion, Form } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"

export default function MerchantNameAccordionItem(props) {
  const { eventKey, onSelect, trackedValue } = props;
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>{trackedValue.length >0 && <FontAwesomeIcon icon={faFilter} flip="horizontal" size='xs'  className="iconStyle text-primary" />}Merchant Name</Accordion.Header>
      <Accordion.Body>
        <Form.Group className="mb-3" controlId="formMerchantName">
          <Form.Control as="textarea" rows={1} placeholder="Search for..."
            onChange={(event) => { onSelect(event) }}
            value={trackedValue}
            data-testid="merchant-name-accordion-item-text-search-text-value" />
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  )
};
