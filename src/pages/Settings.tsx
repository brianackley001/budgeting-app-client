import{ Card, Row, Col } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import AccountListItem from "../components/accounts/AccountListItem.tsx";
import AccountSummaryListItem from "../components/accounts/AccountSummaryListItem.tsx";
import { AccountListItemType } from "../types/accountListItem.ts";
import { AccountSummaryListItemType} from "../types/accountSummaryListItem.ts";

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
  let a: AccountSummaryListItemType = {
    institution_id: "ins_1234",
    item_id: "item_1234",
    institution_name: "Plaid Bank",
    account_id: "XXXXXXXXvMeBlgTmRMMjPgz9Sbr5QmDxKXcpzo5Dp",
    balances: {
      available: 100,
      current: 110,
      iso_currency_code: "USD",
      limit: null,
      unofficial_currency_code: null,
    },
    name: "Plaid Checking",
    mask: "0000",
    type: "depository",
    subtype: "checking",
    official_name: "Plaid Gold Standard 0% Interest Checking",
    includeInTransactions: true
  };
  let b: AccountSummaryListItemType = {
    institution_id: "ins_44555",
    item_id: "item_7734",
    institution_name: "Other Bank",
    account_id: "12121212MeBlgTmRMMjPgz9Sbr5QmDxKXcpzo5Dp",
    balances: {
      available: 100,
      current: 2110,
      iso_currency_code: "USD",
      limit: null,
      unofficial_currency_code: null,
    },
    name: "Other Checking",
    mask: "2121",
    type: "depository",
    subtype: "checking",
    official_name: "Plaid Gold Standard 0% Interest Checking",
    includeInTransactions: true
  };
  let c: AccountSummaryListItemType = {
    institution_id: "ins_6545",
    item_id: "item_1255",
    institution_name: "Random Bank",
    account_id: "ZasDsaMeBlgTmRMMjPgz9Sbr5QmDxKXcpzo5Dp",
    balances: {
      available: 100,
      current: 910,
      iso_currency_code: "USD",
      limit: null,
      unofficial_currency_code: null,
    },
    name: "Random Checking",
    mask: "2121",
    type: "depository",
    subtype: "checking",
    official_name: "Plaid Gold Standard 0% Interest Checking",
    includeInTransactions: true
  }
  const accountSummaryItems: AccountSummaryListItemType[] = [a, b, c ];
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
        <Row>
          <Col xs={1}>
            &nbsp;
          </Col>
          <Col xs={8}>
            <Card style={{ width: "23rem" }}>
              <Card.Body>
                <Card.Header>Balances</Card.Header>
                <ListGroup variant="flush">
                  {accountSummaryItems.map((accountSummaryItem: AccountSummaryListItemType) => (
                    <AccountSummaryListItem key={accountSummaryItem.account_id} {...accountSummaryItem} />
                  ))}
                </ListGroup>
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
