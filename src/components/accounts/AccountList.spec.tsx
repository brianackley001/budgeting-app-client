import { render, screen } from '@testing-library/react';
import AccountList from "./AccountList";

beforeAll(() => {
  // use vi.mock for child component ./AccountListItem.tsx
  vi.mock('./AccountListItem.tsx', () =>{
    return {
      default: () => {
        return (
          <div data-testid="account-list-item">List Item Mock</div>
        )
      }
    }
  });

  vi.mock('../institutions/InstitutionHeaderItem.tsx', () =>{
    return {
      default: () => {
        return (
          <div data-testid="institution-header-item">Header Item Mock</div>
          )
        }
      }
    });
});

describe("Account List", () => {
  test("should display default card border when itemError is null", () => {
    const institutionNoItemError = {
      institutionId: "ins_133234",
      accounts: [{accountId: "PMxN8r", institutionId: "ins_133234", institutionName: "Test", itemId: "PMxN8r"}],
      itemError: null,
      itemId: "PMxN8r"
    };
    render(<AccountList institution={institutionNoItemError} />);
    expect(screen.getByTestId('institution-card-container')).toHaveClass('mb-5');
    expect(screen.getByTestId('account-list-item')).toBeInTheDocument();
    expect(screen.getByTestId('institution-header-item')).toBeInTheDocument();
    //screen.debug();
    
  })
  test("should display error card border when institution errorItem is present and unresolved", () => {
    const institutionHasItemError = {
      institutionId: "ins_133234",
      accounts: [{accountId: "PMxN8r", institutionId: "ins_133234", institutionName: "Test", itemId: "PMxN8r"}],
      itemError: {
        errorCode: "ITEM_LOGIN_REQUIRED",
        isResolved: false
      },
      itemId: "PMxN8r"
    };
    render(<AccountList institution={institutionHasItemError} />);
    //screen.debug();
    expect(screen.getByTestId('institution-card-container')).toHaveClass('mb-5 red card');
    expect(screen.getByTestId('account-list-item')).toBeInTheDocument();
    expect(screen.getByTestId('institution-header-item')).toBeInTheDocument();
  })
  test("should not display error card border when institution errorItem is present and resolved", () => {
    const institutionHasResolvedItemError = {
      institutionId: "ins_133234",
      accounts: [{accountId: "PMxN8r", institutionId: "ins_133234", institutionName: "Test", itemId: "PMxN8r"}],
      itemError: {
        errorCode: "ITEM_LOGIN_REQUIRED",
        isResolved: true
      },
      itemId: "PMxN8r"
    };
    render(<AccountList institution={institutionHasResolvedItemError} />);
    expect(screen.getByTestId('institution-card-container')).toHaveClass('mb-5');
    expect(screen.getByTestId('account-list-item')).toBeInTheDocument();
    expect(screen.getByTestId('institution-header-item')).toBeInTheDocument();
  })
});
