import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { describe, expect } from "vitest";
import CategoryAccordionItem from './CategoryAccordionItem';

describe('CategoryAccordionItem', async() => {
  const eventKey = "category-accordion-item";
  const taxonomyItems = [
    {primary: "INCOME", detailed: "INCOME_WAGES", description: "Test"},
    {primary: "INCOME", detailed: "INCOME_INTEREST", description: "Test"},
    {primary: "INCOME", detailed: "INCOME_DIVIDENDS", description: "Test"},
    {primary: "INCOME", detailed: "INCOME_OTHER", description: "Test"},
    {primary: "FOOD_AND_DRINK", detailed: "FOOD_AND_DRINK_COFFEE", description: "Test"},
    {primary: "FOOD_AND_DRINK", detailed: "FOOD_AND_DRINK_OTHER", description: "Test"},
  ]
  test("Presents expected dropdown selects for categories", () => {
    // Arrange
    render(<CategoryAccordionItem  
      eventKey={eventKey}
      onSelectCategory={() => {}} 
      onSelectSubCategory={() => {}} 
      taxonomyItems={taxonomyItems}
      trackedSubCategoryValue=""
      trackedCategoryValue="" /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByTestId('transaction-categorization-parent-select')).toBeInTheDocument();
    expect(screen.getByTestId('transaction-categorization-sub-select')).toBeInTheDocument();
    //screen.debug();
  });
});