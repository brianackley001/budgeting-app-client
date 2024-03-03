import { fireEvent, render, screen } from '@testing-library/react';
import { SignOutButton } from "./SignOutButton";
import { vi, describe, it, expect, afterAll, vitest, afterEach } from 'vitest';
import * as msalReact from "@azure/msal-react";
import { logEvent } from "@utils/logger";
import localStorageMock from '../../__mocks__/localStorage';

let originalLocalStorage: Storage;


describe('Sign Out Button', () => {
  beforeAll((): void => {
    originalLocalStorage = window.localStorage;
    (window as any).localStorage = localStorageMock;

  });

  afterAll((): void => {
    (window as any).localStorage = originalLocalStorage;
  });

  beforeEach(() => {
    vi.mock('@utils/logger');
    vi.mock('@config/authConfig');
    vi.mock("@azure/msal-react");
    vi.mock("@azure/msal-browser", () => ({
      PublicClientApplication: vi.fn(),
    }));
    (msalReact as any).useMsal.mockReturnValue({
      instance:
      {
        logoutPopup: vi.fn(),
        logoutRedirect: vi.fn(),
      }
    });
    
    render(<SignOutButton />);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('Renders the Sign Out Button', () => {
    expect(screen.getByTestId('button-sign-out')).toBeInTheDocument();
  })
  test('Clicking the Sign In Button (loginPopup) sets active MSAL account', () => {
    // Arrange 

    // Act
    fireEvent.click(screen.getByTestId('button-sign-out'));
    // Assert
    expect(logEvent).toHaveBeenCalledTimes(1);
    expect((msalReact as any).useMsal().instance.logoutPopup).toHaveBeenCalledTimes(1); // currently favoring loginPopup over loginRedirect...

    // Local Storage Validation:
    const localStorageMsalLoginSuccess: string | null = localStorage.getItem('msal_LOGIN_SUCCESS');
    expect(localStorageMsalLoginSuccess).toBeNull();
    const localStorageDbUserExists: string | null = localStorage.getItem('DB_USER_EXISTS');
    expect(localStorageDbUserExists).toBeNull();
    const localStorageUserId: string | null = localStorage.getItem('userId');
    expect(localStorageUserId).toBeNull();
    const localStorageUserName: string | null = localStorage.getItem('userName');
    expect(localStorageUserName).toBeNull();
    const localStorageUserShortName: string | null = localStorage.getItem('userShortName');
    expect(localStorageUserShortName).toBeNull();
  })
})