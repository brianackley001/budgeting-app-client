import React , { useState, useRef } from 'react';
import{ Card, Row, Col, CardTitle, CardSubtitle, CardBody } from "react-bootstrap";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faTrashCan, faGear, faPencil } from '@fortawesome/free-solid-svg-icons'

/**
 * Renders information about the transaction list item
 * @param props
 */
export const TransactionListItem = (item) => {
  const [showDetail, setShowDetail] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);

  
  const handleModalClose = () => setShowDetail(false);
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
            <CardTitle as="h6">
              Account: {item.bankAccountName} 
            <span className='cardHeaderIconRight' aria-label="Edit Transaction" title="Edit Institution">
              {!isEditMode ?   <Button variant="outline-dark" size="sm" className='addAccountButton' onClick={() => handleToggleEditMode()}>
              <FontAwesomeIcon icon={faPencil} className='iconStyle' /><span onClick={() => handleToggleEditMode()}>Edit</span>
            </Button> : null }
            </span>
            </CardTitle>
            <CardBody>
              {!isEditMode ?<span className='card-text>' id='readOnlyTransaction'>
                <Row>
                  <Col xs={6}>Date:</Col>
                  <Col xs={6}>{item.date }</Col>
                </Row>
                <Row>
                  <Col xs={6}>Description:</Col>
                  <Col xs={6}>{item.merchant}</Col>
                </Row>
                <Row>
                  <Col xs={6}>Amount:</Col>
                  <Col xs={6}>{item.amount }</Col>
                </Row>
                <Row>
                  <Col xs={6}>Category:</Col>
                  <Col xs={6} className='text-lowercase'>{item.category}</Col>
                </Row>
                <Row>
                  <Col xs={6}>Notes:</Col>
                  <Col xs={6}>{item.notes }</Col>
                </Row>
                <Row>
                  <Col xs={6}>Tags:</Col>
                  <Col xs={6} className='text-lowercase'>{item.tags}</Col>
                </Row>
              </span>: null}
              {isEditMode ?<span className='card-text>' id='readOnlyTransaction'>

              </span> : null }
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
