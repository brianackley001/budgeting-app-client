import { Chart } from "react-google-charts";


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

  return (
    <div>
      <Chart
      chartType="PieChart"
      data={[columns, ...rows]}
      options={options}
      width={"100%"}
      height={"600px"}
    />
    </div>
  );
};

// slices: {0: {color: 'black'}, 3: {color: 'red'}}

export default NetWorthChart;