import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { LineChart } from "@mui/x-charts/LineChart";
import Typography from "@mui/material/Typography";
import {
  getMonthlySpendingSummaryDateRange,
  mapMonthOverMonthSummaryData,
  currentMonth,
  previousMonth
} from "@utils/trendUtils";
import { getMonthOverMonthSummary } from "@store/trendSlice";
import { logError, logEvent } from "@utils/logger";

const MonthOverMonthSummaryChart = (props) => {
  const { accountIds, isLoading } = props;
  const dispatch = useAppDispatch();
  const chartData = useAppSelector(
    (state) => state.trendSlice.monthOverMonthSummary
  );
  const { startDate, endDate } = getMonthlySpendingSummaryDateRange();
  const [formattedCurrentMonthChartData, setFormattedCurrentMonthChartData] =
    useState(new Array());
  const [formattedPreviousMonthChartData, setFormattedPreviousMonthChartData] =
    useState(new Array());
    const previousMonthName = previousMonth();
    const currentMonthName = currentMonth();

  const xLabels = ["1", "5", "10", "15", "20", "25", "30"];
  const currencyFormatter = new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
  }).format;
  
  useEffect(() => {
    const fetchMonthOverMonthSummaryData = async () => {
      try {
        logEvent("MonthOverMonthSummaryChart: fetchNetIncomeSummaryData", {
          startDate: startDate,
          endDate: endDate,
        });
        dispatch(getMonthOverMonthSummary(accountIds, startDate, endDate));
      } catch (error) {
        console.log(error);
        logError(error as Error);
      }
    };

    const mapData = async() =>{
      const mappedData = mapMonthOverMonthSummaryData(chartData);
      setFormattedCurrentMonthChartData(mappedData.runningTotalCurrentMonth);
      setFormattedPreviousMonthChartData(mappedData.runningTotalPreviousMonth);
    }

    if (!chartData || chartData.length == 0) {
      fetchMonthOverMonthSummaryData();
    }

    if(chartData && chartData.length > 0 && formattedPreviousMonthChartData.length < 1){
      mapData();
    }

  }, [chartData, formattedPreviousMonthChartData, formattedCurrentMonthChartData]);

  return (
    <div>
      {/* {formattedChartData && formattedChartData.length > 0 &&  */}
      <Typography variant="h5" align="center">
        Spending
      </Typography>
      {formattedCurrentMonthChartData &&
        formattedCurrentMonthChartData.length > 0 &&
        formattedPreviousMonthChartData &&
        formattedPreviousMonthChartData.length > 0 && (
          <LineChart
            width={500}
            height={300}
            series={[
              {
                data: formattedPreviousMonthChartData,
                label: previousMonthName,
                color: 'gray',
                valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
              },
              { data: formattedCurrentMonthChartData, 
                label: currentMonthName,
                valueFormatter: (v) => (v === null ? '' : currencyFormatter(v)),
            },
            ]}
            xAxis={[{ scaleType: "point", data: xLabels }]}
          />
        )}
    </div>
  );
};

export default MonthOverMonthSummaryChart;
