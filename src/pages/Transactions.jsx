import { Card, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {ListItem} from "../components/transactions/ListItem";

const transactionItems = [
  {
    id: "1",
    name: "Chicken Supply",
    amount: 100,
    accountId: 1,
    bankAccountName: "Account 1",
    date: "2022-01-01",
    category: "Food",
  },
  {
    id: "2",
    name: "Portage Bay Cafe",
    amount: 200,
    accountId: 2,
    bankAccountName: "Account 2",
    date: "2022-08-02",
    category: "Food",
  },
  {
    id: "3",
    name: "Red Mill Burgers",
    amount: 99.42,
    accountId: 1,
    bankAccountName: "Account 1",
    date: "2022-01-01",
    category: "Food",
  },
  {
    id: "4",
    name: "Starbucks",
    amount: 200,
    accountId: 2,
    bankAccountName: "Account 2",
    date: "2022-03-02",
    category: "Food",
  },
  {
    id: "5",
    name: "Home Depot",
    amount: 33.45,
    accountId: 1,
    bankAccountName: "Account 1",
    date: "2023-05-02",
    category: "Home Improvement",
  },
  {
    id: "6",
    name: "Costco",
    amount: 433.95,
    accountId: 1,
    bankAccountName: "Account 1",
    date: "2023-10-13",
    category: "Household Goods",
  },
  {
    id: "7",
    name: "Starbucks",
    amount: 7.99,
    accountId: 2,
    bankAccountName: "Account 2",
    date: "2023-11-02",
    category: "Food",
  },
];

export const Transactions = () => {
  return (
    <>
      {/* <div className="d-flex justify-content-around"> */}
        <Row>
          <Col xs={1}/>
          <Col xs={10}>
            <Table striped bordered hover responsive id="transactions-table">
              <thead>
                <tr>
                  <th>Merchant</th>
                  <th>Date</th>
                  <th>Amount</th>
                  <th>Category</th>
                  <th>Account</th>
                </tr>
              </thead>
              <tbody>
                {transactionItems.map((item) => (
                  <ListItem
                    key={item.id}
                    merchant={item.name}
                    date={item.date}
                    amount={item.amount}
                    category={item.category}
                    bankAccountName={item.bankAccountName}
                  />
                ))}
              </tbody>
            </Table>
          </Col>
          <Col xs={1}/>
        </Row>
      {/* </div> */}
    </>
  );
};
