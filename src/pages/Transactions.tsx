import { Col, Row, Table } from "react-bootstrap";
import { useAppSelector } from "@/hooks/useStoreHooks";

import EmptyTransactionResult from '@/components/transactions/EmptyTransactionResult';
import FilterOptions from "@components/transactions/FilterOptions";
import { LoadingMessage } from '@/components/transactions/LoadingMessage';
import PageSizeComponent from '@/components/transactions/PageSizeComponent';
import PaginationSummaryComponent from '@/components/transactions/PaginationSummaryComponent';
import SortableHeaderRow from '@/components/transactions/SortableHeaderRow';
import { TransactionListItem } from "@components/transactions/TransactionListItem";
import TransactionPagination from "@components/transactions/TransactionPagination";
import {logTrace} from "@utils/logger";
import {formatAmount, formatCategory, formatDate} from "@utils/transactionUtils";


export const Transactions = () => {
  logTrace('Transactions.tsx');
  
  const accountItems = useAppSelector(state => state.accountSlice.accounts);
  const isLoading = useAppSelector(state => state.transactionSlice.isLoading);
  const paginationConfig = useAppSelector(state => state.transactionSlice.transactionPagination);
  const transactionItems = useAppSelector(state => 
        state.transactionSlice.pagedTransactions.pages.find(page => page.pageNumber === paginationConfig.pageNumber));
  const transactionPaginationSize = useAppSelector(state => state.userSlice.preferences.transactionItemsPerPage);
  const transactionTags = useAppSelector(state => state.userSlice.transactionTags);

  const filteringInEffect = !isLoading && 
    (!transactionItems || transactionItems.items == undefined || transactionItems.items.length === 0) && 
    ( paginationConfig.tagSearchValue.length > 0 || 
    paginationConfig.userNotesSearchValue.length > 0 ||
    paginationConfig.categorySearchValue.length > 0 ||
    paginationConfig.amountFrom !== 0 ||
    paginationConfig.amountTo !== 0 ||
    paginationConfig.startDate.length > 0 ||
    paginationConfig.endDate.length > 0 ||
    (paginationConfig.accountIds.length > 2 && paginationConfig.accountIds.split(",").length !== accountItems.filter(account => account.includeAccountTransactions).length));

  return (
    <>
      <LoadingMessage isLoading={isLoading}></LoadingMessage>
      {!isLoading && 
      <>
      {((transactionItems && transactionItems.items !== undefined && transactionItems.items.length > 0) || filteringInEffect) &&
      <Row>
        <Col xs={12}>
          <FilterOptions 
            placement="start" 
            accounts={accountItems} 
            tags={transactionTags} 
            paginationConfig={paginationConfig} 
            filteringInEffect={filteringInEffect}>
          </FilterOptions>
        </Col>
      </Row>}
      <Row>
        <Col xs={12}>
          <Table hover responsive id="transactions-table" className="transactionTableContainer">
            <SortableHeaderRow 
              currentSortBy={paginationConfig.sortBy} 
              currentSortDirection={paginationConfig.sortDirection}>
            </SortableHeaderRow>

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
                    userTags={transactionTags}
                    className="list-group-transaction-hover"
                  />
                ))}
              </tbody>}
          </Table>
        </Col>
      </Row>
      </>}

      {transactionItems && transactionItems.items.length > 0 && 
      <Row className='topMarginSpacer transactionTableContainer'>
        <TransactionPagination 
          collectionTotal={paginationConfig.total} 
          itemsPerPage={transactionPaginationSize} 
          currentPage={paginationConfig.pageNumber}>
        </TransactionPagination>
      </Row>}

      {!isLoading && (!transactionItems || transactionItems.items.length < 1) && <EmptyTransactionResult />}

      {!isLoading && 
        <Row className='topMarginSpacer transactionTableContainer'>
          <Col xs={6}>
            <PageSizeComponent pageSize={transactionPaginationSize}></PageSizeComponent>
          </Col>
          <PaginationSummaryComponent 
            currentPage={paginationConfig.pageNumber} 
            pageSize={transactionPaginationSize} 
            totalItemCount={paginationConfig.total}>
          </PaginationSummaryComponent>
        </Row>}
    </>
  );
};
