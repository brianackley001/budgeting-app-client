
import { render, screen } from '@testing-library/react';
import { AccountSummaryListItemType } from "../../types/accountSummaryListItem";
import AccountSummaryListItem from "./AccountSummaryListItem";


const accountSummaryListItem: AccountSummaryListItemType = {
  institution_id: "ins_1234",
  item_id: "item_1234",
  institution_name: "Plaid Bank",
  account_id: "lv5KvMeBlgTmRMMjPgz9Sbr5QmDxKXcpzo5Dp",
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
};;

beforeEach(() => {
  let item = render(<AccountSummaryListItem {...accountSummaryListItem} />);
});

describe("Account Summary List Item test", () => {
  test("should show title data points", () => {
    expect(screen.getByTestId('list-group-item-container')).toBeInTheDocument();
    expect(screen.getByTestId('list-item-name')).toHaveTextContent(accountSummaryListItem.name);
    expect(screen.getByTestId('list-item-balance')).toHaveTextContent(accountSummaryListItem.balances.current.toString());
    expect(screen.getByTestId('list-item-institution-name')).toHaveTextContent(accountSummaryListItem.institution_name);
  })

})

