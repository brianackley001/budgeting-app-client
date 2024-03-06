import { render, screen } from '@testing-library/react';
import AccountSummaryList from "./AccountSummaryList";


const sectionLabels: string[] = ["Checking & Savings", "Credit Cards", "Investments", "Loans"];

beforeEach(() => {
  let accountItems = [
    {
      accountId: "KzNKXRVLzbhvX6yd7Ke3t0KQx9eZAmUERokXz",
      customName: "",
      includeAccountTransactions: true,
      institutionId: "ins_1234567",
      institutionName: "Institution 1",
      balances: {
        available: 100,
        current: 110,
        isoCurrencyCode: "USD",
        limit: null,
        unofficialCurrencyCode: null
      },
      itemId: "Vz8PV3L6zNhdqLJn49xwhV3wZ8d9wPfrEnvgv",
      mask: "3544",
      name: "Plaid Checking",
      officialName: "Plaid Checking",
      subtype: "checking",
      type: "depository",
      dateCreated: "Wed, 28 Feb 2024 01:33:55 GMT",
      dateUpdated: "Wed, 06 Mar 2024 03:18:20 GMT"
    },
    
    {
      accountId: "kqpoeV5Kqmsk7j091Xy8FLmkNMV7PRCo7egjd",
      customName: "",
      includeAccountTransactions: true,
      institutionId: "ins_98979694",
      institutionName: "Institution 2",
      balances: {
        available: 100,
        current: 110,
        isoCurrencyCode: "USD",
        limit: null,
        unofficialCurrencyCode: null
      },
      itemId: "Vz8PV3L6zNhdqLJn49xwhV3wZ8d9wPfrEnvgv",
      mask: "9999",
      name: "Plaid Credit Card",  
      officialName: "Plaid Credit Card",
      subtype: "credit card",
      type: "credit",
      dateCreated: "Wed, 28 Feb 2024 01:33:55 GMT",
      dateUpdated: "Wed, 06 Mar 2024 03:18:20 GMT"
    }
  ];
  let item = render(<AccountSummaryList items={accountItems} />);
});

describe("AccountSummaryList", () => {
  test('renders section headers', () => {
    sectionLabels.forEach((sectionLabel) => {
      expect(screen.getByText(sectionLabel)).toBeInTheDocument();
    } );
  });
  test('renders expected account names', () => {
    expect(screen.getByText(/Plaid Checking/i)).toBeInTheDocument();
    expect(screen.getByText(/Plaid Credit Card/i)).toBeInTheDocument();
  });
});

