
import { fireEvent, render, screen } from '@testing-library/react';
import { AccountListItemType } from "../../types/accountListItem";
import AccountListItem from "./AccountListItem";


const accountListItem: AccountListItemType = {
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
};

beforeEach(() => {
  let item = render(<AccountListItem {...accountListItem} />);
});

describe("Accordion test", () => {
  test("should show title data points", () => {
    let accordianHeader = screen.getByTestId('accordian-header');
    expect(accordianHeader).toBeInTheDocument();
    expect(accordianHeader).toHaveTextContent(accountListItem.name);
    expect(accordianHeader).toHaveTextContent(accountListItem.mask);
    expect(accordianHeader).toHaveTextContent(accountListItem.balances.available.toString());
  })
  // test("should not show the collapsible content at the start", () => {
    
  //   screen.debug();
  //   let accordianBody = screen.queryByTestId("accordian-container"); //(`/${accountListItem.official_name}/i`)).toBeUndefined()
  //   expect(accordianBody).toContainHTML('<div class="accordion-collapse collapse">');
  // })

  // test("should show the content on accordion click",async () => {
  //     const title = screen.getByTestId('accordian-header');
  //     fireEvent.click(title)
  //     expect(await screen.queryByTestId("accordian-body")).toBeInTheDocument();
  // })
})