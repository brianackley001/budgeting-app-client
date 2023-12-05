
import{ Card, Row, Col, Button } from "react-bootstrap";

import { useAcquireAccessToken } from "../hooks/useAcquireAccessToken";
import axios from "axios";

let tokenValue = null;
const initAddAccount = () => {
  //console.log("add account - BEGIN");

  let config = {
    headers: {
      Authorization: "Bearer " + tokenValue,
    },
  };
  const bodyParameters = {};
  //console.log(`tokenValue: ${tokenValue}`)

  axios
    .post("http://localhost:8000/api/create_link_token", bodyParameters, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

export const Accounts = () => {
  tokenValue = useAcquireAccessToken();
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
                  <Button variant="primary" onClick={initAddAccount}>Add Account</Button>
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
