
import axiosInstance from "../../utils/axiosInstance.ts";
import Button from "react-bootstrap/Button";


export const Test1 = () => {

  const testUrl = "'https://jsonplaceholder.typicode.com/todos/1"
  
  
  const handleRefresh = () => {
    // Get User from DB:
    axiosInstance
    .get(testUrl)
    .then(async (response) => {
      //User Exists:
      if(response.data && response.data.id.length > 0){
        console.log(response.data);
      }
    })
    .catch((error) => {
      console.error(error);
    });
    
  };
  return (
    <Button
      variant="info"
      className="ml-auto"
      data-testid="button-store-refresh"
      onClick={() => handleRefresh()}
    >
      Refresh
    </Button>
  );
};