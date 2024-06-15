import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';
import { getIncomeSummaryDateRange, mapIncomeSummaryData } from "@utils/trendUtils";
import { getNetIncomeSummary } from "@store/trendSlice";
import { logError, logEvent } from "@utils/logger";

const NetIncomeSummaryChart = props => {
    const { accountIds, isLoading} = props;
    const dispatch = useAppDispatch();
    const chartData = useAppSelector((state) => state.trendSlice.netIncomeSummary);
    const {startDate, endDate} =  getIncomeSummaryDateRange();
    const [formattedChartData, setFormattedChartData] = useState(new Array);
    const valueFormatter = (value: number | null) => `${value!.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;

    
    useEffect(() => {
        const fetchNetIncomeSummaryData = async () => {
          try {
            logEvent("NetIncomeSummaryChart: fetchNetIncomeSummaryData", {startDate: startDate, endDate: endDate});
            dispatch(getNetIncomeSummary(accountIds, startDate, endDate));
          } catch (error) {
            console.log(error);
            logError(error as Error);
          } 
        };
    
        if (!chartData || chartData.length < 1) {
          console.log(`chartData is empty: ${JSON.stringify(chartData)}`);
          console.log(`chartData length: ${chartData.length}`);
            fetchNetIncomeSummaryData();
        }
        const mappedData = mapIncomeSummaryData(chartData);
        setFormattedChartData(mappedData);
      }, [chartData]);
    
  return (
    <div>
      <Typography variant="h5" align="center">
        Monthly Spending and Income
      </Typography>
      
      {formattedChartData && formattedChartData.length > 0 &&
      <BarChart
        dataset={formattedChartData}
        series={[
          { dataKey: 'incomeAmount', label: 'Income', valueFormatter },
          { dataKey: 'expenseAmount', label: 'Spending', valueFormatter },
        ]}
        xAxis={[{ scaleType: "band", dataKey: "month",  tickLabelPlacement: "middle", tickPlacement: "middle" }]}
        width={700}
        height={700}
        grid={{ horizontal: true }}
        borderRadius={12}
        margin={{
          top: 40,
          bottom: 40,
          left: 100,
        }}
      />}
    </div>
  );
};

export default NetIncomeSummaryChart;