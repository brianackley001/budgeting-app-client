import { Button, Card, Row, Col } from "react-bootstrap";
import PageSizeComponent from '@/components/transactions/PageSizeComponent';
import { useAppSelector } from "@/hooks/useStoreHooks";
import { logTrace } from "@utils/logger";
import EditTag from '@/components/tags/EditTag';
import CreateTag from "@/components/tags/CreateTag";
import { logEvent } from "@utils/logger";
import  axiosInstance  from '@utils/axiosInstance';
import { useState } from "react";


export const Settings = () => {
  logTrace('Settings.tsx');
  const transactionPaginationSize = useAppSelector(state => state.userSlice.preferences.transactionItemsPerPage);
  const tags = useAppSelector(state => state.userSlice.transactionTags);
  const userId = useAppSelector(state => state.userSlice.userId);
  const accounts = useAppSelector(state => state.accountSlice.accounts);
  const [file, setFile] = useState();
  const [array, setArray] = useState([]);
  const executeSyncAction = async() => { 
    console.log("executeSyncAction");
    logEvent("map-userId-to-transactions", { userId: userId, accounts: accounts.length.toString()});
    
    // validate item/institution error is resolved
    const response = await axiosInstance.post(`/transactionsUserSync`, 
      {userId: userId, accountIds: accounts.map((account) => account.accountId)});
  };
  const executeSyncAllAction = async() => { 
    console.log("executeSyncAllAction");
    logEvent("map-all-userId-to-all-transactions", { userId: userId, accounts: accounts.length.toString()});
    
    // validate item/institution error is resolved
    const response = await axiosInstance.post(`/transactionsUserSyncAll`, 
      {userId: userId});
  };

    const fileReader = new FileReader();

    const handleOnCsvSelectChange = (e) => {
        setFile(e.target.files[0]);
    };
    
  const csvFileToArray = string => {
    const csvHeader = string.slice(0, string.indexOf("\n")).split(",");
    const csvRows = string.slice(string.indexOf("\n") + 1).split("\n");

    const array = csvRows.map(i => {
      const values = i.split(",");
      const obj = csvHeader.reduce((object, header, index) => {
        object[header] = values[index];
        return object;
      }, {});
      return obj;
    });

    setArray(array);
    console.log(array);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const text = event.target?.result;
        csvFileToArray(text);
      };

      fileReader.readAsText(file);
    }
  };
  return (
    <div className="dashboardAccountContainer">
      <Card>
        <Card.Body>
          <Card.Title>Settings</Card.Title>
          <Card className="mb-3">
            <Card.Subtitle className="mb-2 mt-2 mx-2 text-bold">Transactions Per Page</Card.Subtitle>
            <Card.Body>
              <Row>
                <Col xs={6}>
                  <PageSizeComponent pageSize={transactionPaginationSize}></PageSizeComponent>
                </Col>
                <Col xs={6}>
                  &nbsp;
                </Col>
              </Row>
            </Card.Body>
          </Card>
          <Card className="mb-5">
            <Card.Subtitle className="mb-2 mt-2 mx-2 text-bold">
              Manage Tags
              <span className='cardHeaderIconRight' aria-label="Add Tag" title="Add Tag">
                <CreateTag userId={userId} tags={tags} tag="" />
              </span>
            </Card.Subtitle>
            <Card.Body>
              {tags.map((tag, i) => (
                <EditTag key={i} tag={tag} tags={tags} userId={userId} />
              ))}
            </Card.Body>
          </Card>
          
          <Card className="mb-5">
            <Card.Subtitle className="mb-2 mt-2 mx-2 text-bold">
            Import Historical Transaction data
              <span className='cardHeaderIconRight' aria-label="Import Historical Transaction data" title="Import Historical Transaction data">
              <form>
                <input 
                    type={"file"}
                    id={"csvFileInput"}
                    accept={".csv"}
                    onChange={handleOnCsvSelectChange}/>
                <Button variant="primary" 
                  className="ml-auto"
                  data-testid="button-import-csv"
                  onClick={(e) => {
                    handleOnSubmit(e);
                }}>Import</Button>
            </form>
              </span>
            </Card.Subtitle>
            <Card.Body>
              
            </Card.Body>
          </Card>

          <Card className="mb-5">
            <Card.Subtitle className="mb-2 mt-2 mx-2 text-bold">
            Sync User ID to transaction details
              <span className='cardHeaderIconRight' aria-label="Sync User ID to transaction details" title="Sync User ID to transaction details">
                <Button variant="primary" 
                  className="ml-auto"
                  data-testid="button-sign-in"
                  onClick={() => executeSyncAction()}>Sync</Button>
              </span>
            </Card.Subtitle>
            <Card.Body>
              
            </Card.Body>
          </Card>

          <Card className="mb-5">
            <Card.Subtitle className="mb-2 mt-2 mx-2 text-bold">
            Sync All User IDs & Transactions
              <span className='cardHeaderIconRight' aria-label="Sync All User IDs & Transactions" title="Sync All User IDs & Transactions">
                <Button variant="primary" 
                  className="ml-auto"
                  data-testid="button-sign-in"
                  onClick={() => executeSyncAllAction()}>Sync All</Button>
              </span>
            </Card.Subtitle>
            <Card.Body>
    
  </Card.Body>
</Card>

        </Card.Body>
      </Card>
    </div>
  );
};
