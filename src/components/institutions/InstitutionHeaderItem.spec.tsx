import { fireEvent, render, screen, waitFor, waitForElementToBeRemoved } from '@testing-library/react';
import InstitutionHeaderItem from "./InstitutionHeaderItem";

let institution;

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
beforeEach(() => {
  institution = {
    institutionId: "ins_133234",
    accounts: [{accountId: "PMxN8r", institutionId: "ins_133234", institutionName: "Test-Institution", itemId: "PMxN8r"}],
    itemError: {
      errorCode: "ITEM_LOGIN_REQUIRED",
      isResolved: true},
    itemId: "PMxN8r"
  };
});

describe("InstitutionHeaderItem", () => {
  test("should render InstitutionHeaderItem with edit and no itemError 'Repair Credentials' button present", () => {
    institution.itemError = null;
    render(<InstitutionHeaderItem institution={institution} />);
    expect(screen.getByText('Test-Institution')).toBeInTheDocument();
    expect(screen.queryByTestId('refresh-credentials-button')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Edit Institution')).toBeInTheDocument();
  });
  
  test("should render InstitutionHeaderItem with edit and isResolved itemError  => NO 'Repair Credentials' button present", () => {
    institution.itemError =  {
        errorCode: "ITEM_LOGIN_REQUIRED",
        isResolved: true};
    render(<InstitutionHeaderItem institution={institution} />);
    expect(screen.getByText('Test-Institution')).toBeInTheDocument();
    expect(screen.queryByTestId('refresh-credentials-button')).not.toBeInTheDocument();
    expect(screen.getByLabelText('Edit Institution')).toBeInTheDocument();
  });

  test("should render InstitutionHeaderItem with no edit button and  itemError 'Repair Credentials' button present", () => {
    institution.itemError.isResolved = false;
    render(<InstitutionHeaderItem institution={institution} />);
    expect(screen.getByText('Test-Institution')).toBeInTheDocument();
    expect(screen.queryByTestId('refresh-credentials-button')).toBeInTheDocument();
    expect(screen.queryByLabelText('Edit Institution')).not.toBeInTheDocument();
    //screen.debug();
  });
  test("should toggle the edit button", async() => {
    render(<InstitutionHeaderItem institution={institution} />);
    const editButton = screen.getByTestId('institution-dropdown-toggle');
    expect(editButton).toBeInTheDocument();
    expect(screen.queryByTestId('edit-institution-dropdown-item-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('delete-institution-dropdown-item-button')).not.toBeInTheDocument();
    fireEvent.click(editButton);
    await waitFor(() => expect(screen.getByTestId('edit-institution-dropdown-item-button')).toBeVisible());
    await waitFor(() => expect(screen.getByTestId('delete-institution-dropdown-item-button')).toBeVisible());
  });
  test("should close the edit pop-over menu when open", async() => {
    render(<InstitutionHeaderItem institution={institution} />);
    const editButton = screen.getByTestId('institution-dropdown-toggle');
    fireEvent.doubleClick(editButton);
    expect(screen.queryByTestId('edit-institution-dropdown-item-button')).not.toBeInTheDocument();
    expect(screen.queryByTestId('delete-institution-dropdown-item-button')).not.toBeInTheDocument();
  });
  test("should launch the edit modal", async() => {
    render(<InstitutionHeaderItem institution={institution} />);
    const editButton = screen.getByTestId('institution-dropdown-toggle');
    fireEvent.click(editButton);
    const editModalButton = screen.getByTestId('edit-institution-dropdown-item-button');
    fireEvent.click(editModalButton);
    await waitFor(() => expect(screen.getByTestId('edit-institution-modal-container')).toBeVisible());
  });
  test("should close the edit modal", async() => {
    render(<InstitutionHeaderItem institution={institution} />);
    const editButton = screen.getByTestId('institution-dropdown-toggle');
    fireEvent.click(editButton);
    const editModalButton = screen.getByTestId('edit-institution-dropdown-item-button');
    fireEvent.click(editModalButton);
    expect(screen.getByTestId('edit-institution-modal-container')).toBeVisible();
    const closeModalButton = screen.getByTestId('institution-edit-modal-close-button');
    fireEvent.click(closeModalButton);
    expect(await waitForElementToBeRemoved(() => screen.getByTestId('edit-institution-modal-container')));
  });
  test("should launch the delete modal", async() => {
    render(<InstitutionHeaderItem institution={institution} />);
    const editButton = screen.getByTestId('institution-dropdown-toggle');
    fireEvent.click(editButton);
    const deleteModalButton = screen.getByTestId('delete-institution-dropdown-item-button');
    fireEvent.click(deleteModalButton);
    await waitFor(() => expect(screen.getByTestId('delete-institution-modal-container')).toBeVisible());
  });
  test("should close the delete modal", async() => {
    render(<InstitutionHeaderItem institution={institution} />);
    const editButton = screen.getByTestId('institution-dropdown-toggle');
    fireEvent.click(editButton);
    const deleteModalButton = screen.getByTestId('delete-institution-dropdown-item-button');
    fireEvent.click(deleteModalButton);
    expect(screen.getByTestId('delete-institution-modal-container')).toBeVisible();
    const closeModalButton = screen.getByTestId('institution-delete-modal-close-button');
    fireEvent.click(closeModalButton);
    expect(await waitForElementToBeRemoved(() => screen.getByTestId('delete-institution-modal-container')));
  });
});