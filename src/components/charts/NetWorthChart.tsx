import { PieChart } from '@mui/x-charts/PieChart';
import { BarChart } from '@mui/x-charts/BarChart';
import Typography from '@mui/material/Typography';


const NetWorthChart = props => {
  
  const { accountItems} = props;
  

  const chartCheckingTotal = accountItems?.length > 0 ? accountItems
  .filter((item) => (item.type === 'depository' && item.subtype === 'checking'))
  .reduce((a, item) => a + item.balances.current, 0) : 0;
  const chartSavingsTotal = accountItems?.length > 0 ? accountItems
  .filter((item) => (item.type === 'depository' && (item.subtype === 'savings' || item.subtype === 'cash management')))
  .reduce((a, item) => a + item.balances.current, 0) : 0;
  const chartCreditTotal = accountItems?.length > 0 ? accountItems
  .filter((item) => (item.type === 'credit'))
  .reduce((a, item) => a + item.balances.current, 0) : 0;
  const chartLoanTotal = accountItems?.length > 0 ? accountItems
  .filter((item) => (item.type === 'loan'))
  .reduce((a, item) => a + item.balances.current, 0) : 0;
  const chart401KInvestmentTotal = accountItems?.length > 0 ? accountItems
  .filter((item) => (item.type === 'investment' &&  (item.subtype === '401k' || item.subtype === 'roth 401k')))
  .reduce((a, item) => a + item.balances.current, 0) : 0;
  const chartInvestmentTotal = accountItems?.length > 0 ? accountItems
  .filter((item) => (item.type === 'investment' &&  (item.subtype === 'stock plan' || item.subtype === 'brokerage' || item.subtype === 'ira')))
  .reduce((a, item) => a + item.balances.current, 0) : 0;
  
const valueFormatter = (value: number | null) => `${value!.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`;
const dataset = [
  {
    amount: -chartLoanTotal,
    type: 'Loans',
  },
  {
    amount: -chartCreditTotal,
    type: 'Credit',
  },
  {
    amount: chartCheckingTotal,
    type: 'Checking',
  },
  {
    amount: chartSavingsTotal,
    type: 'Savings',
  },
  {
    amount: chart401KInvestmentTotal,
    type: '401K',
  },
  {
    amount: chartInvestmentTotal,
    type: 'Investments',
  },
];
  return (
    <div>

      <Typography variant="h5" align="center">
        Net Worth Summary
      </Typography>
      <BarChart
        dataset={dataset}
        slots={{
          legend: () => null,
        }}
        xAxis={[{ scaleType: "band", dataKey: "type" }]}
        yAxis={[
          {
            colorMap: {
              type: "continuous",
              min: -10,
              max: 1,
              color: ["red", "green"],
            },
          },
        ]}
        borderRadius={8}
        series={[
          {
            data: [
              -chartLoanTotal,
              -chartCreditTotal,
              chartCheckingTotal,
              chartSavingsTotal,
              chart401KInvestmentTotal,
              chartInvestmentTotal,
            ],
            label: "Amount",
            valueFormatter: valueFormatter,
          },
        ]}
        width={700}
        height={700}
        margin={{
          top: 40,
          bottom: 40,
          left: 100,
        }}
        grid={{ horizontal: true }}
      />
      <PieChart
        margin={{ top: 100, bottom: 100, left: 100, right: 200 }}
        series={[
          {
            arcLabel: (item) =>
              `${item.value.toLocaleString("en-US", {
                style: "currency",
                currency: "USD",
              })}`,
            arcLabelMinAngle: 30,
            data: [
              {
                id: 0,
                value: -chartLoanTotal,
                label: "Loans",
                color: "#eedf11",
              },
              {
                id: 1,
                value: -chartCreditTotal,
                label: "Credit",
                color: "#ea154a",
              },
              {
                id: 2,
                value: chartCheckingTotal,
                label: "Checking",
                color: "#bac896",
              },
              {
                id: 3,
                value: chartSavingsTotal,
                label: "Savings",
                color: "#3dddf6",
              },
              {
                id: 4,
                value: chart401KInvestmentTotal,
                label: "401K",
                color: "#654de6",
              },
              {
                id: 5,
                value: chartInvestmentTotal,
                label: "Investments",
                color: "#11EE71",
              },
            ],
            highlightScope: { faded: "global", highlighted: "item" },
            faded: { innerRadius: 30, additionalRadius: -30, color: "gray" },
          },
        ]}
        width={700}
        height={700}
      />
    </div>
  );
};

export default NetWorthChart;