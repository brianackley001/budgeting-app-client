import { useState } from "react";
import{ Button, Card } from "react-bootstrap";
import { useAppSelector } from "@/hooks/useStoreHooks";
import NetIncomeSummaryChart from "@/components/charts/NetIncomeSummaryChart";
import {logTrace} from "@utils/logger";

export const Trends = () => {
  logTrace('Trends.tsx');
  const accountIds = useAppSelector(state => state.transactionSlice.transactionPagination.accountIds);
  const isLoading = useAppSelector(state => state.trendSlice.isLoading);

  return (
    <div className="dashboardAccountContainer">
      <Card>
        <Card.Body>
          <Card.Title>Trends</Card.Title>
          {accountIds && accountIds.length > 0 &&
            <Card.Subtitle className="mb-2 mt-4 text-muted">Net Income</Card.Subtitle>}
          {accountIds && accountIds.length < 1 &&
            <Card.Subtitle className="mb-2 mt-2 text-bold">Please Navigate to the "Accounts" page and use the "Add Account" button to link a financial account</Card.Subtitle>}
          <span className='card-text'>
            <NetIncomeSummaryChart accountIds={accountIds} isLoading={isLoading} />
          </span>
        </Card.Body>
      </Card>
    </div>
  );
};