import { useState } from "react";
import { Card, Tab, Tabs } from "react-bootstrap";
import { useAppSelector } from "@/hooks/useStoreHooks";
import NetIncomeSummaryChart from "@/components/charts/NetIncomeSummaryChart";
import MonthOverMonthSummaryChart from "@/components/charts/MonthOverMonthSummaryChart";
import { logTrace } from "@utils/logger";

export const Trends = () => {
  logTrace("Trends.tsx");
  const accountIds = useAppSelector(
    (state) => state.transactionSlice.transactionPagination.accountIds
  );
  const isLoading = useAppSelector((state) => state.trendSlice.isLoading);
  const [tabKey, setTabKey] = useState("netIncomeSummaryChart");

  return (
    <div className="dashboardAccountContainer">
      <Card>
        <Card.Body>
          <Card.Title>Trends</Card.Title>
          {accountIds && accountIds.length < 1 && (
            <Card.Subtitle className="mb-2 mt-2 text-bold">
              Please Navigate to the "Accounts" page and use the "Add Account"
              button to link a financial account
            </Card.Subtitle>
          )}
          <span className="card-text">
            <Tabs
              id="trend-reporting-tabs"
              activeKey={tabKey}
              onSelect={(k: string | null) => setTabKey(k!)}
              className="mb-3"
            >
              <Tab eventKey="netIncomeSummaryChart" title="Income and Expenses">
                <NetIncomeSummaryChart
                  accountIds={accountIds}
                  isLoading={isLoading}
                />
              </Tab>
              <Tab  eventKey="monthOverMonthSummaryChart" title="Monthly Expenses">
                <MonthOverMonthSummaryChart
                  accountIds={accountIds}
                  isLoading={isLoading}
                />
              </Tab>
            </Tabs>
          </span>
        </Card.Body>
      </Card>
    </div>
  );
};
