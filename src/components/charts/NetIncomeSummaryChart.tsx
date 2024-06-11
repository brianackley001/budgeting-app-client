import { useEffect, useState } from "react";
import { useAppDispatch, useAppSelector } from "@hooks/useStoreHooks";
import { Chart } from "react-google-charts";
import { getIncomeSummaryDateRange, mapIncomeSummaryData } from "@utils/trendUtils";
import { getNetIncomeSummary } from "@store/trendSlice";
import { logError, logEvent } from "@utils/logger";

const NetIncomeSummaryChart = props => {
    
    const { accountIds, isLoading} = props;
    const dispatch = useAppDispatch();
    const chartData = useAppSelector((state) => state.trendSlice.netIncomeSummary);
    const {startDate, endDate} =  getIncomeSummaryDateRange();
    const [isLoaded, setIsLoaded] = useState(false);
    const [formattedChartData, setFormattedChartData] = useState([]);
    const chartOptions = {
        title: "Net Income Summary",
        subtitle: 'Income and Expenses',
    }
    const columns = [
      { type: "string", id: "Date" },
      { type: "number", id: "Amount" },
      { type: "string", role: "style"},
    ];
    const columnOptions={
      legend: { position: 'top', maxLines: 3 },
      bar: { groupWidth: '30px' },
      title: "Net Worth Summary"
    }

    
    useEffect(() => {
        const fetchNetIncomeSummaryData = async () => {
          try {
            logEvent("NetIncomeSummaryChart: fetchNetIncomeSummaryData", {startDate: startDate, endDate: endDate});
            dispatch(getNetIncomeSummary(accountIds, startDate, endDate));
          } catch (error) {
            console.log(error);
            logError(error as Error);
          } finally {
            setIsLoaded(true);
          }
        };
    
        if (!isLoaded) {
            fetchNetIncomeSummaryData();
            const mappedData = mapIncomeSummaryData(chartData);
            setFormattedChartData(mappedData);
        }
      }, [isLoaded, isLoading]);
    
  return (
    <div>
      {/* {formattedChartData && formattedChartData.length > 0 &&  */}
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="700px"
        data={[columns, ...formattedChartData]}
        options={{columnOptions}}
      />
    </div>
  );
};

export default NetIncomeSummaryChart;