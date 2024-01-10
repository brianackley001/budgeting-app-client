import Store from "../store/store";
import { msalConfig } from "../config/authConfig";
import * as storeHooks from "../hooks/storeHooks";
import msalSlice, { selectAccessToken, setAccessToken } from "../store/msalSlice";
import { afterEach, describe, expect, test, vi } from "vitest";
import MsalUtils from "./msalToken";

const localSessionStorageMock: Storage = (() => {
  let store: Record<string, string> = {};

  return {
    getItem: (key: string): string => store[key] ?? null,
    setItem: (key: string, value: string): void => {
      store[key] = value.toString();
    },
    removeItem: (key: string): void => {
      delete store[key];
    },
    clear: (): void => {
      store = {};
    },
    key: (index: number): string | null => "",
    length: Object.keys(store).length,
  };
})();

const msalTokenValue = "";
let originalSessionStorage: Storage;

const expectedSessionStorageTokenValue = "Test1234567.Tenant1234567-login.windows.net-accesstoken-RandomTokenValueXYZ-Tenant1234567-api://GUID_ID/appName.read api://GUID_ID/appName.readwrite--";
// const storeUseDispatchSpy = vi.mock('src/hooks/storeHooks', () => ({ 
//   useAppDispatch: vi.fn()}));
  
// const storeUseSelectorSpy = vi.mock('src/hooks/storeHooks', () => ({ 
//   useAppSelector: vi.fn()}));

//vi.spyOn(useAppDispatch, ).mockImplementation(() => {});

beforeAll((): void => {
  originalSessionStorage = window.sessionStorage;
  (window as any).sessionStorage = localSessionStorageMock;
});

afterAll((): void => {
  (window as any).sessionStorage = originalSessionStorage;
});

describe("utils.msalToken", (): void => {
  // assign the spy instance to a const
  const getItemSpy = vi.spyOn(Storage.prototype, "getItem");


  afterEach(() => {
    getItemSpy.mockClear(); // clear call history
    sessionStorage.clear();
    vi.restoreAllMocks()
  });

  it("Successfully retrives value from session storage", (): void => {
    // // Arrange
    const keysStorage = {
      idToken: [
        "Test1234567.Tenant1234567-login.windows.net-idtoken-RandomTokenValueXYZ-Tenant1234567---",
      ],
      accessToken: [
        "Test1234567.Tenant1234567-login.windows.net-accesstoken-RandomTokenValueXYZ-Tenant1234567-api://GUID_ID/appName.read api://GUID_ID/appName.readwrite--",
      ],
      refreshToken: [
        "Test1234567.Tenant1234567-login.windows.net-refreshtoken-RandomTokenValueXYZ----",
      ],
    };
    //sessionStorage.setItem(`msal.token.keys.${msalConfig.auth.clientId}`, JSON.stringify(keysStorage))
    sessionStorage.setItem(
      `msal.token.keys.${msalConfig.auth.clientId}`,
      JSON.stringify(keysStorage)
    );

    //Act
    const sessionMsalTokens = sessionStorage.getItem(`msal.token.keys.${msalConfig.auth.clientId}`) ?? '';

    //let testResult = getSessionValue(`msal.token.keys.${msalConfig.auth.clientId}`);
    // Assert
    expect(sessionMsalTokens).toBe(JSON.stringify(keysStorage))
    //expect(getItemSpy).toHaveBeenCalledWith(JSON.stringify(keysStorage));
  });

  // it("Successfully retrieves the MSAL Token Value from the Store", (): void => {
  //   // Arrange
  //   vi.mock("../store/msalSlice", () => ({ selectAccessToken: () => '' }))
  //   vi.mock("../hooks/storeHooks", () => ({ useAppDispatch: async () => { type: 'increase-counter' } }))
  //   vi.mock("../hooks/storeHooks", () => ({ useAppSelector: () => '' }))
  //   // const useAppDispatchSpy = vi.spyOn(storeHooks, 'useAppDispatch')//selectAccessToken
  //   // const useAppSelectorSpy = vi.spyOn(storeHooks, 'useAppSelector').mockReturnValue('');

  //   // Act
  //   const sut = MsalUtils();
  //   // Assert
  // });
});
