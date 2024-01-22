import React , { useState } from 'react';
import { Card, Col, Pagination, Row } from "react-bootstrap";
import Table from "react-bootstrap/Table";
import {TransactionListItem} from "@components/transactions/TransactionListItem";
import { useAppSelector} from "@hooks/storeHooks";
import { useAcquireAccessToken } from "@hooks/useAcquireAccessToken.js";
import SortableHeader from "@components/transactions/SortableHeader";
import TransactionPagination from "@components/transactions/TransactionPagination";
import PageSizeComponent from '@/components/transactions/PageSizeComponent';
import PaginationSummaryComponent from '@/components/transactions/PaginationSummaryComponent';


export const  Transactions = () =>{
  useAcquireAccessToken();
  const paginationConfig = useAppSelector(state => state.transactionSlice.transactionPagination);
  const startRecord = ((paginationConfig.pageNumber) - 1 * (paginationConfig.pageSize)) + 1;
  const endRecord = startRecord + paginationConfig.pageSize;
  const totalItems = paginationConfig.total;
  const transactionItems = useAppSelector(state => state.transactionSlice.pagedTransactions.pages[paginationConfig.pageNumber - 1]);

  const formatAmount = (amount) => {
    return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
  };
  const formatCategory = (category) => {  
    var words = category.split("_");
    for (let i = 0; i < words.length; i++) {
      words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
  }
    return words.join(" ");
  };
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-us', {  year:"numeric", month:"short", day:"numeric"})
  };


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
                {transactionItems.items.map((item) => (
                  <TransactionListItem
                    key={item.id}
                    merchantName={item.merchantName}
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
        <Row className='topMarginSpacer transactionTableContainer'>
          <TransactionPagination collectionTotal={paginationConfig.total} itemsPerPage={paginationConfig.pageSize} currentPage={paginationConfig.pageNumber}></TransactionPagination>
        </Row>
        <Row  className='topMarginSpacer transactionTableContainer'>
          <Col xs={6}>
        <PageSizeComponent pageSize={paginationConfig.pageSize}></PageSizeComponent>
        </Col>
        <PaginationSummaryComponent currentPage={paginationConfig.pageNumber} pageSize={paginationConfig.pageSize} totalItemCount={paginationConfig.total}></PaginationSummaryComponent>
        {/* <Col xs={6}>
          <i>Showing {startRecord}-{endRecord} of {totalItems}</i>
        </Col> */}
        </Row>
    </>
  );
};
