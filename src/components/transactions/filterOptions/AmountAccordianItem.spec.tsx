import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { describe, expect } from "vitest";
import AmountAccordianItem from './AmountAccordianItem';

describe('AmountAccordianItem', async() => {
  const eventKey = "amount-accordian-item";
  const onSelect = () => {};
  test.each([
    { trackedFromAmount: 1.00, trackedToAmount:10.00, expected: {trackedFromAmount:1.00, trackedToAmount:10.00}},
    { trackedFromAmount: -1.00, trackedToAmount:-10.00, expected: {trackedFromAmount:-1.00, trackedToAmount:-10.00}},
    { trackedFromAmount: 200.00, trackedToAmount:1000.00, expected: {trackedFromAmount:200.00, trackedToAmount:1000.00}},
    { trackedFromAmount: -1.00, trackedToAmount:1000.00, expected: {trackedFromAmount:-1.00, trackedToAmount:1000.00}},
  ])('AmountAccordianItem($trackedFromAmount, $trackedToAmount) -> $expected', (
    { trackedFromAmount, trackedToAmount, expected }) => {
    // Arrange
    render(<AmountAccordianItem  eventKey={eventKey} 
      onSelect={onSelect} 
      trackedFromAmount={trackedFromAmount}
      trackedToAmount={trackedToAmount} /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act

    //Assert
    expect(screen.getByTestId("amount-accordian-item-header")).toBeInTheDocument();
    expect(screen.getByTestId("amount-accordian-item-body")).toBeInTheDocument();
    expect(screen.getByTestId("amount-accordian-item-from-value")).toBeInTheDocument();
    expect(screen.getByTestId("amount-accordian-item-to-value")).toHaveValue(expected.trackedToAmount);
    expect(screen.getByTestId("amount-accordian-item-from-value")).toHaveValue(expected.trackedFromAmount);
    //screen.debug();
  });
});