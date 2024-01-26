import { Col, Card, Row, Spinner } from "react-bootstrap";


export const LoadingMessage = (props) => {
  const { isLoading } = props;
  return (
    <>
    {isLoading && 
    <span className="loadingSpinner" id="loadingMessage" data-testid="transaction-loading-message">
      <Row>
        <Col xs={12}>
          <Spinner animation="grow" variant="primary" className="iconStyle" />
          <Spinner animation="grow" variant="primary" className="iconStyle" />
          <Spinner animation="grow" variant="primary" className="iconStyle" />
          <Spinner animation="grow" variant="primary" className="iconStyle" />
          <Spinner animation="grow" variant="primary" className="iconStyle" />
          <br/>
          <br/>
          <h6><i>...Retrieving transactions...</i></h6>
        </Col>
      </Row>
    </span>}
    </>

  );
}