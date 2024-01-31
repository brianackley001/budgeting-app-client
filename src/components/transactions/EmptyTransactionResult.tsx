import React from "react";
import { Col, Card, Row, Alert } from "react-bootstrap";

/**
 * Renders mesaging to user that no transaction data matches the current filter criteria
 * @param props
 */

export default function EmptyTransactionResult() {
  return (
    <>
      <br />
      <span className="card-text topMarginSpacer" id="readOnlyTransaction" data-testid="transaction-empty-container">
        <Row>
          <Col xs={12}>
            <Card className="transactionPaginationContainer">
              <Card.Title className="text-danger" data-testid="transaction-empty-container-card-title">No matching transactions found...</Card.Title>
              <Card.Body data-testid="transaction-empty-container-card-body">
                <p>Based on your filtering and sorting criteria, we were not able to find any matching transactions. </p>
                <Alert variant="warning" data-testid="transaction-empty-container-alert">
                <b>Please check your filters and try again.</b> 
                </Alert>
                </Card.Body>
            </Card>
          </Col>
        </Row>
      </span>
    </>
  );
}