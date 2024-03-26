import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { describe, expect } from "vitest";
import TagAccordionItem from './TagAccordionItem';


describe('TagAccordionItem', async() => {

  test("should render component elements as expected", () => {
    // Arrange
    const tags = ["Test-A", "Test-B", "Test-C", "IsTracked-Z"];
    const trackedTags = ["IsTracked-Z", "Red", "Blue"];
    render(<TagAccordionItem  eventKey="tag-accordion-item" 
      onSelect={() => {}} 
      tags={tags}
      trackedTags={trackedTags} /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByTestId("tag-accordion-item-header")).toBeInTheDocument;
    expect(screen.getByTestId("tag-accordion-item-body")).toBeInTheDocument;
    expect(screen.getByTestId(`tag-accordion-item-checkbox-${tags[0]}-0`)).toBeInTheDocument;
    expect(screen.getByText(tags[0])).toBeInTheDocument();
    expect(screen.getByTestId(`tag-accordion-item-checkbox-${tags[1]}-1`)).toBeInTheDocument;
    expect(screen.getByText(tags[1])).toBeInTheDocument();
    expect(screen.getByTestId(`tag-accordion-item-checkbox-${tags[2]}-2`)).toBeInTheDocument;
    expect(screen.getByText(tags[2])).toBeInTheDocument();
    expect(screen.getByTestId(`tag-accordion-item-checkbox-${tags[3]}-3`)).toBeInTheDocument;
    expect(screen.getByText(tags[3])).toBeInTheDocument();
    //screen.debug();
  });
  test("TrackedValue checkboxes are checked by default", () => {
    // Arrange
    const tags = ["Test-A", "Test-B", "Test-C", "IsTracked-Z"];
    const trackedTags = ["IsTracked-Z", "Red", "Blue"];
    render(<TagAccordionItem  eventKey="tag-accordion-item" 
      onSelect={() => {}} 
      tags={tags}
      trackedTags={trackedTags} /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByTestId(`tag-accordion-item-checkbox-${tags[0]}-0`)).not.toBeChecked();
    expect(screen.getByTestId(`tag-accordion-item-checkbox-${tags[1]}-1`)).not.toBeChecked();
    expect(screen.getByTestId(`tag-accordion-item-checkbox-${tags[2]}-2`)).not.toBeChecked();
    expect(screen.getByTestId(`tag-accordion-item-checkbox-${tags[3]}-3`)).toBeChecked();
    //screen.debug();
  });
});
