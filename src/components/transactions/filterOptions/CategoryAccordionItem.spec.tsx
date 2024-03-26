import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { describe, expect } from "vitest";
import CategoryAccordionItem from './CategoryAccordionItem';

describe('CategoryAccordianItem', async() => {
  test("Presents expected textarea placeholder text", () => {
    // Arrange
    render(<CategoryAccordionItem  eventKey="category-accordion-item" 
      onSelect={() => {}} 
      trackedValue="" /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByPlaceholderText("Search for...")).toBeInTheDocument();
    //screen.debug();
  });

  test("Textarea value displays expected trackedValue", () => {
    // Arrange
    render(<CategoryAccordionItem  eventKey="category-accordion-item" 
      onSelect={() => {}} 
      trackedValue="test" /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByTestId("category-accordion-item-search-text-value")).toHaveValue("test");
    //screen.debug();
  });
});