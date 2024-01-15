
import{ Row, Col} from "react-bootstrap";

/**
 * Renders information about the transaction list item
 * @param props
 */

export default function  TransactionDetailReadOnly(props){
  const { item } = props;
  return (
    <>
        <span className="card-text" id="readOnlyTransaction" data-testid="transaction-detail=read-only-container">
                <Row>
                  <Col xs={6}>Date:</Col>
                  <Col xs={6}>{item.date}</Col>
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
                  <Col xs={6} className="text-lowercase">{item.category}</Col>
                </Row>
                <Row>
                  <Col xs={6}>Notes:</Col>
                  <Col xs={6}>{item.notes}</Col>
                </Row>
                <Row>
                  <Col xs={6}>Tags:</Col>
                  <Col xs={6} className="text-lowercase">{item.tags}</Col>
                </Row>
          </span>
    </>
  );
}