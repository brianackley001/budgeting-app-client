import { render, screen } from '@testing-library/react';
import InstitutionHeaderItem from "./InstitutionHeaderItem";

beforeAll(() => {
  // use vi.mock for child component ./AccountListItem.tsx
  vi.mock('../buttons/RefreshCredentialsButton.tsx', () =>{
    return {
      RefreshCredentialsButton: () => {
        return (
          <div data-testid="refresh-credentials-button">Repair Credentials Component MOCK</div>
        )
      }
    }
  });
});

describe("InstitutionHeaderItem", () => {
  test("should render InstitutionHeaderItem with edit and no itemError 'Repair Credentials' button present", () => {
    const institution = {
      institutionId: "ins_133234",
      accounts: [{accountId: "PMxN8r", institutionId: "ins_133234", institutionName: "Test-Institution", itemId: "PMxN8r"}],
      itemError: null,
      itemId: "PMxN8r"
    };
    render(<InstitutionHeaderItem institution={institution} />);
    expect(screen.getByText('Test-Institution')).toBeInTheDocument();
    expect(screen.queryByTestId('refresh-credentials-button')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Edit Institution')).toBeInTheDocument();
  });
  
  test("should render InstitutionHeaderItem with edit and isResolved itemError  => NO 'Repair Credentials' button present", () => {
    const institution = {
      institutionId: "ins_133234",
      accounts: [{accountId: "PMxN8r", institutionId: "ins_133234", institutionName: "Test-Institution", itemId: "PMxN8r"}],
      itemError:  {
        errorCode: "ITEM_LOGIN_REQUIRED",
        isResolved: true
      },
      itemId: "PMxN8r"
    };
    render(<InstitutionHeaderItem institution={institution} />);
    expect(screen.getByText('Test-Institution')).toBeInTheDocument();
    expect(screen.queryByTestId('refresh-credentials-button')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Edit Institution')).toBeInTheDocument();
  });

  test("should render InstitutionHeaderItem with no edit button and  itemError 'Repair Credentials' button present", () => {
    const institution = {
      institutionId: "ins_133234",
      accounts: [{accountId: "PMxN8r", institutionId: "ins_133234", institutionName: "Test-Institution", itemId: "PMxN8r"}],
      itemError: {
        errorCode: "ITEM_LOGIN_REQUIRED",
        isResolved: false
      },
      itemId: "PMxN8r"
    };
    render(<InstitutionHeaderItem institution={institution} />);
    expect(screen.getByText('Test-Institution')).toBeInTheDocument();
    expect(screen.queryByTestId('refresh-credentials-button')).toBeInTheDocument();
    expect(screen.queryByLabelText('Edit Institution')).not.toBeInTheDocument();
    //screen.debug();
  });

});