import { render, fireEvent, screen, waitFor } from '@testing-library/react';
import { describe, expect } from "vitest";
import AccountAccordianItem from './AccountAccordionItem';


describe("Account Accordian Item", async() => {
  const accounts = [
    { accountId: 1, name: 'Account 1', includeAccountTransactions: true,  institutionName: 'Institution 1'},
    { accountId: 2, name: 'Account 2', includeAccountTransactions: false,  institutionName: 'Institution 2' },
  ];
  const accountTypeIdLabel = 'depository';
  const accountTypeLabel = 'Checking and Savings';
  const eventKey = '1';
  const onSelect = () => {};
  const trackedAccounts = [1];

  beforeEach(() => {
    render(
    <AccountAccordianItem accounts={accounts} 
      accountTypeIdLabel={accountTypeIdLabel} 
      accountTypeLabel={accountTypeLabel} 
      eventKey={eventKey} onSelect={onSelect} 
      trackedAccounts={trackedAccounts} /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> 
    );
  });

  test("should render component elements as expected", () => {
    //Assert
    expect(screen.getByTestId('account-accordion-item-container'), "account-accordion-item-container").toBeInTheDocument();
    expect(screen.getByTestId('account-accordion-item-header'), "account-accordion-item-header").toBeInTheDocument();
    expect(screen.getByTestId('account-accordion-item-body'), "account-accordion-item-body").toBeInTheDocument();
    expect(screen.queryByTestId('account-accordion-item-account-form-checkbox-1'), "account-accordion-item-account-form-checkbox-1").toBeInTheDocument();
    expect(screen.queryByTestId('account-accordion-item-account-form-checkbox-2'), "account-accordion-item-account-form-checkbox-2").toBeInTheDocument();
    expect(screen.queryByTestId('account-accordion-item-account-excluded-warning-container-2'), "account-accordion-item-account-excluded-warning-container-2").toBeInTheDocument();
    expect(screen.queryByTestId('account-accordion-item-account-excluded-warning-container-1'), "account-accordion-item-account-excluded-warning-container-1").toBeNull();
    //screen.debug();
  });
  test("shouldrender checkboxes as expected based on prop data (disabled / checked)", () => {
    //Assert
    expect(screen.queryByTestId("account-accordion-item-account-form-checkbox-1")).toBeChecked();
    expect(screen.queryByTestId("account-accordion-item-account-form-checkbox-2")).not.toBeChecked();
    expect(screen.queryByTestId("account-accordion-item-account-form-checkbox-1")).not.toBeDisabled();
    expect(screen.queryByTestId("account-accordion-item-account-form-checkbox-2")).toBeDisabled();
  });
  test("should render account name as expected", () => {
    //Assert
    expect(screen.queryByLabelText("Account 1")).toBeInTheDocument();
    expect(screen.queryByLabelText("Account 2")).toBeInTheDocument();
  });
  test("should render tooltip on hover event", async () => {
    // Act
    fireEvent.mouseOver(screen.getByTestId("account-accordion-item-account-form-checkbox-1"));

    //Assert
    await waitFor( () => screen.getByTestId("account-accordion-item-tooltip-1"));
    expect(screen.getByText('Institution 1')).toBeInTheDocument();
    expect(screen.getByTestId('account-accordion-item-tooltip-1')).toBeInTheDocument();
    //screen.debug();
  });
});