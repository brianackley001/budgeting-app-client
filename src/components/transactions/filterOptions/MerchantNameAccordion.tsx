import { Accordion, Form} from 'react-bootstrap';

export default function MerchantNameAccordionItem(props) {
  const { eventKey, onSelect, trackedValue } = props;
  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>Merchant Name</Accordion.Header>
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
