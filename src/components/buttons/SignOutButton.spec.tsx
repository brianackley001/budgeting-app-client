import { fireEvent, render, screen } from '@testing-library/react';
import { SignOutButton } from "./SignOutButton";
import { vi, describe, it, expect, afterAll, vitest, afterEach } from 'vitest';
import * as msalReact from "@azure/msal-react";
import { logEvent } from "@utils/logger";


describe('Sign Out Button', () => {
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
    // Act (click the button, first attempt presumes Success)
    fireEvent.click(screen.getByTestId('button-sign-out'));
    // Assert
    expect(logEvent).toHaveBeenCalledTimes(1);
    expect((msalReact as any).useMsal().instance.logoutPopup).toHaveBeenCalledTimes(1); // currently favoring loginPopup over loginRedirect...
  })
})