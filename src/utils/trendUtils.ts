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
  const mappedData = data.map((item) => {
    return [
      monthNames[item.month - 1] + " " + item.year,
      item.amount,
      item.amount > 0 ? "#09C057" : "#F94C6B",
    ];
  });
  console.log("mappedData", mappedData);
  return mappedData;
};