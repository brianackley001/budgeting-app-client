import React, { useCallback, useState } from "react";

import { Card, Row, Col, Button } from "react-bootstrap";
import { useAppSelector, useAppDispatch } from "../hooks/storeHooks";
import { selectUid, selectAccessToken } from "../store/msalSlice";
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
//     .post(`${import.meta.env.VITE_API_URL}/api/create_link_token`, bodyParameters, config)
//     .then((response) => {
//       console.log(response.data);
//     })
//     .catch((error) => {
//       console.error(error);
//     });
// };

export const Accounts = () => {
  const accessToken = useAppSelector(selectAccessToken);
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
                  <SimplePlaidLink />
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
