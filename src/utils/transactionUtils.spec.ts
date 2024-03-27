import { describe, it, expect } from "vitest";
import { formatAmount, formatCategory, formatDate, formatMerchantDisplayName, paginationLinkSet } from "./transactionUtils";

describe ("transactionUtils", () => {
  describe ("paginationLinkSet", () => {
    test.each([
      { currentPage: 1, clickedPage: -1, setCount:5, totalPageCount:1, prev:false, next:false, expected: [1] },
      { currentPage: 1, clickedPage: -1, setCount:5, totalPageCount:2, prev:false, next:false, expected: [1,2] },
      { currentPage: 1, clickedPage: -1, setCount:5, totalPageCount:3, prev:false, next:false, expected: [1,2,3] },
      { currentPage: 1, clickedPage: -1, setCount:5, totalPageCount:4, prev:false, next:false, expected: [1,2,3,4] },
      { currentPage: 1, clickedPage: -1, setCount:5, totalPageCount:5, prev:false, next:false, expected: [1,2,3,4,5] },
    ])('returns $totalPageCount items in collection for $totalPageCount page of results: paginationLinkSet($currentPage, $clickedPage, $setCount, $totalPageCount, $prev, $next) -> $expected', (
      { currentPage, clickedPage, setCount, totalPageCount, prev, next, expected }) => {
      // Arrange
      let sut = paginationLinkSet;
      
      // Act
      let result = sut (currentPage, clickedPage, setCount, totalPageCount, prev, next);
      expect(result).toEqual(expected)
    })
  
    
    it ("returns first 5 pages when FirstPage button is clicked", () => {
      // Arrange
      let sut = paginationLinkSet;
  
      // Act
      let result = sut (11, 1, 5, 11, false, false);
  
      //Assert
      expect (result[0]).toBe(1);
      expect (result.length).toBe(5);
    });
    
    it ("returns last 5 pages when LastPage button is clicked", () => {
      // Arrange
      let sut = paginationLinkSet;
  
      // Act
      let result = sut (5, 11, 5, 11, false, false);
  
      //Assert
      expect (result[0]).toBe(7);
      expect (result.length).toBe(5);
    });
    
    
    //NEXT paginationLinkSet = (currentPage: number, clickedPage: number, setCount: number, totalPageCount: number, prev: boolean, next: boolean) 
    test.each([
      { currentPage: 5, clickedPage: -1, setCount:5, totalPageCount:15, prev:false, next:true, expected: [4,5,6,7,8]},
      { currentPage: 7, clickedPage: -1, setCount:5, totalPageCount:30, prev:false, next:true, expected: [6,7,8,9,10]},
      { currentPage: 12, clickedPage: -1, setCount:5, totalPageCount:25, prev:false, next:true, expected: [11,12,13,14,15]},
      { currentPage: 10, clickedPage: -1, setCount:5, totalPageCount:15, prev:false, next:true, expected: [11,12,13,14,15]},
    ])('Next Button: paginationLinkSet($currentPage, $clickedPage, $setCount, $totalPageCount, $prev, $next) -> $expected', (
      { currentPage, clickedPage, setCount, totalPageCount, prev, next, expected }) => {
      // Arrange
      let sut = paginationLinkSet;
      
      // Act
      let result = sut (currentPage, clickedPage, setCount, totalPageCount, prev, next);
  
      expect(result).toEqual(expected);
    });
    //PREV paginationLinkSet = (currentPage: number, clickedPage: number, setCount: number, totalPageCount: number, prev: boolean, next: boolean) 
    test.each([
      { currentPage: 6, clickedPage: -1, setCount:5, totalPageCount:15, prev:true, next:false, expected: [1,2,3,4,5]},
      { currentPage: 7, clickedPage: -1, setCount:5, totalPageCount:30, prev:true, next:false, expected: [4,5,6,7,8]},
      { currentPage: 12, clickedPage: -1, setCount:5, totalPageCount:25, prev:true, next:false, expected: [9,10,11,12,13]},
      { currentPage: 100, clickedPage: -1, setCount:5, totalPageCount:105, prev:true, next:false, expected: [97,98,99,100,101]},
    ])('Prev Button: paginationLinkSet($currentPage, $clickedPage, $setCount, $totalPageCount, $prev, $next) -> $expected', (
      { currentPage, clickedPage, setCount, totalPageCount, prev, next, expected }) => {
      // Arrange
      let sut = paginationLinkSet;
      
      // Act
      let result = sut (currentPage, clickedPage, setCount, totalPageCount, prev, next);
  
      expect(result).toEqual(expected);
    })
  }); 
  describe("formatAmount", () => {
    // amount.toLocaleString('en-US', { style: 'currency', currency: 'USD' })
    test.each([
      { value: 1000, expected: "$1,000.00" },
      { value: 21, expected: "$21.00" },
      { value: 1000001, expected: "$1,000,001.00" },
      { value: -11, expected: "-$11.00" },
      { value: -7890, expected: "-$7,890.00" },
      { value: -2888666234.99, expected: "-$2,888,666,234.99" },
    ])("formats $value -> $expected", ({ value, expected }) => {
      // Arrange
      let sut = formatAmount;

      // Act
      let result = sut(value);

      //Assert
      expect(result).toBe(expected);
    });
  });

  describe("formatCategory", () => {
    test.each([
      { value: "personal_finance", expected: "Personal Finance" },
      { value: "personal_finance_category", expected: "Personal Finance Category" },
      { value: "personal_finance_category_detailed", expected: "Personal Finance Category Detailed" },
      { value: "personal_finance_category_detailed_subcategory", expected: "Personal Finance Category Detailed Subcategory" },
      { value: "personal_finance_category_detailed_subcategory_item", expected: "Personal Finance Category Detailed Subcategory Item" },
    ])("formats $value -> $expected", ({ value, expected }) => {
      // Arrange
      let sut = formatCategory;

      // Act
      let result = sut(value);

      //Assert
      expect(result).toBe(expected);
    });
  });

  describe.skip("formatDate", () => {
    // Date(date).toLocaleDateString('en-us', { year: "numeric", month: "short", day: "numeric" })
    test.each([
      { value: new Date("2021-12-31 20:15:30 GMT-8:00"), expected: "Dec 31, 2021" },
      { value: new Date("2021-01-01 20:15:30 GMT-8:00"), expected: "Jan 1, 2021" },
      { value: new Date("2021-06-15 20:15:30 GMT-8:00"), expected: "Jun 15, 2021" },
      { value: new Date("2021-09-30 20:15:30 GMT-8:00"), expected: "Sep 30, 2021" },
    ])("formats $value -> $expected", ({ value, expected }) => {
      // Arrange
      let sut = formatDate;

      // Act
      let result = sut(value);

      //Assert
      expect(result).toBe(expected);
    });
  });

  describe("formatMerchantDisplayName", () => {
    test.each([
      { merchantName: "Starbucks", itemName: "Coffee", expected: "(Starbucks) Coffee" },
      { merchantName: "", itemName: "Venmo", expected: "Venmo" },
      { merchantName: "Duck", itemName: "", expected: "(Duck)" },
    ])("formats $merchantName, $itemName -> $expected", ({ merchantName, itemName, expected }) => {
      // Arrange
      let sut = formatMerchantDisplayName;

      // Act
      let result = sut(merchantName, itemName);

      //Assert
      expect(result).toBe(expected);
    });
  });
});
