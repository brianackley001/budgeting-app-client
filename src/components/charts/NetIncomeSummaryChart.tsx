import { useEffect, useState } from "react";
import { Chart } from "react-google-charts";
import { logError, logEvent } from "@utils/logger";

const NetIncomeSummaryChart = props => {
    
    const { accountIds, isLoading} = props;
    const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
    const [isLoaded, setIsLoaded] = useState(false);

    
    useEffect(() => {
        const fetchNetIncomeSummaryData = async () => {
          try {
          } catch (error) {
            console.log(error);
            logError(error as Error);
          } finally {
            setIsLoaded(true);
          }
        };
    
        if (!isLoaded) {
            fetchNetIncomeSummaryData();
        }
      }, [isLoaded, isLoading]);
    
  return (
    <div>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={[]}
        options={{}}
      />
    </div>
  );
};

export default NetIncomeSummaryChart;