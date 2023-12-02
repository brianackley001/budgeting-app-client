import Button from "react-bootstrap/Button";
import Card from "react-bootstrap/Card";
import { useAcquireAccessToken } from "../hooks/useAcquireAccessToken";


//useAcquireAccessToken= useAcquireAccessToken();

const getToken = () => {
  console.log("get token");
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
            bulk of the card's content. Your Access Token: {tokenValue} 
          </Card.Text>
          <Button variant="primary" onClick={getToken}>GET IT</Button>
        </Card.Body>
      </Card>
    </div>
  );
};
