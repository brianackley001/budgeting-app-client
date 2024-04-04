import { vi } from "vitest";
export const MOCK_ACCESS_TOKEN = "mockAccessTokenTestValue-xyz"
const mockAccessTokenRequest = () => {
  return MOCK_ACCESS_TOKEN;
}
const mockAxiosGetImplementation = () =>
  Promise.resolve({
    data: {
      id: "123",
      name: "test",
      preferences: {
        transactionItemsPerPage: 10,
      },
      userId: "123",
      userName: "test",
      transactionTags: [],
    },
  });

const mockAxiosPostImplementation = () =>
  Promise.resolve({
    data: {
      id: "123",
      name: "test",
      preferences: {
        transactionItemsPerPage: 10,
      },
      userId: "123",
      userName: "test",
      transactionTags: [],
    },
  });



vi.mock("axios", async () => {
  const actual: any = await vi.importActual("axios");
  return {
    default: {
      ...actual.default,
      create: vi.fn(() => ({
        ...actual.default.create(),
        defaults: {
          baseUrl: "https://localhost:5001/api/testing/1",
          headers: {
            post: ["Content-Type", "application/json"],
            get: ["Content-Type", "application/json"],
          },
        }, 
    })),
    },
  };
});


vi.mock("@azure/msal-browser", () => ({
  PublicClientApplication: vi.fn(),
}));
vi.mock("@config/authConfig", () => ({
  loginRequest: vi.fn(),
  msalConfig: vi.fn(),
}));
vi.mock("@azure/msal-common", () => ({
  InteractionRequiredAuthError: vi.fn(),
}));
vi.mock("@utils/logger", () => ({
  logError: vi.fn(),
  logEvent: vi.fn(),
}));

const mockAxiosInstance = vi.mock("@utils/axiosInstance", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@utils/axiosInstance")>()
  return {
    ...actual,
    // replace some exports
    get: vi.fn(mockAxiosGetImplementation),
    post: vi.fn(mockAxiosPostImplementation),
    acquireAccessToken: vi.fn(mockAccessTokenRequest),
    reqResInterceptor: vi.fn(),
    reqErrInterceptor: vi.fn(),
    resResInterceptor: vi.fn(),
    resErrInterceptor: vi.fn(),
  }
});

export default mockAxiosInstance;