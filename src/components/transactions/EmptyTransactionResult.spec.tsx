import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { describe, expect } from "vitest";
import EmptyTransactionResult from './EmptyTransactionResult';

describe("Empty Transaction Result", async() => {
  test("should render component elements as expected", () => {
    //Arrange
    render(<EmptyTransactionResult /> as React.ReactElement<any, string | React.JSXElementConstructor<any>>);
    //Act
    //Assert
    expect(screen.getByTestId("transaction-empty-container")).toBeInTheDocument;
    expect(screen.getByTestId("transaction-empty-container-card-title")).toBeInTheDocument;
    expect(screen.getByTestId("transaction-empty-container-card-body")).toBeInTheDocument;
    expect(screen.getByTestId("transaction-empty-container-alert")).toBeInTheDocument;
    expect(screen.getByText("No matching transactions found...")).toBeInTheDocument;
    expect(screen.getByText("Based on your filtering and sorting criteria, we were not able to find any matching transactions.")).toBeInTheDocument;
    expect(screen.getByText("Please check your filters and try again.")).toBeInTheDocument;
    //screen.debug();
  });
}); 