import { render, screen } from '@testing-library/react';
import AccountSummaryList from "./AccountSummaryList";
import AccountSectionAccordion  from "./AccountSectionAccordion.tsx";

beforeEach(() => {
  let items = [
    {
      account_id: "lv5KvMeBlgTmRMMjPgz9Sbr5QmDxKXcpzo5Dp",
      balances: {
        available: 100,
        current: 110,
        iso_currency_code: "USD",
        limit: null,
        unofficial_currency_code: null
      },
      mask: "0000",
      name: "Plaid Checking",
      official_name: "Plaid Gold Standard 0% Interest Checking",
      subtype: "checking",
      type: "depository",
      includeInTransactions: true,
    }
  ];
  let item = render(<AccountSummaryList items={items} />);
});
test('renders AccountSummaryList', () => {
  const linkElement = screen.getByText(/Plaid Checking/i);
  expect(linkElement).toBeInTheDocument();
});