
import { render, screen } from '@testing-library/react';
//import { AccountSummaryListItemType } from "../../types/accountSummaryListItem";
import AccountSummaryListItem from "./AccountSummaryListItem";


const accountSummaryListItem = {
  institutionId: "ins_1234",
  itemId: "item_1234",
  institutionName: "Plaid Bank",
  accountId: "123456789",
  balances: {
    available: 100,
    current: 110,
    iso_currency_code: "USD",
    limit: null,
    unofficial_currency_code: null,
  },
  name: "Plaid Checking",
  mask: "0000",
  type: "depository",
  subtype: "checking",
  official_name: "Plaid Gold Standard 0% Interest Checking",
  includeInTransactions: true
};

describe("Account Summary List Item test", () => {
  test("should show title data points (balanceIsDebt == true)", () => {
    render(<AccountSummaryListItem item={accountSummaryListItem} balanceIsDebt={true} />);
    expect(screen.getByTestId('list-group-item-container')).toBeInTheDocument();
    expect(screen.getByTestId('list-item-name')).toHaveTextContent(accountSummaryListItem.name);
    expect(screen.getByTestId('list-item-balance')).toHaveTextContent(accountSummaryListItem.balances.current.toString());
    expect(screen.getByTestId('list-item-balance')).toHaveTextContent("-"); //balanceIsDebt={true}
    expect(screen.getByTestId('list-item-institution-name')).toHaveTextContent(accountSummaryListItem.institutionName);
  })
  test("should show title data points (balanceIsDebt == false)", () => {
    render(<AccountSummaryListItem item={accountSummaryListItem} balanceIsDebt={false} />);
    expect(screen.getByTestId('list-group-item-container')).toBeInTheDocument();
    expect(screen.getByTestId('list-item-name')).toHaveTextContent(accountSummaryListItem.name);
    expect(screen.getByTestId('list-item-balance')).toHaveTextContent(accountSummaryListItem.balances.current.toString());
    expect(screen.getByTestId('list-item-balance')).not.toHaveTextContent("-"); //balanceIsDebt={false}
    expect(screen.getByTestId('list-item-institution-name')).toHaveTextContent(accountSummaryListItem.institutionName);
  })
})

