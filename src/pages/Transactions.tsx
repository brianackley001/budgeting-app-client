import React, { useState } from 'react';
import { Col, Row, Table } from "react-bootstrap";

import { useAppSelector } from "@hooks/storeHooks";
import { useAcquireAccessToken } from "@hooks/useAcquireAccessToken.js";

import SortableHeaderRow from '@/components/transactions/SortableHeaderRow';
import { TransactionListItem } from "@components/transactions/TransactionListItem";
import TransactionPagination from "@components/transactions/TransactionPagination";
import PageSizeComponent from '@/components/transactions/PageSizeComponent';
import PaginationSummaryComponent from '@/components/transactions/PaginationSummaryComponent';
import EmptyTransactionResult from '@/components/transactions/EmptyTransactionResult';
import { LoadingMessage } from '@/components/transactions/LoadingMessage';


export const Transactions = () => {
  useAcquireAccessToken();
  const isLoading = useAppSelector(state => state.transactionSlice.isLoading);
  const paginationConfig = useAppSelector(state => state.transactionSlice.transactionPagination);
  const transactionItems = useAppSelector(state => 
    state.transactionSlice.pagedTransactions.pages.find(page => page.pageNumber === paginationConfig.pageNumber));

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
    return new Date(date).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })
  };


  return (
    <>
      <LoadingMessage isLoading={isLoading}></LoadingMessage>
      <Row>
        <Col xs={12}>
          <Table hover responsive id="transactions-table" className="transactionTableContainer">
            <SortableHeaderRow></SortableHeaderRow>

            {transactionItems !== undefined && transactionItems.items && transactionItems.items.length > 0 &&
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
              </tbody>}
          </Table>
        </Col>
      </Row>
      {transactionItems && transactionItems.items.length > 0 && <Row className='topMarginSpacer transactionTableContainer'>
        <TransactionPagination collectionTotal={paginationConfig.total} itemsPerPage={paginationConfig.pageSize} currentPage={paginationConfig.pageNumber}></TransactionPagination>
      </Row>}

      {!transactionItems || transactionItems.items.length < 1 && <EmptyTransactionResult></EmptyTransactionResult>}

      <Row className='topMarginSpacer transactionTableContainer'>
        <Col xs={6}>
          <PageSizeComponent pageSize={paginationConfig.pageSize}></PageSizeComponent>
        </Col>
        <PaginationSummaryComponent currentPage={paginationConfig.pageNumber} pageSize={paginationConfig.pageSize} totalItemCount={paginationConfig.total}></PaginationSummaryComponent>
      </Row>
    </>
  );
};
