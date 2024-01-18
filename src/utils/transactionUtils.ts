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
