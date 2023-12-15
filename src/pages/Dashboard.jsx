import Container from "react-bootstrap/Container";
import{ Card, Row, Col } from "react-bootstrap";


import { useAcquireAccessToken } from "../hooks/useAcquireAccessToken";
import axios from "axios";

const getApiPublicToken = (tokenValue) => {
  console.log("get token");
  let config = {
    headers: {
      Authorization: "Bearer " + tokenValue,
    },
  };
  const bodyParameters = {
    key: "value",
  };

  axios
    .post(`${process.env.REACT_APP_API_URL}/api/info`, bodyParameters, config)
    .then((response) => {
      console.log(response.data);
    })
    .catch((error) => {
      console.error(error);
    });
};

const accountItems = [
  { id: 1, name: "Account 1" },
  { id: 2, name: "Account 2" },
  { id: 3, name: "Account 3" },
  { id: 4, name: "Account 4" },
  { id: 5, name: "Account 5" },
  { id: 6, name: "Account 6" },
  { id: 7, name: "Account 7" },
  { id: 8, name: "Account 8" },
  { id: 9, name: "Account 9" },
  { id: 10, name: "Account 10" },
];

export const Dashboard = () => {
  const tokenValue = useAcquireAccessToken();
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
                <Card.Header>Add Accounts</Card.Header>
                <Card.Text>
                  Add external financial accounts to your dashboard to start
                  pulling in transaction data.
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
