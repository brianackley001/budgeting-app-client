import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { describe, expect } from "vitest";
import TransactionDetailReadOnly from './TransactionDetailReadOnly';


describe('TransactionDetailReadOnly', async() => {
  test("should render component elements as expected", () => {
    // Arrange
    const item = {
      date: "2021-10-10",
      merchantName: "Test Merchant",
      name: "Test Name",
      amount: 100.00,
      category: "Test Category",
      userNotes: "Test Notes",
      tags: ["Test-A", "Test-B", "Test-C", "IsTracked-Z"]
    };
    render(<TransactionDetailReadOnly item={item} /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert  //item.merchantName, item.name
    expect(screen.getByTestId("transaction-detail-read-only-container")).toBeInTheDocument;
    expect(screen.getByText("Date:")).toBeInTheDocument;
    expect(screen.getByText(item.date)).toBeInTheDocument;
    expect(screen.getByText("Description:")).toBeInTheDocument;
    expect(screen.getByText(`(${item.merchantName}) ${item.name}`)).toBeInTheDocument;
    expect(screen.getByText("Amount:")).toBeInTheDocument;
    expect(screen.getByText(item.amount)).toBeInTheDocument;
    expect(screen.getByText("Category:")).toBeInTheDocument;
    expect(screen.getByText(item.category)).toBeInTheDocument;
    expect(screen.getByText("Notes:")).toBeInTheDocument;
    expect(screen.getByText(item.userNotes)).toBeInTheDocument;
    expect(screen.getByText("Tags:")).toBeInTheDocument;
    expect(screen.getByText(item.tags[0])).toBeInTheDocument;
    expect(screen.getByText(item.tags[1])).toBeInTheDocument;
    expect(screen.getByText(item.tags[2])).toBeInTheDocument;
    expect(screen.getByText(item.tags[3])).toBeInTheDocument;
  });

  test("should render component elements as expected with userDescription", () => {
    // Arrange
    const item = {
      date: "2021-10-10",
      merchantName: "Test Merchant",
      name: "Test Name",
      amount: 100.00,
      category: "Test Category",
      userNotes: "Test Notes",
      tags: ["Test-A", "Test-B", "Test-C", "IsTracked-Z"],
      userDescription: "Test User Description"
    };
    render(<TransactionDetailReadOnly item={item} /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByTestId("transaction-detail-read-only-container")).toBeInTheDocument;
    expect(screen.getByText("Date:")).toBeInTheDocument;
    expect(screen.getByText(item.date)).toBeInTheDocument;
    expect(screen.getByText("Description:")).toBeInTheDocument;
    expect(screen.getByText(item.userDescription)).toBeInTheDocument;
    expect(screen.getByText("Amount:")).toBeInTheDocument;
    expect(screen.getByText(item.amount)).toBeInTheDocument;
    expect(screen.getByText("Category:")).toBeInTheDocument;
    expect(screen.getByText(item.category)).toBeInTheDocument;
    expect(screen.getByText("Notes:")).toBeInTheDocument;
    expect(screen.getByText(item.userNotes)).toBeInTheDocument;
    expect(screen.getByText("Tags:")).toBeInTheDocument;
    expect(screen.getByText(item.tags[0])).toBeInTheDocument;
    expect(screen.getByText(item.tags[1])).toBeInTheDocument;
    expect(screen.getByText(item.tags[2])).toBeInTheDocument;
    expect(screen.getByText(item.tags[3])).toBeInTheDocument;
  });

  test("should render component elements as expected with item name and no merchant name", () => {

    // Arrange
    const item = {
      date: "2021-10-10",
      merchantName: "",
      name: "Test Name",
      amount: 100.00,
      category: "Test Category",
      userNotes: "Test Notes",
      tags: ["Test-A", "Test-B", "Test-C", "IsTracked-Z"]
    };
    render(<TransactionDetailReadOnly item={item} /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByTestId("transaction-detail-read-only-container")).toBeInTheDocument;
    expect(screen.getByText("Date:")).toBeInTheDocument;
    expect(screen.getByText(item.date)).toBeInTheDocument;
    expect(screen.getByText("Description:")).toBeInTheDocument;
    expect(screen.getByText(item.name)).toBeInTheDocument;
    expect(screen.getByText("Amount:")).toBeInTheDocument;
    expect(screen.getByText(item.amount)).toBeInTheDocument;
    expect(screen.getByText("Category:")).toBeInTheDocument;
    expect(screen.getByText(item.category)).toBeInTheDocument;
    expect(screen.getByText("Notes:")).toBeInTheDocument;
    expect(screen.getByText(item.userNotes)).toBeInTheDocument;
    expect(screen.getByText("Tags:")).toBeInTheDocument;
    expect(screen.getByText(item.tags[0])).toBeInTheDocument;
    expect(screen.getByText(item.tags[1])).toBeInTheDocument;
    expect(screen.getByText(item.tags[2])).toBeInTheDocument;
    expect(screen.getByText(item.tags[3])).toBeInTheDocument;
  });

  test("should render component elements as expected with  merchant name and no item name", () => {
    // Arrange
    const item = {
      date: "2021-10-10",
      merchantName: "",
      name: "Item Name",
      amount: 100.00,
      category: "Test Category",
      userNotes: "Test Notes",
      tags: ["Test-A", "Test-B", "Test-C", "IsTracked-Z"]
    };
    render(<TransactionDetailReadOnly item={item} /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> );
    //Act
    //Assert
    expect(screen.getByTestId("transaction-detail-read-only-container")).toBeInTheDocument;
    expect(screen.getByText("Date:")).toBeInTheDocument;
    expect(screen.getByText(item.date)).toBeInTheDocument;
    expect(screen.getByText("Description:")).toBeInTheDocument;
    expect(screen.getByText(item.name)).toBeInTheDocument;
    expect(screen.getByText("Amount:")).toBeInTheDocument;
    expect(screen.getByText(item.amount)).toBeInTheDocument;
    expect(screen.getByText("Category:")).toBeInTheDocument;
    expect(screen.getByText(item.category)).toBeInTheDocument;
    expect(screen.getByText("Notes:")).toBeInTheDocument;
    expect(screen.getByText(item.userNotes)).toBeInTheDocument;
    expect(screen.getByText("Tags:")).toBeInTheDocument;
    expect(screen.getByText(item.tags[0])).toBeInTheDocument;
    expect(screen.getByText(item.tags[1])).toBeInTheDocument;
    expect(screen.getByText(item.tags[2])).toBeInTheDocument;
    expect(screen.getByText(item.tags[3])).toBeInTheDocument;
  });
});