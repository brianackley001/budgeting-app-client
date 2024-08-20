import { useEffect, useState } from "react";
import { Card, Col, Row, Alert, Form, Button } from "react-bootstrap";
import { useAppSelector } from "@/hooks/useStoreHooks";
import {formatCategory, formatSubCategory} from "@utils/transactionUtils";
import { logTrace } from "@utils/logger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';

export const BulkEditTransactions = () => {
  logTrace("BulkEditTransactions.tsx");
  const paginationConfig = useAppSelector(state => state.transactionSlice.transactionPagination);
  const transactionTags = useAppSelector(state => state.userSlice.transactionTags);
  const taxonomyItems = useAppSelector(state => state.taxonomySlice.items);
  const [formCategoryValue, setFormCategoryValue] = useState(paginationConfig.categorySearchValue);
  const [formSubCategoryValue, setFormSubCategoryValue] = useState(paginationConfig.subCategorySearchValue);
  const [parentCategories, setParentCategories] = useState(taxonomyItems.filter((c, i) => taxonomyItems.findIndex((x) => c.primary === x.primary) === i));
  const [subCategories, setSubCategories] = useState(paginationConfig.categorySearchValue.length > 0 ? 
    taxonomyItems.filter((c) => c.primary == formCategoryValue) :
    taxonomyItems);

  const handleCategoryChange = (event) => {
    const selectedCategory = event.target.options[event.target.selectedIndex].value;
    setFormSubCategoryValue(selectedCategory);
    const selectedTaxonomyDescription = taxonomyItems.find((category) => category.detailed === selectedCategory)?.description;
  };
  const handleParentCategoryChange = (event) => {
    const selectedCategory = event.target.options[event.target.selectedIndex].value;
    setFormCategoryValue(selectedCategory);
    setSubCategories(taxonomyItems.filter((c) => c.primary == selectedCategory));
  };

  return(
    <div className="dashboardAccountContainer">
      <Card>
        <Card.Body>
          <Card.Title>Transactions to Bulk Edit</Card.Title>
          <Card className="mb-3">
            <Card.Body>
                <Row>
                    <Col xs={12}>
                        <Alert variant="info">
                            You have selected <b>{paginationConfig.total}</b> transactions for bulk update. Your filtering criteria:<br />
                            <ul>
                                {paginationConfig.categorySearchValue.length > 1 && 
                                    <li>Category: {formatCategory(paginationConfig.categorySearchValue)}</li>}
                                {paginationConfig.subCategorySearchValue.length > 1 && 
                                    <li>Sub-Category: {formatSubCategory(paginationConfig.categorySearchValue, paginationConfig.subCategorySearchValue)}</li>}
                                {paginationConfig.merchantNameSearchValue.length > 1 &&
                                    <li>Merchant Name: {paginationConfig.merchantNameSearchValue}</li>}
                                {paginationConfig.userNotesSearchValue.length > 1 &&
                                    <li>User Notes: {paginationConfig.userNotesSearchValue}</li>}
                                {paginationConfig.tagSearchValue.length > 1 &&
                                    <li>Tags: {paginationConfig.tagSearchValue}</li>}
                                {paginationConfig.amountFrom != 0 &&
                                    <li>Amount From: {paginationConfig.amountFrom}</li>}
                                {paginationConfig.amountTo != 0 &&
                                    <li>Amount To: {paginationConfig.amountTo}</li>}
                                {paginationConfig.startDate.length > 1 &&
                                    <li>Start Date: {paginationConfig.startDate}</li>}
                                {paginationConfig.endDate.length > 1 &&
                                    <li>Start Date: {paginationConfig.endDate}</li>}
                            </ul>
                            
                            <Link
                                to="/transactions"
                                data-testid="navlink-bulk-edit-transactions"
                                className="mx-2"
                            >
                                <Button variant="secondary" size="sm">
                                <FontAwesomeIcon
                                    icon={faBackwardStep} 
                                    title="Bulk Update selected Transactions"
                                />&nbsp;Back to Transactions
                                </Button>
                            </Link>
                        </Alert>
                    </Col>
                </Row>
                <Row>
                    <Col xs={12}>
                    {/* <Alert variant="light"><b>Values to bulk update:</b></Alert> */}
                    <p className="lead"><b>Attributes to bulk update:</b></p>
                    </Col>
                </Row>
                <Form noValidate data-testid="bulk-update-transaction-form">
                    <Row>
                        <Col xs={6}>
                        <Form.Group controlId="formParentCategory">
                            <Form.Label>Category</Form.Label>
                                <Form.Select
                                    required
                                    data-testid="transaction-categorization-parent-select"
                                    onChange={handleParentCategoryChange}
                                    aria-label="Select Category"
                                    name="transactionCategorizationParent"
                                    defaultValue={formCategoryValue}
                                >
                                    <option value="">Select...</option>
                                    {parentCategories.map((category) => (
                                    <option key={category.primary.toString()} value={category.primary.toString()}> 
                                        {formatCategory(category.primary.toString())}
                                    </option>
                                    ))}
                                </Form.Select>
                            </Form.Group>
                        </Col>
                        <Col xs={6}>
                            <Form.Group controlId="formSubCategory">
                                <Form.Label>Sub-Category
                                </Form.Label>
                                <Form.Select
                                    required
                                    data-testid="transaction-categorization-sub-select"
                                    onChange={handleCategoryChange}
                                    defaultValue={formSubCategoryValue}
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
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={6}>
                        <Form.Label>Tags</Form.Label>
                        {transactionTags.map(tag => (
                            <Form.Check
                                key={tag}
                                type="checkbox"
                                id={tag}
                                name="tag"
                                label={tag}
                                data-testid="transaction-detail-form-transaction-tags"
                                checked={paginationConfig.tagSearchValue.includes(tag)}
                            />
                            
                        ))}
                        </Col>
                        <Col xs={6}>
                            <Form.Group as={Col} controlId="formGridNotes">
                            <Form.Label>Notes</Form.Label>
                            <Form.Control
                                as="textarea"
                                aria-label="With textarea"
                                name="categoryName"
                                data-testid="transaction-detail-form-transaction-notes"
                                // value={formTranNotes}
                                // onChange={handleTextAreaChange}
                                style={{ fontSize: ".75em" }}
                            />
                            </Form.Group>
                        </Col>
                    </Row>
                    <Row>
                        <Col xs={4}>&nbsp;</Col>
                        <Col xs={2}>
                        <Button variant="outline-secondary" type="submit" data-testid="transaction-detail-form-submit">Cancel</Button>
                        </Col>
                        <Col xs={2}>
                        <Button variant="primary" type="submit" data-testid="transaction-detail-form-submit">Save</Button>
                        </Col>
                        <Col xs={4}>&nbsp;</Col>
                    </Row>
                </Form>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </div>
  )
};
