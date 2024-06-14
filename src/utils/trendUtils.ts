// Date utilities
const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate()

const addMonths = (input, months) => {
  const date = new Date(input)
  date.setDate(1)
  date.setMonth(date.getMonth() + months)
  date.setDate(Math.min(input.getDate(), getDaysInMonth(date.getFullYear(), date.getMonth()+1)))
  return date
}

export const getIncomeSummaryDateRange = () => {
  return {
    startDate: addMonths(new Date(), -6).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  };
};

export const mapIncomeSummaryData = (data) => {
  const monthNames = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec",
  ];
  //  Expectation: 6 month look-back. Therefore, group spending & income for each month into 6 groups.
  //  API collection is returned with expenses, income ordering
  let mappedData = new Array;
  let expenseIndex = 0
  let incomeIndex= 1;
  for(var i = 0; i < 7; i++){
    mappedData.push({
      month:
        monthNames[data[expenseIndex].month - 1] +
        " " +
        data[expenseIndex].year,
      incomeAmount: -data[incomeIndex].amount,
      expenseAmount: -data[expenseIndex].amount,
    });
    expenseIndex = expenseIndex + 2;
    incomeIndex = incomeIndex + 2;
  }
  console.log("mapIncomeSummaryData.mappedData: ", mappedData);
  return mappedData;
};