import { Col, Card, Row, Spinner } from "react-bootstrap";


export const LoadingMessage = (props) => {
  const { isLoading } = props;
  return (
    <>{isLoading && <span className="card-text topMarginSpacer" id="loadingMessage" data-testid="transaction-loading-message">
      <Row>
        <Col xs={12} className="transactionTableContainer">
          <Spinner animation="grow" variant="primary" className="iconStyle" />
          <Spinner animation="grow" variant="primary" className="iconStyle" />
          <Spinner animation="grow" variant="primary" className="iconStyle" />
          <Spinner animation="grow" variant="primary" className="iconStyle" />
          <Spinner animation="grow" variant="primary" className="iconStyle" />
        </Col>
      </Row>
      <Row>
        <Col xs={12}>
          <h6><i>Rerieving transactions...</i></h6>
        </Col>
      </Row>

    </span>}
    </>

  );
}