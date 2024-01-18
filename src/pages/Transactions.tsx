import { Card, Row, Col } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {TransactionListItem} from "../components/transactions/TransactionListItem";
import tData from '../__tests__/stubs/transactions.json'
import uaData from '../__tests__/stubs/userAccounts.json'
import SortableHeader from "../components/transactions/SortableHeader";


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
          <Col xs={12}>
            <Table  hover responsive id="transactions-table" className="transactionTableContainer">
              <thead>
                <tr>
                  <th>Date <SortableHeader sortBy={"date"}></SortableHeader></th>
                  <th>Merchant <SortableHeader sortBy={"merchant"}></SortableHeader></th>
                  <th>Amount <SortableHeader sortBy={"amount"}></SortableHeader></th>
                  <th>Category <SortableHeader sortBy={"category"}></SortableHeader></th>
                </tr>
              </thead>
              <tbody>
                {tData.map((item) => (
                  <TransactionListItem
                    key={item.id}
                    merchant={item.merchantName}
                    name={item.name}
                    date={formatDate(item.date)}
                    amount={formatAmount(item.amount)}
                    category={formatCategory(item.personalFinanceCategory.detailed)}
                    bankAccountName={item.accountName}
                    accountId={item.accountId}
                    transactionId={item.id}
                    userNotes={item.userNotes === null ? "" : item.userNotes}
                    tags={item.tags === null ? [] : item.tags}
                    userDescription={item.userDescription === null ? "" : item.userDescription}
                    className="list-group-transaction-hover"
                  />
                ))}
              </tbody>
            </Table>
          </Col>
        </Row>
    </>
  );
};
