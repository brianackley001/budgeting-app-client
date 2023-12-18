import{ Card, Row, Col } from "react-bootstrap";
import AccountListItem from "../components/accounts/AccountListItem.tsx";
import { AccountListItemType } from "../types/accountListItem.ts";

export const Settings = () => {
  const accountListItem: AccountListItemType = { 
    account_id: "lv5KvMeBlgTmRMMjPgz9Sbr5QmDxKXcpzo5Dp",
    balances: {
        available: 100,
        current: 110,
        iso_currency_code: "USD",
        limit: null,
        unofficial_currency_code: null
    },
    mask: "0000",
    name: "Plaid Checking",
    official_name: "Plaid Gold Standard 0% Interest Checking",
    subtype: "checking",
    type: "depository",
    includeInTransactions: true,
  };
  return (
    <>
      <div className="d-flex justify-content-around">
        <Row>
          <Col xs={1}>
            &nbsp;
          </Col>
          <Col xs={8}>
            <Card style={{ width: "23rem" }}>
              <Card.Body>
                <Card.Header>Settings</Card.Header>
                  <AccountListItem {...accountListItem} />
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
