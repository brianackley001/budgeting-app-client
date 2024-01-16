import { Card, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {TransactionListItem} from "../components/transactions/TransactionListItem";
import tData from '../__tests__/stubs/transactions.json'
import uaData from '../__tests__/stubs/userAccounts.json'


export const Transactions = () => {
  let dataSet = tData.map((item) => {
    let accountName = uaData.find((ua) => ua.accountId === item.accountId)?.name;
    item.accountName = accountName;
    return item;
  });

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', {  year:"numeric", month:"short", day:"numeric"})
  };
  const formatAmount = (amount) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  };
  const formatCategory = (category) => {  
    var words = category.split("_");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
  }
    return words.join(" ");
  }


  return (
    <>
        <Row>
          <Col xs={1}/>
          <Col xs={10}>
            <Table  hover responsive id="transactions-table">
              <thead>
                <tr>
                  <th>Date</th>
                  <th>Merchant</th>
                  <th>Amount</th>
                  <th>Category</th>
                </tr>
              </thead>
              <tbody>
                {tData.map((item) => (
                  <TransactionListItem
                    key={item.id}
                    merchant={item.name}
                    date={formatDate(item.date)}
                    amount={formatAmount(item.amount)}
                    category={formatCategory(item.personalFinanceCategory.detailed)}
                    bankAccountName={item.accountName}
                    className="list-group-transaction-hover"
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
