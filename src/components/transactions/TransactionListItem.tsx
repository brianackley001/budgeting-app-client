import React , { useState, useRef } from 'react';
import { useAcquireAccessToken } from "../../hooks/useAcquireAccessToken.js";
import { selectAccessToken } from "../../store/msalSlice";
import { useAppDispatch, useAppSelector } from "../../hooks/storeHooks";
import{ Button, Card, CardTitle, CardBody, Col, Form, Modal, Row, FormGroup, FormControl } from "react-bootstrap";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faPencil } from '@fortawesome/free-solid-svg-icons'
import axiosInstance from "../../utils/axiosInstance";
import {setHeaderText,setMessageText,setShowAlert,setVariantStyle} from "../../store/alertSlice";
import TransactionDetailReadOnly from "./TransactionDetailReadOnly"
import {formatMerchantDisplayName} from "../../utils/transactionUtils.ts"

/**
 * Renders read-only view and an update form for a selected transaction list item
 * @param props
 */
export const TransactionListItem = (item) =>{
  useAcquireAccessToken();
  const accessToken = useAppSelector(selectAccessToken);
  const dispatch = useAppDispatch();

  const [showDetail, setShowDetail] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  // Form Models
  const [validated, setValidated] = useState(false);
  const [formTranCategory, setFormTranCategory] = useState(item.category);
  const [formTranDateValue, setFormTranDateValue] = useState(new Date(item.date).toLocaleDateString('en-CA'));
  const [formTranTags, setFormTranTags] = useState(item.tags === null ||  item.tags === undefined ? 
    "" : 
    item.tags.join(", "));
  const [formTranDescription, setFormTranDescription] = useState(
    item.userDescription === null ||  item.userDescription === undefined || item.userDescription === "" ? 
    formatMerchantDisplayName(item.merchantName, item.name) : 
    item.userDescription);
  const [formTranNotes, setFormTranNotes] = useState(item.userNotes === null ||  item.userNotes === undefined ? 
    "" :  
    item.userNotes);

// Methods: 
  const handleModalClose = () => {
    setIsEditMode(false);
    setShowDetail(false);
  };

  const handleShowDetail = () => setShowDetail(true);

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.stopPropagation();
    }
    setValidated(true);
    console.log('form submitted');

    // API Call to update transaction
    const config = {
      headers: {
        Authorization: "Bearer " + accessToken,
      },
    };

    try {
      let tags = [];
      if (event.currentTarget.elements['formGridTags'].value && event.currentTarget.elements['formGridTags'].value.length > 0) {
        tags = event.currentTarget.elements['formGridTags'].value.replace(/\s/g, '').split(',');
      }

      const result = await axiosInstance.post(`/transaction/${item.transactionId}`,
        {
          id: event.currentTarget.elements['formGridTransactionId'].value,
          transactionId: event.currentTarget.elements['formGridTransactionId'].value,
          accountId: event.currentTarget.elements['formGridAccountId'].value,
          userDescription: event.currentTarget.elements['formGridTransactionDescription'].value,
          notes: event.currentTarget.elements['formGridNotes'].value,
          tags: tags,
        },
        config);
      //Update the specific transaction in pagedItems cache
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
  
  
  function handleTextAreaChange(e) {
    switch(e.target.id) {
      case "formGridTransactionDate":
        setFormTranDateValue(e.target.value);
        break;
      case "formGridCategory":
        setFormTranCategory(e.target.value);
        break;
      case "formGridNotes":
        setFormTranNotes(e.target.value);
        break;
      case "formGridTags":
        setFormTranTags(e.target.value);
        break;
      default:
        setFormTranDescription(e.target.value);
    }
  }

  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  }

  const handleSaveMessageSuccess = (messageLabel) => {
    dispatch(setHeaderText("Transaction Updated"));
    dispatch(setMessageText(`"${messageLabel}" transaction updated successfully`));
    dispatch(setShowAlert(true));
    dispatch(setVariantStyle("success"));
  }
  const handleSaveMessageError= (messageLabel) => {
    dispatch(setHeaderText("Transaction Update Error"));
    dispatch(setMessageText(`Unable to update "${messageLabel}" transaction. Please try again later`));
    dispatch(setShowAlert(true));
    dispatch(setVariantStyle("danger"));
  }

  return (
    <>
    <tr onClick={handleShowDetail}>
      <td className="transactionGridLineItem">{item.date}</td>
      <td className="transactionGridLineItem">{formatMerchantDisplayName(item.merchant,item.name)}</td>
      <td className="transactionGridLineItem">{item.amount}</td>
      <td className="transactionGridLineItem">{item.category}</td>
    </tr>

    <Modal show={showDetail} 
      onHide={handleModalClose}
      item={item}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
        <Form noValidate validated={validated} data-testid="accordian-form" onSubmit={handleFormSubmit}>
        <Modal.Header closeButton>
          <Modal.Title as="h6">Transaction Details</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Card>
            <CardTitle as="h6" className='navbarStyle'> {isEditMode ? "Edit Transaction": `Account: ${item.bankAccountName}`} 
            <span className='cardHeaderIconRight' aria-label="Edit Transaction" title="Edit Institution">
              {!isEditMode ?   <Button variant="outline-dark" size="sm" className='addAccountButton' onClick={() => handleToggleEditMode()}>
              <FontAwesomeIcon icon={faPencil} className='iconStyle' /><span onClick={() => handleToggleEditMode()}>Edit</span>
            </Button> : null }
            </span>
            </CardTitle>
            <CardBody>
              {!isEditMode ?
                <TransactionDetailReadOnly item={item} />: null}
              {isEditMode ?
              <span className="card-text" id="transactionDetailEditFormTransaction" data-testid="transaction-detail=read-only-container">
              <Row className="mb-3 transactionModalSummary">
                <Col xs={12}>Appears on your <b>{item.bankAccountName}</b> statement as "<b>{formatMerchantDisplayName(item.merchantName,item.name)}</b>" on <b>{item.date}</b></Col>
              </Row>
              <Row className="mb-3">
                <Col xs={2}>
                  <Form.Group className="mb-3" controlId="formGridTransactionDate">
                    <Form.Label>Date</Form.Label>
                    <Form.Control
                      style={{fontSize: ".75em"}}
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
                      style={{fontSize: ".90em"}} />
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
                            style={{fontSize: ".75em"}} />
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
                            style={{fontSize: ".75em"}} />
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
                        <Form.Group as={Col} controlId="formGridTags">
                          <Form.Label>Labels (comma separated)</Form.Label>
                          <Form.Control as="textarea"  
                            aria-label="With textarea" 
                            name="tagName" 
                            data-testid="transaction-detail-form-transaction-tags"
                            value={formTranTags} 
                            onChange={handleTextAreaChange}
                            style={{fontSize: ".75em"}} />
                        </Form.Group>
                </Col>
              </Row>
              </span> : null}
          </CardBody>
          </Card>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {!isEditMode ? null : 
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
