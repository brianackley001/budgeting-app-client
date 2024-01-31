import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { describe, expect } from "vitest";
import { LoadingMessage } from './LoadingMessage';  

describe('LoadingMessage', async() => {
  test("should render component elements as expected when isLoading is true", () => {
    // Arrange
    const isLoading = true;
    render(<LoadingMessage isLoading={isLoading} /> as React.ReactElement<any, string | React.JSXElementConstructor<any>>);
    //Act
    //Assert
    expect(screen.getByTestId("transaction-loading-message")).toBeInTheDocument;
    expect(screen.getByTestId("transaction-loading-message-text")).toBeInTheDocument;
    expect(screen.getByTestId("transaction-loading-message-text")).toHaveTextContent("...Retrieving transactions...");
    expect(screen.getByTestId("transaction-loading-message-spinner-container")).toContainHTML('<div class="iconStyle spinner-grow text-primary"/>');
    //screen.debug();
  });
  test("should not render component elements when isLoading is false", () => {
    // Arrange
    const isLoading = false;
    render(<LoadingMessage isLoading={isLoading} /> as React.ReactElement<any, string | React.JSXElementConstructor<any>>);
    //Act
    //Assert
    expect(screen.queryByTestId("transaction-loading-message")).toBeNull();
    expect(screen.queryByTestId("transaction-loading-message-text")).toBeNull();
    expect(screen.queryByTestId("transaction-loading-message-spinner-container")).toBeNull();
    //screen.debug();
  });
});