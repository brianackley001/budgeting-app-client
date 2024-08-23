import { useEffect, useState } from "react";
import { Card, Col, Row, Alert, Form, Button, Spinner, Table } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "@/hooks/useStoreHooks";
import {formatCategory, formatSubCategory} from "@utils/transactionUtils";
import { logTrace } from "@utils/logger";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackwardStep } from "@fortawesome/free-solid-svg-icons";
import { Link } from 'react-router-dom';
import { bulkUpdateTransactions } from "@/store/transactionSlice";
import { setAlertState } from "@/store/alertSlice";

export const BulkEditTransactions = () => {
    logTrace("BulkEditTransactions.tsx");
    const dispatch = useAppDispatch();
    const queryParams = new URLSearchParams(window.location.search)
    const qsCategory = queryParams?.get("category")
    const qsSubCategory = queryParams?.get("subcategory")
    const paginationConfig = useAppSelector(state => state.transactionSlice.transactionPagination);
    const transactionTags = useAppSelector(state => state.userSlice.transactionTags);
    const taxonomyItems = useAppSelector(state => state.taxonomySlice.items);
    const [formCategoryValue, setFormCategoryValue] = useState(paginationConfig.categorySearchValue || qsCategory || ""); 
    const [formSubCategoryValue, setFormSubCategoryValue] = useState(paginationConfig.subCategorySearchValue || qsSubCategory || "");
    const [formBulkNotesValue, setFormBulkNotesValue] = useState("");
    const [formSubmitted, setFormSubmitted] = useState(false);
    const [formSubmittedSuccess, setFormSubmittedSuccess] = useState(false);
    const [parentCategories, setParentCategories] = useState(taxonomyItems.filter((c, i) => taxonomyItems.findIndex((x) => c.primary === x.primary) === i));
    const [subCategories, setSubCategories] = useState(paginationConfig.categorySearchValue.length > 0 ? 
        taxonomyItems.filter((c) => c.primary == formCategoryValue) :
        qsCategory && qsCategory.length > 0 ? 
        taxonomyItems.filter((c) => c.primary == qsCategory) :
        taxonomyItems);
    const [trackedTags, setTrackedTags] = useState<string[]>([]);
    const[updatedItems, setUpdatedItems] = useState([] as any[]);

    const handleFormSubmit = async (event) => {
      const form = event.currentTarget;
      event.preventDefault();
      event.stopPropagation();
      setFormSubmitted(true);
      setFormSubmittedSuccess(false);
      const formValues = {
        category: formCategoryValue,
        subCategory: formSubCategoryValue,
        userNotes: formBulkNotesValue,
        tags: trackedTags,
      };
      try {
        const response = await dispatch(
          bulkUpdateTransactions(paginationConfig, formValues)
        );
        if (response.success) {
          setUpdatedItems(response.updatedTransactions.slice(0,5));
          setFormSubmittedSuccess(true);
          handleSaveMessageSuccess(response.message);
        } else {
          handleSaveMessageError(response.message);
        }
      } catch (error) {
        console.log(error);
        handleSaveMessageError(`${error}`);
      } finally {
        setFormSubmitted(false);
      }
    };

    const handleCategoryChange = (event) => {
      const selectedCategory =
        event.target.options[event.target.selectedIndex].value;
      setFormSubCategoryValue(selectedCategory);
      const selectedTaxonomyDescription = taxonomyItems.find(
        (category) => category.detailed === selectedCategory
      )?.description;
    };
    const handleParentCategoryChange = (event) => {
      const selectedCategory =
        event.target.options[event.target.selectedIndex].value;
      setFormCategoryValue(selectedCategory);
      setSubCategories(
        taxonomyItems.filter((c) => c.primary == selectedCategory)
      );
    };
    const handleTextAreaChange = (event) => {
      setFormBulkNotesValue(event.target.value);
    };
    const handleTagCheckboxChange = (event) => {
      const checkedNameValue = event.target.id;
      if (event.target.checked) {
        setTrackedTags([...trackedTags, checkedNameValue]);
      } else {
        setTrackedTags(trackedTags.filter((id) => id !== checkedNameValue));
      }
    };
    const handleSaveMessageError = (messageLabel) => {
      dispatch(
        setAlertState({
          headerText: "Bulk Update Error",
          icon: {
            iconType: "error",
            isVisible: true,
            iconSize: "",
            iconColor: "white",
          },
          inProgress: false,
          messageText: `Unable to bulk update selected transactions (${messageLabel}). Please try again later`,
          showAlert: true,
          variantStyle: "danger",
        })
      );
    };

    const handleSaveMessageSuccess = (messageLabel) => {
      dispatch(
        setAlertState({
          headerText: "Transaction Updated",
          icon: {
            iconType: "success",
            isVisible: true,
            iconSize: "",
            iconColor: "white",
          },
          inProgress: false,
          messageText: messageLabel,
          showAlert: true,
          variantStyle: "success",
        })
      );
    };


  return (
    <div className="dashboardAccountContainer">
      <Card>
        <Card.Body>
          <Card.Title>Transactions to Bulk Edit</Card.Title>
          <Card className="mb-3">
            <Card.Body>
              <Row>
                <Col xs={12}>
                  <Alert
                    variant={formSubmittedSuccess ? "success" : "info"}
                    data-testid="bulk-edit-alert"
                  >
                    {formSubmittedSuccess && (
                      <span>
                        <p>
                          You have successfully updated{" "}
                          <b>{paginationConfig.total}</b> transactions via bulk
                          update.
                        </p>
                        <p>(see form below for updated values).</p>
                      </span>
                    )}
                    {!formSubmittedSuccess && (
                      <span>
                        You have selected <b>{paginationConfig.total}</b>{" "}
                        transactions for bulk update.
                      </span>
                    )}
                    Your filtering criteria:
                    <br />
                    <ul>
                      {paginationConfig.categorySearchValue.length > 1 && (
                        <li>
                          Category:{" "}
                          {formatCategory(paginationConfig.categorySearchValue)}
                        </li>
                      )}
                      {paginationConfig.subCategorySearchValue.length > 1 && (
                        <li>
                          Sub-Category:{" "}
                          {formatSubCategory(
                            paginationConfig.categorySearchValue,
                            paginationConfig.subCategorySearchValue
                          )}
                        </li>
                      )}
                      {paginationConfig.merchantNameSearchValue.length > 1 && (
                        <li>
                          Merchant Name:{" "}
                          {paginationConfig.merchantNameSearchValue}
                        </li>
                      )}
                      {paginationConfig.userNotesSearchValue.length > 1 && (
                        <li>
                          User Notes: {paginationConfig.userNotesSearchValue}
                        </li>
                      )}
                      {paginationConfig.tagSearchValue.length > 1 && (
                        <li>Tags: {paginationConfig.tagSearchValue}</li>
                      )}
                      {paginationConfig.amountFrom != 0 && (
                        <li>Amount From: {paginationConfig.amountFrom}</li>
                      )}
                      {paginationConfig.amountTo != 0 && (
                        <li>Amount To: {paginationConfig.amountTo}</li>
                      )}
                      {paginationConfig.startDate.length > 1 && (
                        <li>Start Date: {paginationConfig.startDate}</li>
                      )}
                      {paginationConfig.endDate.length > 1 && (
                        <li>Start Date: {paginationConfig.endDate}</li>
                      )}
                    </ul>
                    {!formSubmitted && (
                      <Link
                        to="/transactions"
                        data-testid="navlink-bulk-edit-transactions"
                        className="mx-2"
                      >
                        <Button variant="secondary" size="sm">
                          <FontAwesomeIcon
                            icon={faBackwardStep}
                            title="Bulk Update selected Transactions"
                          />
                          &nbsp;Back to Transactions
                        </Button>
                      </Link>
                    )}
                    {formSubmitted && (
                      <Button variant="secondary" size="sm" disabled>
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                        &nbsp;Updating Transactions...
                      </Button>
                    )}
                  </Alert>
                </Col>
              </Row>
              {formSubmittedSuccess && updatedItems.length > 0 && (
                <Row>
                  <Col xs={12}>
                    <Table
                      hover
                      responsive
                      id="transactions-table"
                      className="transactionTableContainer mb-4 mt-4"
                    >
                      <thead>
                        <th colSpan={5}>Updated Transactions (sample)</th>
                      </thead>

                      <tbody>
                        {updatedItems.map((item) => (
                          <tr key={item.id}>
                            <td>{item.date}</td>
                            <td>{item.amount}</td>
                            <td>{formatCategory(item.personalFinanceCategory.primary)}</td>
                            <td>{formatSubCategory(item.personalFinanceCategory.primary, item.personalFinanceCategory.detailed)}</td>
                            <td>{item.userNotes}</td>
                          </tr>
                        ))}
                      </tbody>
                    </Table>
                  </Col>
                </Row>
              )}
              <Row>
                <Col xs={12}>
                  {/* <Alert variant="light"><b>Values to bulk update:</b></Alert> */}
                  <p className="lead">
                    <b>Attributes to bulk update:</b>
                  </p>
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
                          <option
                            key={category.primary.toString()}
                            value={category.primary.toString()}
                          >
                            {formatCategory(category.primary.toString())}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                  <Col xs={6}>
                    <Form.Group controlId="formSubCategory">
                      <Form.Label>Sub-Category</Form.Label>
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
                          <option
                            key={subCategory.detailed}
                            value={subCategory.detailed}
                          >
                            {formatSubCategory(
                              subCategory.primary,
                              subCategory.detailed
                            )}
                          </option>
                        ))}
                      </Form.Select>
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={6}>
                    <Form.Label>Tags</Form.Label>
                    {transactionTags.map((tag) => (
                      <Form.Check
                        key={tag}
                        type="checkbox"
                        id={tag}
                        name="tag"
                        label={tag}
                        onChange={handleTagCheckboxChange}
                        data-testid="transaction-detail-form-transaction-tags"
                        defaultChecked={paginationConfig.tagSearchValue.includes(
                          tag
                        )}
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
                        value={formBulkNotesValue}
                        onChange={handleTextAreaChange}
                        style={{ fontSize: ".75em" }}
                      />
                    </Form.Group>
                  </Col>
                </Row>
                <Row>
                  <Col xs={5}>&nbsp;</Col>
                  <Col xs={2}>
                    <Button
                      variant="primary"
                      onClick={handleFormSubmit}
                      data-testid="transaction-bulk-update-form-submit"
                      className="mt-5"
                      disabled={formSubmitted}
                    >
                      {formSubmitted && (
                        <Spinner
                          as="span"
                          animation="border"
                          size="sm"
                          role="status"
                          aria-hidden="true"
                        />
                      )}
                      &nbsp;Update
                    </Button>
                  </Col>
                  <Col xs={5}>&nbsp;</Col>
                </Row>
              </Form>
            </Card.Body>
          </Card>
        </Card.Body>
      </Card>
    </div>
  );
};
