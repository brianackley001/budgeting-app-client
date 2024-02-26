import { Card, Row, Col } from "react-bootstrap";
import PageSizeComponent from '@/components/transactions/PageSizeComponent';
import { useAppSelector } from "@hooks/storeHooks";
import { logTrace } from "@utils/logger";
import EditTag from '@/components/tags/EditTag';
import CreateTag from "@/components/tags/CreateTag";

export const Settings = () => {
  logTrace('Settings.tsx');
  const transactionPaginationSize = useAppSelector(state => state.userSlice.preferences.transactionItemsPerPage);
  const tags = useAppSelector(state => state.userSlice.transactionTags);
  const userId = useAppSelector(state => state.userSlice.userId);
  return (
    <>
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
            <Card.Subtitle className="mb-2 mt-2 mx-2 text-bold">Manage Tags
              <span className='cardHeaderIconRight' aria-label="Add Tag" title="Add Tag">
                <CreateTag userId={userId} tags={tags} />
                </span>
              </Card.Subtitle>
              <Card.Body>
                {tags.map((tag, i) => (
                  <EditTag key={i} tag={tag} tagCollection={tags} />
                ))}
              </Card.Body>
            </Card>
          </Card.Body>
        </Card>
      </div>
    </>
  );
};
