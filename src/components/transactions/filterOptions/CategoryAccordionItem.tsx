import { Accordion, Form} from 'react-bootstrap';

export default function CategoryAccordionItem (props){
  const { eventKey, onSelect, trackedValue } = props;
  return (
    <>
      <Accordion.Item eventKey={eventKey}>
        <Accordion.Header>Category</Accordion.Header>
        <Accordion.Body>
          <Form.Group className="mb-3" controlId="formCategorySearchTerm">
            {/* <Form.Label>Category Name</Form.Label> */}
            <Form.Control as="textarea" rows={1} placeholder="Search for..." 
            onChange={(event) => { onSelect(event) }}
            value={trackedValue}
            data-testid="category-accordion-item-search-text-value" />
          </Form.Group>
        </Accordion.Body>
      </Accordion.Item>
    </>
  );  
}