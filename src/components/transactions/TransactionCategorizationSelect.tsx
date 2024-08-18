import { useState } from "react";
import {Form, Row, Col, OverlayTrigger, Tooltip  } from 'react-bootstrap';
import {formatCategory, formatSubCategory} from "@utils/transactionUtils";
import { faCircleQuestion } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

export const TransactionCategorizationSelect = (props) => {
    const { item, categories, onParentCategorySelect, onSubcategorySelect } = props;
    const selectedTaxonomyDescription = categories.find((category) => category.detailed === item.category)?.description;
    const [formParentCategory, setFormParentCategory] = useState(item.categoryParent);
    const [formSubCategory, setFormSubCategory] = useState(item.category);
    const [formTaxonomyDescription, setFormTaxonomyDescription] = useState(selectedTaxonomyDescription);
    const [parentCategories, setParentCategories] = useState(item.categories.filter((c, i) => item.categories.findIndex((x) => c.primary === x.primary)===i));
    const [subCategories, setSubCategories] = useState(item.categories.filter((c) => c.primary == item.categoryParent));
    const [subSelectStyle, setSubSelectStyle] = useState("");

    
  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.options[event.target.selectedIndex].value;
    const selectedTaxonomyDescription = categories.find((category) => category.detailed === selectedCategory)?.description;
    setFormTaxonomyDescription(selectedTaxonomyDescription);
    setFormSubCategory(selectedCategory);
    onSubcategorySelect(selectedCategory);
    if(selectedCategory !== ""){
      setSubSelectStyle("");
    }
  }
  const handleParentCategoryChange = (event) => {
    const selectedCategory = event.target.options[event.target.selectedIndex].value;
    if(formParentCategory !== selectedCategory){
      setFormParentCategory(selectedCategory);
      setSubCategories(item.categories.filter((c) => c.primary == selectedCategory));
      setFormSubCategory("");
      setSubSelectStyle("required-dropdown-select");
      onParentCategorySelect(selectedCategory);
    }
    setFormSubCategory("")
    console.log(`handleParentCategoryChange.selectedCategory: ${selectedCategory}`);
  }
    return (
      <>
        <Row className="mb-3">
          <Col xs={6}>
            <Form.Group as={Col} controlId="formParentCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                required
                data-testid="transaction-categorization-parent-select"
                onChange={handleParentCategoryChange}
                aria-label="Select Category"
                name="transactionCategorizationParent"
                defaultValue={formParentCategory}
              >
                <option value="">Select...</option>
                {
                  parentCategories.map((category) => (
                    <option key={category.primary.toString()} value={category.primary.toString()}>
                    {formatCategory(category.primary.toString())}
                  </option>  
                  ))
                }
              </Form.Select>
            </Form.Group>
          </Col>
          <Col xs={6}>
            <Form.Group as={Col} controlId="formSubCategory">
              <Form.Label>Sub-Category
                <OverlayTrigger key={"top"} placement="top" overlay={<Tooltip id="tooltip-top">{formTaxonomyDescription}</Tooltip>}>
                  <span><FontAwesomeIcon icon={faCircleQuestion} color="gray" className="iconStyle mx-2"/></span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Select
                required
                data-testid="transaction-categorization-sub-select"
                onChange={handleCategoryChange}
                defaultValue={formSubCategory}
                aria-label="Select Sub-Category"
                name="transactionCategorizationSub"
                className={subSelectStyle}
              >
                <option value="">Select...</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.detailed} value={subCategory.detailed}>
                    {formatSubCategory(subCategory.primary, subCategory.detailed)}
                  </option>     
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
          {/* <Col xs={1}>
            <span><FontAwesomeIcon icon={faCircleQuestion} className="iconStyle mx-auto mt-5" color="btn-info" /></span>
          </Col> */}
        </Row>
      </>
    );
}