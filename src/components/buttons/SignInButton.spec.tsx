import { fireEvent, render, screen } from '@testing-library/react';
import { SignInButton } from "./SignInButton";
import { vi, describe, it, expect, afterAll, vitest, afterEach } from 'vitest';
import * as msalReact from "@azure/msal-react";
import { logError, logEvent } from "@utils/logger";

const mocks = vi.hoisted(() => {
  return {
    mockedLoginPopupSuccessImplementation : () => {
      return Promise.resolve({
        return: { data: 'mocked data' }
      });
    },
    mockedLoginPopupRejectedImplementation : () => {
      return Promise.reject({
        return: { error: new Error('mocked error')}
      });
    }
  }
})

describe('Sign In Button', () => {
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
        loginPopup: vi.fn()
          .mockImplementationOnce(mocks.mockedLoginPopupSuccessImplementation)
          .mockImplementationOnce(mocks.mockedLoginPopupRejectedImplementation),// unable to currently find a way to provide alternate mock implementation for loginPopup that will reject & return error to test that logError is called as expected
        loginRedirect: vi.fn(),
        setAccount: vi.fn(),
      }
    });
    
    render(<SignInButton />);
  });

  afterEach(() => {
    vi.resetAllMocks();
  });

  test('Renders the Sign In Button', () => {
    expect(screen.getByTestId('button-sign-in')).toBeInTheDocument();
  })
  test('Clicking the Sign In Button (loginPopup) sets active MSAL account', () => {
    // Act (click the button, first attempt presumes Success)
    fireEvent.click(screen.getByTestId('button-sign-in'));
    // Assert
    expect(logEvent).toHaveBeenCalledTimes(1);
  })
})
// unable to provide alternate mock implementation for loginPopup that will reject & return error to test that logError is called as expected
// once vitest hoists the mocks, the object is not available to the test scope for modification