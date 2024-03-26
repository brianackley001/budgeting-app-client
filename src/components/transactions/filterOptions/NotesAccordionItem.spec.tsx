import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { describe, expect } from "vitest";
import NotesAccordionItem from './NotesAccordionItem';

describe('NotesAccordianItem', async() => {
  test("Presents expected notes placeholder text", () => {
    // Arrange
    render(<NotesAccordionItem  eventKey="notes-accordion-item" 
      onSelect={() => {}} 
      trackedValue="" /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByPlaceholderText("Search for...")).toBeInTheDocument();
    expect(screen.getByTestId("notes-accordion-item-text-search-text-value")).not.toHaveValue;
    //screen.debug();
  });
  test("Notes value displays expected trackedValue", () => {
    // Arrange
    render(<NotesAccordionItem  eventKey="notes-accordion-item" 
      onSelect={() => {}} 
      trackedValue="test" /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByTestId("notes-accordion-item-text-search-text-value")).toHaveValue("test");
  });
});