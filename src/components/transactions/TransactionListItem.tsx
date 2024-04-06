import { useState } from 'react';
import { Button, Card, CardTitle, CardBody, Col, Form, Modal, Row, FormGroup, FormControl, Accordion } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faPencil, faNoteSticky  } from '@fortawesome/free-solid-svg-icons';
// import { faNoteSticky } from '@fortawesome/free-regular-svg-icons';
import TransactionDetailReadOnly from "./TransactionDetailReadOnly";
import TagAccordionItem from './filterOptions/TagAccordionItem';
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { setAlertState} from "@store/alertSlice";
import { setUpdatedTransactionItem } from "@store/transactionSlice";
import { formatMerchantDisplayName } from "@utils/transactionUtils.ts";
import axiosInstance from "@utils/axiosInstance";

/**
 * Renders read-only view and an update form for a selected transaction list item
 * @param props
 */
export const TransactionListItem = (item) =>{
  const dispatch = useAppDispatch();

  const [showDetail, setShowDetail] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Form Models
  const [validated, setValidated] = useState(false);
  const [formTranCategory, setFormTranCategory] = useState(item.category);
  const [formTranDateValue, setFormTranDateValue] = useState(new Date(item.date).toLocaleDateString('en-CA'));
  const [formTranDescription, setFormTranDescription] = useState(formatMerchantDisplayName(item.merchantName, item.name));
  const [formTranNotes, setFormTranNotes] = useState(item.userNotes ?? "");
  const [trackedTags, setTrackedTags] = useState(item.tags ?? []);

// Methods: 
  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    console.log('form submitted');

    // API Call to update transaction
    try {
      const result = await axiosInstance.post(`/transaction/${item.transactionId}`,
        {
          id: event.currentTarget.elements['formGridTransactionId'].value,
          transactionId: event.currentTarget.elements['formGridTransactionId'].value,
          accountId: event.currentTarget.elements['formGridAccountId'].value,
          userDescription: event.currentTarget.elements['formGridTransactionDescription'].value,
          userNotes: event.currentTarget.elements['formGridNotes'].value,
          tags: trackedTags,
        });
      //Update the specific transaction in pagedItems cache
      dispatch(setUpdatedTransactionItem(result.data));

      handleToggleEditMode();
      setValidated(false);

      if (result.status < 400) {
        handleSaveMessageSuccess(
          `${result.data.date} ${result.data.userDescription.length > 0 ?
            result.data.userDescription :
            result.data.merchant}`)
      } else {
        handleSaveMessageError(
          `${event.currentTarget.elements['formGridTransactionDescription'].value}`)
      }
      handleModalClose();
    }
    catch (e) {
      console.log(e);
      handleSaveMessageError(
        `${e}`)
    }
  };
  
  const handleModalClose = () => {
    setIsEditMode(false);
    setShowDetail(false);
  };

  const handleSaveMessageError= (messageLabel) => {
    dispatch(
      setAlertState({
        headerText: "Transaction Update Error",
        icon: {
          iconType:'error', 
          isVisible: true,
          iconSize: '',
          iconColor: 'white',
        },
        inProgress: false,
        messageText: `Unable to update "${messageLabel}" transaction. Please try again later`,
        showAlert: true,
        variantStyle: "danger",
      })
    );
  }

  const handleSaveMessageSuccess = (messageLabel) => {
    dispatch(
      setAlertState({
        headerText: "Transaction Updated",
        icon: {
          iconType:'success', 
          isVisible: true,
          iconSize: '',
          iconColor: 'white',
        },
        inProgress: false,
        messageText: `"${messageLabel}" transaction updated successfully`,
        showAlert: true,
        variantStyle: "success",
      })
    );
  }

  const handleShowDetail = () => setShowDetail(true);

  const handleTagCheckboxChange = (event) => {
    const checkedName = event.target.name;
    if (event.target.checked) {
      setTrackedTags([...trackedTags, checkedName])
    } else {
      setTrackedTags(trackedTags.filter(id => id !== checkedName))
    }
  }
  
  const handleTextAreaChange = (event) =>{
    switch(event.target.id) {
      case "formGridTransactionDate":
        setFormTranDateValue(event.target.value);
        break;
      case "formGridCategory":
        setFormTranCategory(event.target.value);
        break;
      case "formGridNotes":
        setFormTranNotes(event.target.value);
        break;
      default:
        setFormTranDescription(event.target.value);
    }
  }

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  }

  return (
    <>
    <tr onClick={handleShowDetail}>
      <td className="transactionGridLineItem">{item.date}</td>
      <td className="transactionGridLineItem">
      {item.userNotes && item.userNotes.length > 0 && 
            <span className="iconStyle" title={item.userNotes}><FontAwesomeIcon icon={faNoteSticky} size="sm"  style={{color: "#ecc63c",}}/></span>}
        {formTranDescription}
      </td>
      <td className="transactionGridLineItem">{item.amount}</td>
      <td className="transactionGridLineItem">{item.category}</td>
    </tr>

      <Modal show={showDetail}
        onHide={handleModalClose}
        item={item}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered>
        <Form noValidate validated={validated} data-testid="accordion-form" onSubmit={handleFormSubmit}>
          <Modal.Header closeButton>
            <Modal.Title as="h6">Transaction Details</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Card>
              <CardTitle as="h6" className='navbarStyle'> {isEditMode ? "Edit Transaction" : `Account: ${item.bankAccountName}`}
                <span className='cardHeaderIconRight' aria-label="Edit Transaction" title="Edit Institution">
                  {!isEditMode && <Button variant="outline-dark" size="sm" className='addAccountButton' onClick={() => handleToggleEditMode()} role="button">
                    <FontAwesomeIcon icon={faPencil} className='iconStyle' /><span onClick={() => handleToggleEditMode()} role="button" tabIndex={0}>Edit</span>
                  </Button>}
                </span>
              </CardTitle>
              <CardBody>
                {!isEditMode && <TransactionDetailReadOnly item={item} />}
                {isEditMode &&
                  <span className="card-text" id="transactionDetailEditFormTransaction" data-testid="transaction-detail=read-only-container">
                    <Row className="mb-3 transactionModalSummary">
                      <Col xs={12}>Appears on your <b>{item.bankAccountName}</b> statement as "<b>{formatMerchantDisplayName(item.merchantName, item.name)}</b>" on <b>{item.date}</b></Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={2}>
                        <Form.Group className="mb-3" controlId="formGridTransactionDate">
                          <Form.Label>Date</Form.Label>
                          <Form.Control
                            style={{ fontSize: ".75em" }}
                            value={formTranDateValue}
                            name="transactionDate"
                            type="date"
                            aria-label="Disabled input example"
                            disabled
                            readOnly
                            onChange={handleTextAreaChange}
                          />
                        </Form.Group>
                      </Col>
                      <Col xs={5}>
                        <Form.Group as={Col} controlId="formGridTransactionDescription">
                          <Form.Label>Description</Form.Label>
                          <Form.Control
                            required
                            name="transactionDescription"
                            data-testid="transaction-detail-form-transaction-name"
                            value={formTranDescription}
                            title={formTranDescription}
                            onChange={handleTextAreaChange}
                            style={{ fontSize: ".90em" }} />
                          <Form.Control.Feedback data-testid="transaction-detail-form-transaction-name-is-valid" >Looks good!</Form.Control.Feedback>
                          <Form.Control.Feedback type="invalid" data-testid="transaction-detail-form-transaction-name-is-invalid">
                            Please provide a valid  description.
                          </Form.Control.Feedback>
                        </Form.Group>
                      </Col>
                      <Col xs={3}>
                        <Form.Group as={Col} controlId="formGridCategory">
                          <Form.Label>Category</Form.Label>
                          <Form.Control
                            type="text"
                            name="categoryName"
                            data-testid="transaction-detail-form-transaction-category"
                            defaultValue={item.category}
                            aria-label="Disabled input example"
                            disabled
                            readOnly
                            title={item.category}
                            style={{ fontSize: ".75em" }} />
                        </Form.Group>
                      </Col>
                      <Col xs={2}>
                        <Form.Group as={Col} controlId="formGridAmount">
                          <Form.Label>Amount</Form.Label>
                          <Form.Control
                            type="text"
                            name="categoryName"
                            data-testid="transaction-detail-form-transaction-amount"
                            defaultValue={item.amount}
                            aria-label="Disabled input example"
                            disabled
                            readOnly
                            className="text-lowercase"
                            style={{ fontSize: ".75em" }} />
                        </Form.Group>
                      </Col>
                    </Row>
                    <Row className="mb-3">
                      <Col xs={6}>
                        <FormGroup controlId="formGridTransactionId">
                          <FormControl type="hidden" name="transactionId" value={item.transactionId} />
                        </FormGroup>
                        <FormGroup controlId="formGridAccountId">
                          <FormControl type="hidden" name="accountId" value={item.accountId} />
                        </FormGroup>
                        <Form.Group as={Col} controlId="formGridNotes">
                          <Form.Label>Notes</Form.Label>
                          <Form.Control as="textarea"
                            aria-label="With textarea"
                            name="categoryName"
                            data-testid="transaction-detail-form-transaction-notes"
                            value={formTranNotes}
                            onChange={handleTextAreaChange}
                            style={{ fontSize: ".75em" }} />
                        </Form.Group>
                      </Col>
                      <Col xs={6}>
                      <Form.Group controlId="formGridTags">
                      <Accordion flush defaultActiveKey="transaction-tags">
                        <TagAccordionItem eventKey="transaction-tags" data-testid="transaction-detail-form-transaction-tags"
                          onSelect={handleTagCheckboxChange}
                          trackedTags={trackedTags} tags={item.userTags} />
                          </Accordion>
                        </Form.Group>
                      </Col>
                    </Row>
                  </span>}
              </CardBody>
            </Card>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleModalClose}>Close</Button>
            {isEditMode &&
              <Button variant="primary" type="submit" data-testid="transaction-detail-form-submit-btn">
                Save Changes
              </Button>
            }
          </Modal.Footer>
        </Form>
      </Modal>
    </> 
  );
};
