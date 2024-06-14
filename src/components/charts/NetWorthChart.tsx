import { Chart } from "react-google-charts";
import { PieChart } from '@mui/x-charts/PieChart';
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
  const options = {
    title: "Net Worth Summary",
    pieSliceText: "label",
    slices: 
    {0: {color: '#eedf11', offset: 0.3}, 1: {color: '#ea154a', offset: 0.7}, 2: {color: '#bac896'}, 3: {color: '#3dddf6' }, 4: {color: '#654de6'}, 5: {color: '#11EE71'}},
    is3D: true,
  };

  const columns = [
    { type: "string", id: "Type" },
    { type: "number", id: "Amount" },
    { type: "string", role: "tooltip", p: {html: true} },
  ];
  const rows = [
    ["Loans", chartLoanTotal, `Loans: -${chartLoanTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}` ],
    ["Credit", chartCreditTotal, `Credit: -${chartCreditTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`],
    ["Checking", chartCheckingTotal, `Checking: ${chartCheckingTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`],
    ["Savings", chartSavingsTotal, `Savings: ${chartSavingsTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}` ],
    ["401K", chart401KInvestmentTotal, `401K: ${chart401KInvestmentTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}` ],
    ["Investments", chartInvestmentTotal, `Investments:${chartInvestmentTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}` ],
  ];
  const columnData = [
    [
      "Element",
      "",
      { role: "style" },
      {
        sourceColumn: 0,
        role: "annotation",
        type: "string",
        calc: "stringify",
      },
    ],
    ["Loans", -chartLoanTotal, "color:#eedf11", `${chartLoanTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`],
    ["Credit", -chartCreditTotal,  "color:#ea154a",  `${chartCreditTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`],
    ["Checking", chartCheckingTotal,  "color:#bac896", `${chartCheckingTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`],
    ["Savings", chartSavingsTotal, "color:#3dddf6", `${chartSavingsTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`],
    ["401K", chart401KInvestmentTotal, "color:#654de6", `${chart401KInvestmentTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}` ],
    ["Investments", chartInvestmentTotal, "color:#11EE71",  `${chartInvestmentTotal.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}` ],
  ];
  const columnOptions={
    legend: { position: "none" },
    title: "Net Worth Summary"
  }
  const pieParams = { height: 500, width: 500};

  return (
    <div>
      <Chart
        chartType="ColumnChart"
        width="100%"
        height="400px"
        data={columnData}
        options={columnOptions}
      />
      {/* <Chart
        chartType="PieChart"
        data={[columns, ...rows]}
        options={options}
        width={"100%"}
        height={"600px"}
      /> */}
      
      <Typography variant="h5" align="center">Net Worth Summary</Typography>
      <PieChart
        margin={{ top: 100, bottom: 100, left: 100, right:200 }}
        series={[
          {
            arcLabel: (item) =>  `${item.value.toLocaleString('en-US', { style: 'currency', currency: 'USD' })}`,
            arcLabelMinAngle: 30,
            data: [
              { id: 0, value: -chartLoanTotal, label: 'Loans', color: "#eedf11" },
              { id: 1, value: -chartCreditTotal, label: 'Credit', color: "#ea154a" },
              { id: 2, value: chartCheckingTotal, label: 'Checking', color: "#bac896" },
              { id: 3, value: chartSavingsTotal, label: 'Savings', color: "#3dddf6" },
              { id: 4, value: chart401KInvestmentTotal, label: '401K', color: "#654de6" },
              { id: 5, value: chartInvestmentTotal, label: 'Investments', color: "#11EE71" },
            ],
            highlightScope: { faded: 'global', highlighted: 'item' },
            faded: { innerRadius: 30, additionalRadius: -30, color: 'gray' },
          },
        ]}
        width={700}
        height={700}
      />
    </div>
  );
};

export default NetWorthChart;