import{ Card, Row, Col } from "react-bootstrap";
import ListGroup from 'react-bootstrap/ListGroup';
import AccountListItem from "../components/accounts/AccountListItem.tsx";
import AccountSummaryListItem from "../components/accounts/AccountSummaryListItem.tsx";
import { AccountListItemType } from "../types/accountListItem.ts";
import { AccountSummaryListItemType} from "../types/accountSummaryListItem.ts";
import {logTrace} from "@utils/logger";

export const Settings = () => {
  logTrace('Settings.tsx');
  // const accountListItem: AccountListItemType = { 
  //   accountId: "lv5KvMeBlgTmRMMjPgz9Sbr5QmDxKXcpzo5Dp",
  //   balances: {
  //       available: 100,
  //       current: 110,
  //       iso_currency_code: "USD",
  //       limit: null,
  //       unofficial_currency_code: null
  //   },
  //   mask: "0000",
  //   name: "Plaid Checking",
  //   official_name: "Plaid Gold Standard 0% Interest Checking",
  //   subtype: "checking",
  //   type: "depository",
  //   includeInTransactions: true,
  // };
  let a: AccountSummaryListItemType = {
    institutionId: "ins_1234",
    itemId: "item_1234",
    institutionName: "Plaid Bank",
    accountId: "XXXXXXXXvMeBlgTmRMMjPgz9Sbr5QmDxKXcpzo5Dp",
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
    institutionId: "ins_44555",
    itemId: "item_7734",
    institutionName: "Other Bank",
    accountId: "12121212MeBlgTmRMMjPgz9Sbr5QmDxKXcpzo5Dp",
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
    institutionId: "ins_6545",
    itemId: "item_1255",
    institutionName: "Random Bank",
    accountId: "ZasDsaMeBlgTmRMMjPgz9Sbr5QmDxKXcpzo5Dp",
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
                  {/* <AccountListItem {...accountListItem} /> */}
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
                {/* <ListGroup variant="flush">
                  {accountSummaryItems.map((accountSummaryItem: AccountSummaryListItemType) => (
                    <AccountSummaryListItem key={accountSummaryItem.accountId} {...accountSummaryItem} />
                  ))}
                </ListGroup> */}
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
