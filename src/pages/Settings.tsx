import { Button, Card, Row, Col } from "react-bootstrap";
import PageSizeComponent from '@/components/transactions/PageSizeComponent';
import { useAppSelector } from "@/hooks/useStoreHooks";
import { logTrace } from "@utils/logger";
import EditTag from '@/components/tags/EditTag';
import CreateTag from "@/components/tags/CreateTag";
import { logEvent } from "@utils/logger";
import  axiosInstance  from '@utils/axiosInstance';


export const Settings = () => {
  logTrace('Settings.tsx');
  const transactionPaginationSize = useAppSelector(state => state.userSlice.preferences.transactionItemsPerPage);
  const tags = useAppSelector(state => state.userSlice.transactionTags);
  const userId = useAppSelector(state => state.userSlice.userId);
  const accounts = useAppSelector(state => state.accountSlice.accounts);
  const executeSyncAction = async() => { 
    console.log("executeSyncAction");
    logEvent("map-userId-to-transactions", { userId: userId, accounts: accounts.length.toString()});
    
    // validate item/institution error is resolved
    const response = await axiosInstance.post(`/transactionsUserSync`, 
      {userId: userId, accountIds: accounts.map((account) => account.accountId)});
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

        </Card.Body>
      </Card>
    </div>
  );
};
