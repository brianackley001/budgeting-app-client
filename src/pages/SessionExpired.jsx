
import{ Card, Row, Col } from "react-bootstrap";

import { SignInButton } from "../buttons/SignInButton";
import {logTrace} from "@utils/logger";


export const SessionExpired = () => {
  logTrace('SessionExpired.tsx');
  return (
    <div className="d-flex justify-content-around">
      <Row>
        <Col xs={1}>&nbsp;</Col>
        <Col xs={8}>
          <Card style={{ width: "22rem" }}>
            <Card.Body>
              <Card.Header>Your Session has Expired</Card.Header>
              <Card.Text>
                Please log in again.
                <br />
                <SignInButton />
              </Card.Text>
            </Card.Body>
          </Card>
        </Col>
        <Col xs={1}>&nbsp;</Col>
      </Row>
    </div>
  );
};