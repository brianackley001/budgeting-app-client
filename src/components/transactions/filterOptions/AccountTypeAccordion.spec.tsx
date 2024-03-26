import React from 'react'; 
import { render, screen } from '@testing-library/react';
import { describe, expect } from "vitest";
import AccountTypeAccordion from './AccountTypeAccordion';

describe('AccountTypeAccordian', async() => {
  const accounts = [
    { type: 'depository', accountTypeIdLabel: 'Checking and Savings', eventKey: 0},
    { type: 'credit', accountTypeIdLabel: 'Credit', eventKey: 1 },
    { type: 'investment', accountTypeIdLabel: 'Investment', eventKey: 2 },
    { type: 'loan', accountTypeIdLabel: 'Loan', eventKey: 3 },
  ];
  const onSelect = () => {};
  const trackedAccounts = [];

  
 
test.each([
  { accounts: accounts.slice(0,1), accountTypeIdLabel:accounts.slice(0,1)[0].accountTypeIdLabel, 
      accountTypeLabel:accounts.slice(0,1)[0].type, eventKey:accounts.slice(0,1)[0].eventKey, onSelect: onSelect, trackedAccounts: trackedAccounts, 
      expectedLabelText:accounts.slice(0,1)[0].accountTypeIdLabel},
  { accounts: accounts.slice(1,2), accountTypeIdLabel:accounts.slice(1,2)[0].accountTypeIdLabel, 
      accountTypeLabel:accounts.slice(1,2)[0].type, eventKey:accounts.slice(1,2)[0].eventKey, onSelect: onSelect, trackedAccounts: trackedAccounts, 
      expectedLabelText:accounts.slice(1,2)[0].accountTypeIdLabel},
  { accounts: accounts.slice(2,3), accountTypeIdLabel:accounts.slice(2,3)[0].accountTypeIdLabel, 
      accountTypeLabel:accounts.slice(2,3)[0].type, eventKey:accounts.slice(2,3)[0].eventKey, onSelect: onSelect, trackedAccounts: trackedAccounts, 
      expectedLabelText:accounts.slice(2,3)[0].accountTypeIdLabel},
  { accounts: accounts.slice(3,4), accountTypeIdLabel:accounts.slice(3,4)[0].accountTypeIdLabel, 
      accountTypeLabel:accounts.slice(3,4)[0].type, eventKey:accounts.slice(3,4)[0].eventKey, onSelect: onSelect, trackedAccounts: trackedAccounts, 
      expectedLabelText:accounts.slice(3,4)[0].accountTypeIdLabel},
])('AccountTypeAccordian($accounts, $accountTypeIdLabel, $accountTypeLabel, $eventKey, $onSelect, $trackedAccounts) -> $expectedLabelText', (
  { accounts, accountTypeIdLabel, accountTypeLabel, eventKey, onSelect, trackedAccounts, expectedLabelText }) => {
  // Arrange
    render(

        <AccountTypeAccordion
          accounts={accounts}
          onSelect={onSelect}
          trackedAccounts={trackedAccounts}
          accountTypeIdLabel={accountTypeIdLabel}
          accountTypeLabel={accountTypeLabel}
          eventKey={eventKey}
        /> as React.ReactElement<any, string | React.JSXElementConstructor<any>> // Specify the type of the component
      );  

    // Assert
    expect(screen.getByText(expectedLabelText)).toBeInTheDocument();
    //screen.debug();
  });
});
