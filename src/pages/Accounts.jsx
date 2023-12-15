import React, { useCallback, useState } from "react";

import { Card, Row, Col, Button } from "react-bootstrap";
import { useAcquireAccessToken } from "../hooks/useAcquireAccessToken";
import SimplePlaidLink from "../components/SimplePlaidLink";

import axios from "axios";

//let msalTokenValue = null;
// const initAddAccount = () => {
//   //console.log("add account - BEGIN");

//   let config = {
//     headers: {
//       Authorization: "Bearer " + msalTokenValue,
//     },
//   };
//   const bodyParameters = {};
//   console.log(`tokenValue: ${msalTokenValue}`);

//   axios
//     .post(`${process.env.REACT_APP_API_URL}/api/create_link_token`, bodyParameters, config)
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

export const Accounts = () => {
  // const [msalTokenValue, setMsalTokenValue] = useState(null)
  // setMsalTokenValue(useAcquireAccessToken());
  // console.log(`msalTokenValue: ${msalTokenValue}`);
  return (
    <>
      <div className="d-flex justify-content-around">
        <Row>
          <Col xs={1}>&nbsp;</Col>
          <Col xs={8}>
            <Card style={{ width: "22rem" }}>
              <Card.Body>
                <Card.Header>Accounts</Card.Header>
                <Card.Text>
                  {/* <Button variant="primary" onClick={initAddAccount}>
                    Add Account
                  </Button> */}
                  {/* <SimplePlaidLink  msalTokenValue={msalTokenValue} /> */}
                </Card.Text>
              </Card.Body>
            </Card>
          </Col>
          <Col xs={1}>&nbsp;</Col>
        </Row>
      </div>
    </>
  );
};
