export const formatAmount = (amount) => {
  return amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
};

export const formatCategory = (category) => {
  var words = category.split("_");
  for (let i = 0; i < words.length; i++) {
    words[i] = words[i][0].toUpperCase() + words[i].substr(1).toLowerCase();
  }
  return words.join(" ");
};

export const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })
};

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

export const paginationLinkSet = (currentPage: number, clickedPage: number, setCount: number, totalPageCount: number, prev: boolean, next: boolean) => {
  // Presuming 5 actionable page number link-set as maximum pagination buttons
  let paginationLinkSet: number[] = [];

  //TotalPages value is <= than setCount (5), e.g. 2,3,4,5 (UI presumes hidden/non-visible pagination control with only a single page of results)
  if(totalPageCount <= setCount) {
    for(let i = 1; i <= totalPageCount; i++) {
      paginationLinkSet.push(i);
    }
    return paginationLinkSet;
  }

  // First Page Button is clicked => return 1 through setCount pages
  if(clickedPage === 1) {
    for(let i = 1; i <= setCount; i++) {
      paginationLinkSet.push(i);
    }
    return paginationLinkSet;
  }

  // LastPage button is clicked (> 5 pages)
  if(clickedPage === totalPageCount) {
    for(let i = totalPageCount - setCount + 1; i <= totalPageCount; i++) {
      paginationLinkSet.push(i);
    }
    return paginationLinkSet;
  }

  // Clicking the "prev" button
  if (prev) {
    // PREV click lands in the initial setCount range (e.g. 1-5): 
    if(currentPage - 1 <= setCount) {
      for(let i = 1; i <= setCount; i++) {
        paginationLinkSet.push(i);
      }
      return paginationLinkSet;
    }
    else{
      let startIndex = currentPage - 3;
      for(let i = startIndex; i < startIndex + setCount; i++) {
        paginationLinkSet.push(i);
      }
      return paginationLinkSet;
    }
  }

  // Clicking the "next" button
  if (next) { 
    // Next click lands in the last setCount range before the last page:
    if(currentPage >= totalPageCount - setCount) {
      for(let i = (totalPageCount - setCount) + 1; i <= totalPageCount; i++) {
        paginationLinkSet.push(i);
      }
      return paginationLinkSet;
    }
    else{
      let startIndex = currentPage - 1;
      for(let i = startIndex; i < (startIndex + setCount); i++) {
        paginationLinkSet.push(i);
      }
      return paginationLinkSet;
    }
  }
  // LAST setCount range of pages
  if(clickedPage >= totalPageCount - setCount) {
    for(let i = totalPageCount - setCount; i <= totalPageCount; i++) {
      paginationLinkSet.push(i);
    }
    return paginationLinkSet;
  }
  // Providing a set of page numbers based on the current page number and range
  if(clickedPage > 0  && currentPage >= setCount && currentPage < (totalPageCount - setCount)) {
    let startIndex = clickedPage - Math.floor(setCount / 2);
    for(let i = startIndex; i < startIndex + setCount; i++) {
      paginationLinkSet.push(i);
    }
    return paginationLinkSet;
  }
  else if(clickedPage > 0 && currentPage <= setCount) {
    for(let i = 1; i <= setCount; i++) {
      paginationLinkSet.push(i);
    }
  }
  else{
    for(let i = currentPage; i < currentPage + setCount; i++) {
      paginationLinkSet.push(i);
    }
  }

  return paginationLinkSet;
};

