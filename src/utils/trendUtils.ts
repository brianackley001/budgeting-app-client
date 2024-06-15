// Date utilities

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

const getDaysInMonth = (year, month) => new Date(year, month, 0).getDate()

const addMonths = (input, months) => {
  const date = new Date(input)
  date.setDate(1)
  date.setMonth(date.getMonth() + months)
  date.setDate(Math.min(input.getDate(), getDaysInMonth(date.getFullYear(), date.getMonth()+1)))
  return date
}
export const currentMonth = () => {
  return monthNames[new Date().getMonth()]
};
export const previousMonth = () => {
  return monthNames[addMonths(new Date(), -1).getMonth()];
}

export const getIncomeSummaryDateRange = () => {
  return {
    startDate: addMonths(new Date(), -6).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  };
};
export const getMonthlySpendingSummaryDateRange = () => {
    // Get the current date
  let currentDate = new Date();
  // Set the date to the first day of the current month
  currentDate.setDate(1);
  // Subtract a day to go back to the last day of the previous month
  currentDate.setDate(0);
  // Get the first day of the previous month
  let firstDayOfPreviousMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 1);
  return {
    startDate: new Date(firstDayOfPreviousMonth).toISOString().split('T')[0],
    endDate: new Date().toISOString().split('T')[0]
  };
};

export const mapIncomeSummaryData = (data) => {
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

export const mapMonthOverMonthSummaryData = (data) => {
  const currentMonth = new Date().getMonth() + 1;
  const segmentBoundary = [1, 4, 5, 9, 10, 14, 15, 19, 20, 24, 25, 29, 30, 31];
  const currentMonthItems = data.filter((item) => item.month === currentMonth);
  const previousMonthItems = data.filter(
    (item) => item.month === currentMonth -1
  );
  var dataSetA: number[] = [];
  var dataSetB: number[] = [];
  var runningTotalCurrentMonth = new Array();
  var runningTotalPreviousMonth = new Array();

  for (var i = 0; i < segmentBoundary.length - 1; i = i + 2) {
    dataSetA.push(
      currentMonthItems
        .filter(
          (date) =>
            date.day >= segmentBoundary[i] && date.day <= segmentBoundary[i + 1]
        )
        .map((item) => item.amount)
        .reduce((acc, spending) => acc + spending, 0)
    );
    dataSetB.push(
      previousMonthItems
        .filter(
          (date) =>
            date.day >= segmentBoundary[i] && date.day <= segmentBoundary[i + 1]
        )
        .map((item) => item.amount)
        .reduce((acc, spending) => acc + spending, 0)
    );
  }
  dataSetA.forEach((item, idx) => {
    var nextValue =  idx === 0 ? item : item ===0 ? null : item + runningTotalCurrentMonth[idx - 1];
    runningTotalCurrentMonth.push(nextValue);
  })
  dataSetB.forEach((item, idx) => {
    var nextValue =  idx === 0 ? item : item + runningTotalPreviousMonth[idx - 1];
    runningTotalPreviousMonth.push(nextValue);
  })
  console.log("mapMonthOverMonthSummaryData.runningTotalCurrentMonth: ", runningTotalCurrentMonth);
  console.log("mapMonthOverMonthSummaryData.runningTotalPreviousMonth: ", runningTotalPreviousMonth);
  return {runningTotalCurrentMonth: runningTotalCurrentMonth, runningTotalPreviousMonth: runningTotalPreviousMonth};
}