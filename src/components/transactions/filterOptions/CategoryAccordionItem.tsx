import { useState } from "react";
import { Accordion, Form } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faFilter } from "@fortawesome/free-solid-svg-icons";
import { formatCategory, formatSubCategory } from "@utils/transactionUtils";

export default function CategoryAccordionItem(props) {
  const {eventKey, onSelectCategory, onSelectSubCategory, taxonomyItems, trackedCategoryValue, trackedSubCategoryValue} = props;
  const [parentCategories, setParentCategories] = useState(taxonomyItems.filter((c, i) => taxonomyItems.findIndex((x) => c.primary === x.primary) === i));
  const [subCategories, setSubCategories] = useState(trackedCategoryValue.length > 0 ? 
    taxonomyItems.filter((c) => c.primary == trackedCategoryValue) :
    taxonomyItems);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.options[event.target.selectedIndex].value;
    onSelectSubCategory(selectedCategory);
    // if(trackedCategoryValue === ""){
    //   var newParentCategory = taxonomyItems.find((c) => c.detailed === selectedCategory);
    //   onSelectCategory(newParentCategory?.primary);
    // }
  };
  const handleParentCategoryChange = (event) => {
    const selectedCategory = event.target.options[event.target.selectedIndex].value;
    onSelectCategory(selectedCategory);
    setSubCategories(taxonomyItems.filter((c) => c.primary == selectedCategory));
  };

  return (
    <Accordion.Item eventKey={eventKey}>
      <Accordion.Header>
        {(trackedCategoryValue.length > 0 || trackedSubCategoryValue.length > 0) && (
          <FontAwesomeIcon icon={faFilter} flip="horizontal"  size="xs" className="iconStyle text-primary" />
        )}
        Category
      </Accordion.Header>
      <Accordion.Body>
        <Form.Group controlId="formParentCategory">
          <Form.Label>Category</Form.Label>
          <Form.Select
            required
            data-testid="transaction-categorization-parent-select"
            onChange={handleParentCategoryChange}
            aria-label="Select Category"
            name="transactionCategorizationParent"
            defaultValue={trackedCategoryValue}
          >
            <option value="">Select...</option>
            {parentCategories.map((category) => (
              <option key={category.primary.toString()} value={category.primary.toString()}> 
                {formatCategory(category.primary.toString())}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group controlId="formSubCategory">
          <Form.Label>Sub-Category</Form.Label>
          <Form.Select
            required
            data-testid="transaction-categorization-sub-select"
            onChange={handleCategoryChange}
            defaultValue={trackedSubCategoryValue}
            aria-label="Select Sub-Category"
            name="transactionCategorizationSub"
          >
            <option value="">Select...</option>
            {subCategories.map((subCategory) => (
              <option key={subCategory.detailed} value={subCategory.detailed}>
                {formatSubCategory(subCategory.primary, subCategory.detailed)}
              </option>
            ))}
          </Form.Select>
        </Form.Group>
      </Accordion.Body>
    </Accordion.Item>
  );
};
