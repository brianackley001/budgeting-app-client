import { useState } from "react";
import {Form, Row, Col} from 'react-bootstrap';
import {formatCategory, formatSubCategory} from "@utils/transactionUtils";

export const TransactionCategorizationSelect = (props) => {
    const { item, categories } = props;
    const selectedTaxonomyDescription = categories.find((category) => category.detailed === item.category)?.description;
    const [formParentCategory, setFormParentCategory] = useState(item.categoryParent);
    const [formSubCategory, setFormSubCategory] = useState(item.category);
    const [formTaxonomyDescription, setFormTaxonomyDescription] = useState(selectedTaxonomyDescription);
    const [parentCategories, setParentCategories] = useState(item.categories.filter((c, i) => item.categories.findIndex((x) => c.primary === x.primary)===i));
    const [subCategories, setSubCategories] = useState(item.categories.filter((c) => c.primary == item.categoryParent));
    return (
      <>
        <Row className="mb-3">
          <Col xs={6}>
            <Form.Group as={Col} controlId="formParentCategory">
              <Form.Label>Category</Form.Label>
              <Form.Select
                data-testid="transaction-categorization-parent-select"
                onChange={(event) => {
                  props.onSelect(event);
                }}
                aria-label="Select Category"
                name="transactionCategorizationParent"
                defaultValue={formParentCategory}
              >
                <option value="none">Select...</option>
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
              <Form.Label>Sub-Category</Form.Label>
              <Form.Select
                data-testid="transaction-categorization-sub-select"
                onChange={(event) => {
                  props.onSelect(event);
                }}
                defaultValue={formSubCategory}
                aria-label="Select Sub-Category"
                name="transactionCategorizationSub"
              >
                <option value="none">Select...</option>
                {subCategories.map((subCategory) => (
                  <option key={subCategory.detailed} value={subCategory.detailed}>
                    {formatSubCategory(subCategory.primary, subCategory.detailed)}
                  </option>     
                ))}
              </Form.Select>
            </Form.Group>
          </Col>
        </Row>
      </>
    );
}