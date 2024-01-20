import { describe, it, expect } from "vitest";
import { paginationLinkSet } from "./transactionUtils";

describe ("paginationLinkSet", () => {
//paginationLinkSet = (currentPage: number, clickedPage: number, setCount: number, totalPageCount: number, prev: boolean, next: boolean) 
  test.each([
    { currentPage: 1, clickedPage: -1, setCount:5, totalPageCount:1, prev:false, next:false, expected: [1] },
    { currentPage: 1, clickedPage: -1, setCount:5, totalPageCount:2, prev:false, next:false, expected: [1,2] },
    { currentPage: 1, clickedPage: -1, setCount:5, totalPageCount:3, prev:false, next:false, expected: [1,2,3] },
    { currentPage: 1, clickedPage: -1, setCount:5, totalPageCount:4, prev:false, next:false, expected: [1,2,3,4] },
    { currentPage: 1, clickedPage: -1, setCount:5, totalPageCount:5, prev:false, next:false, expected: [1,2,3,4,5] },
  ])('returns $totalPageCount items in collection for $totalPageCount page of results: paginationLinkSet($currentPage, $clickedPage, $setCount, $totalPageCount, $prev, $next) -> $expected', ({ currentPage, clickedPage, setCount, totalPageCount, prev, next, expected }) => {
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
  
  it ("PREV button", () => {
    // Arrange
    let sut = paginationLinkSet;
    let expected = [4,5,6,7,8];

    // Act
    let result = sut (7,-1,5,15, true, false);

    //Assert
    expect(result).toEqual(expected);
  });
  
  //NEXT paginationLinkSet = (currentPage: number, clickedPage: number, setCount: number, totalPageCount: number, prev: boolean, next: boolean) 
  test.each([
    { currentPage: 5, clickedPage: -1, setCount:5, totalPageCount:15, prev:false, next:true, expected: [4,5,6,7,8]},
    { currentPage: 7, clickedPage: -1, setCount:5, totalPageCount:30, prev:false, next:true, expected: [6,7,8,9,10]},
    { currentPage: 12, clickedPage: -1, setCount:5, totalPageCount:25, prev:false, next:true, expected: [11,12,13,14,15]},
    { currentPage: 10, clickedPage: -1, setCount:5, totalPageCount:15, prev:false, next:true, expected: [11,12,13,14,15]},
  ])('Next Button: paginationLinkSet($currentPage, $clickedPage, $setCount, $totalPageCount, $prev, $next) -> $expected', ({ currentPage, clickedPage, setCount, totalPageCount, prev, next, expected }) => {
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
  ])('Prev Button: paginationLinkSet($currentPage, $clickedPage, $setCount, $totalPageCount, $prev, $next) -> $expected', ({ currentPage, clickedPage, setCount, totalPageCount, prev, next, expected }) => {
    // Arrange
    let sut = paginationLinkSet;
    
    // Act
    let result = sut (currentPage, clickedPage, setCount, totalPageCount, prev, next);

    expect(result).toEqual(expected);
  })
}); 