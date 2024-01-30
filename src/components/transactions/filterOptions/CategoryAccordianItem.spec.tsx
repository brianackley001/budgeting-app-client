import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { describe, expect } from "vitest";
import CategoryAccordianItem from './CategoryAccordianItem';

describe('CategoryAccordianItem', async() => {
  test("Presents expected textarea placeholder text", () => {
    // Arrange
    render(<CategoryAccordianItem  eventKey="category-accordian-item" 
      onSelect={() => {}} 
      trackedValue="" /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByPlaceholderText("Search for...")).toBeInTheDocument();
    //screen.debug();
  });

  test("Textarea value displays expected trackedValue", () => {
    // Arrange
    render(<CategoryAccordianItem  eventKey="category-accordian-item" 
      onSelect={() => {}} 
      trackedValue="test" /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByTestId("category-accordian-item-search-text-value")).toHaveValue("test");
    //screen.debug();
  });
});