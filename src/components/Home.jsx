import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useAcquireAccessToken } from "../hooks/useAcquireAccessToken";
import axios from 'axios';

const getApiPublicToken = (tokenValue) => {
  console.log("get token");
  let config = {
    headers: {
      'Authorization': 'Bearer ' + tokenValue
    }
  }
  const bodyParameters = {
    key: "value"
 };

  axios.post('http://localhost:8000/api/info',bodyParameters, config)
  .then(response => {
    console.log(response.data);
  })
  .catch(error => {
    console.error(error);
  });
};


export const Home = () => {
  const tokenValue = useAcquireAccessToken();
  return (
    <div className="d-flex justify-content-around">
      <Card style={{ width: "18rem" }}>
        <Card.Body>
          <Card.Title>Get Auth Token</Card.Title>
          <Card.Text>
            Some quick example text to build on the card title and make up the
            bulk of the card's content. Your API Access Token: ...
          </Card.Text>
          <Button variant="primary" onClick={getApiPublicToken(tokenValue)}>GET IT</Button>
        </Card.Body>
      </Card>
    </div>
  );
};
