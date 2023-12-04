
import{ Card, Row, Col } from "react-bootstrap";

export const Accounts = () => {
  return (
    <>
      <div className="d-flex justify-content-around">
        <Row>
          <Col xs={1}>
            &nbsp;
          </Col>
          <Col xs={8}>
            <Card style={{ width: "22rem" }}>
              <Card.Body>
                <Card.Header>Accounts</Card.Header>
                <Card.Text>
                  Accounts Page
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={1}>
            &nbsp;
          </Col>
        </Row>
      </div>
    </>
  );
};
