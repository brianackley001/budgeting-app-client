import React , { useState, useRef } from 'react';
import{ Card, Row, Col, CardTitle, CardSubtitle, CardBody } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faGear, faPencil } from '@fortawesome/free-solid-svg-icons'
import TransactionDetailReadOnly from "./TransactionDetailReadOnly"
import TransactionDetailForm from "./TransactionDetailForm"

/**
 * Renders information about the transaction list item
 * @param props
 */
export const TransactionListItem = (item) =>{
  const [showDetail, setShowDetail] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  
  const handleModalClose = () => {
    setIsEditMode(false);
    setShowDetail(false);
  };

  const handleShowDetail = () => setShowDetail(true);
  const handleToggleEditMode = () => {
    setIsEditMode(!isEditMode);
  }

  return (
    <>
    <tr onClick={handleShowDetail}>
      <td className="transactionGridLineItem">{item.date}</td>
      <td className="transactionGridLineItem">{item.merchant}</td>
      <td className="transactionGridLineItem">{item.amount}</td>
      <td className="transactionGridLineItem text-lowercase">{item.category}</td>
    </tr>

    <Modal show={showDetail} 
      onHide={handleModalClose}
      item={item}
      size="lg"
      aria-labelledby="contained-modal-title-vcenter"
      centered>
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
              <TransactionDetailForm item={item} />: null}
          </CardBody>
          </Card>
            
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleModalClose}>
            Close
          </Button>
          {!isEditMode ? null : 
          <Button variant="primary" onClick={handleModalClose}>
            Save Changes
          </Button>}
        </Modal.Footer>
      </Modal>
    </>

    
  );
};
