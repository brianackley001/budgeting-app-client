export const formatMerchantDisplayName = (merchantName, itemName) => {
  let displayValue = "";
  if(merchantName && merchantName !== undefined && itemName && itemName !== undefined && merchantName !== itemName) {
    displayValue = `(${merchantName}) ${itemName}`;
  }
  else if (merchantName && merchantName !== undefined && (!itemName || itemName === undefined)) {
    displayValue = `(${merchantName})`;
  }
  else{
    displayValue = itemName;
  }
  return displayValue;
};

export const nextPageClickHandler = (page, setPage, totalPage) => {
  if (page < totalPage) {
    setPage(page + 1);
  }
};

export const previousPageClickHandler = (page, setPage) => {
  if (page > 1) {
    setPage(page - 1);
  }
};
