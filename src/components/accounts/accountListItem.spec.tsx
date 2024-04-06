import { render, screen } from '@testing-library/react';
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
  render(<AccountListItem item={undefined} {...accountListItem} />);
});
afterEach(() => {
  vi.restoreAllMocks()
})

describe.skip("Accordion test", () => {
  test("should show title data points", () => {
    let accordionHeader = screen.getByTestId('accordion-header');
    expect(accordionHeader).toBeInTheDocument();
    expect(accordionHeader).toHaveTextContent(accountListItem.name);
    expect(accordionHeader).toHaveTextContent(accountListItem.mask);
    expect(accordionHeader).toHaveTextContent(accountListItem.balances.available.toString());
  })
  test("should set Account Name form field value", () => {
    let formAccountName = screen.getByTestId('accordion-form-account-name');
    expect(formAccountName).toBeInTheDocument();
    expect(formAccountName).toHaveValue(accountListItem.name);
  })
  test("should set Include In Transactions form field value", () => {
    let formIncludeInTransactions = screen.getByTestId('accordion-form-include-in-transactions');
    expect(formIncludeInTransactions).toBeInTheDocument();
    if(accountListItem.includeInTransactions)
     expect(formIncludeInTransactions).toBeChecked();
    else
      expect(formIncludeInTransactions).not.toBeChecked();
  })
  // test("should call handleSubmit when 'Save' button is clicked", () => {
    
  //   const spy = vi.spyOn(AccountListItem.prototype, 'handleSubmit' as never);
  //   const submitButton = screen.getByTestId('accordion-form-submit-btn');
  //   fireEvent.click(submitButton);
  //   expect(spy).toHaveBeenCalledTimes(1)
  // })

//   test("should display validation error for blank account name", async () => {
//       const submitButton = screen.getByTestId('accordion-form-submit-btn'); //
      
//       expect(await screen.getByTestId('accordion-form-account-name-is-invalid')).toHaveStyle();
//       expect(await screen.getByTestId('accordion-form-account-name-is-valid')).toBeVisible();
// //
      // screen.debug();
      // //const accountNameInput = screen.getByTestId('accordion-form-account-name');
      // fireEvent.change(screen.getByTestId('accordion-form-account-name'), {target: {value: ''}});
      // fireEvent.click(submitButton);
      // expect(await screen.getByTestId('accordion-form-account-name-is-invalid')).toBeVisible();
      // expect(await screen.getByTestId('accordion-form-account-name-is-valid')).not.toBeVisible();
  })

  // test("should display validation feedback for valid account name", async () => {
  //     const submitButton = screen.getByTestId('accordion-form-submit-btn'); //
  //     screen.debug();
  //     const accountNameInput = screen.getByTestId('accordion-form-account-name');
  //     fireEvent.change(accountNameInput, {target: {value: ''}});
  //     fireEvent.click(submitButton);
  //     expect(await screen.getByTestId('accordion-form-account-name-is-invalid')).toBeVisible();
  //     expect(screen.getByTestId('accordion-form-account-name-is-valid')).not.toBeVisible();
  //     fireEvent.change(accountNameInput, {target: {value: 'TestName1'}});
  //     expect(await screen.getByTestId('accordion-form-account-name-is-invalid')).not.toBeVisible();
  //     expect(await screen.getByTestId('accordion-form-account-name-is-valid')).toBeVisible();
  // })
// })

