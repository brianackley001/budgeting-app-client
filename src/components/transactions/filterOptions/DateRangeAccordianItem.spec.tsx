import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { describe, expect } from "vitest";
import DateRangeAccordianItem from './DateRangeAccordianItem'


describe('DateRangeAccordianItem', async() => {
  test("Presents expected start date placeholder text", () => {
    // Arrange
    render(<DateRangeAccordianItem  eventKey="date-range-accordian-item" 
      onSelect={() => {}} 
      trackedStartDate="" 
      trackedEndDate="" /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByPlaceholderText("Start Date")).toBeInTheDocument();
    //screen.debug();
  });
  test("Presents expected end date placeholder text", () => {
    // Arrange
    render(<DateRangeAccordianItem  eventKey="date-range-accordian-item" 
      onSelect={() => {}} 
      trackedStartDate="" 
      trackedEndDate="" /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByPlaceholderText("End Date")).toBeInTheDocument();
    //screen.debug();
  });
  test("Start date value displays expected trackedStartDate", () => {
    // Arrange
    render(<DateRangeAccordianItem  eventKey="date-range-accordian-item" 
      onSelect={() => {}} 
      trackedStartDate="2021-01-01" 
      trackedEndDate="" /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByTestId("date-range-accordian-item-start-date")).toHaveValue("2021-01-01");
    //screen.debug();
  });
  test("End date value displays expected trackedEndDate", () => {
    // Arrange
    render(<DateRangeAccordianItem  eventKey="date-range-accordian-item" 
      onSelect={() => {}} 
      trackedStartDate="" 
      trackedEndDate="2021-01-01" /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByTestId("date-range-accordian-item-end-date")).toHaveValue("2021-01-01");
    //screen.debug();
  });

});