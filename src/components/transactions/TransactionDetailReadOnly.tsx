import React from "react";
import{ Badge , Row, Col} from "react-bootstrap";
import {formatMerchantDisplayName} from "@utils/transactionUtils.ts"

/**
 * Renders information about the transaction list item
 * @param props
 */

export default function  TransactionDetailReadOnly(props){
  const { item } = props;
  const descriptionDisplayValue = item.userDescription === null || item.userDescription === undefined || item.userDescription === "" ?
    formatMerchantDisplayName(item.merchantName, item.name) :
    item.userDescription;
  return (
    <>
        <span className="card-text" id="readOnlyTransaction" data-testid="transaction-detail-read-only-container">
                <Row>
                  <Col xs={6}>Date:</Col>
                  <Col xs={6}>{item.date}</Col>
                </Row>
                <Row>
                  <Col xs={6}>Description:</Col>
                  <Col xs={6} data-testid="transaction-detail-read-only-description-display-value">{descriptionDisplayValue}</Col>
                </Row>
                <Row>
                  <Col xs={6}>Amount:</Col>
                  <Col xs={6}>{item.amount }</Col>
                </Row>
                <Row>
                  <Col xs={6}>Category:</Col>
                  <Col xs={6} >{item.category}</Col>
                </Row>
                <Row>
                  <Col xs={12} className="mt-4 mb-4"><hr style={{width: "86%", margin: "auto"}}/></Col>
                </Row>
                <Row>
                  <Col xs={6}>Notes:</Col>
                  <Col xs={6}>{item.userNotes}</Col>
                </Row>
                <Row>
                  <Col xs={6}>Tags:</Col>
                  <Col xs={6}>{item.tags && item.tags !== undefined ? 
                    item.tags.map((tag, index) => (<Badge pill bg="secondary" key={index}>{tag}</Badge>)): 
                    null}
                  </Col>
                </Row>
          </span>
    </>
  );
}