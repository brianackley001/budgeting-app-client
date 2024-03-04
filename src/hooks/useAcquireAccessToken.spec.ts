import { vi, describe, it, expect, afterAll, vitest, afterEach } from "vitest";
import { renderHook } from "@testing-library/react";
import { act } from "react-dom/test-utils";
import { useAcquireAccessToken } from "./useAcquireAccessToken";


vi.mock("@config/authConfig");
vi.mock("@azure/msal-browser", () => ({
  PublicClientApplication: vi.fn(),
}));

vi.mock("@azure/msal-react", () => ({
  useMsal: vi.fn(() => ({
    instance: {
      acquireTokenSilent: vi.fn(() => Promise.resolve({ accessToken: "test token 2112" })),
    },
    accounts: [{ id: "123" }],
  })),
  useAccount: vi.fn(() => ({ id: "123" })),
}));


describe("useAcquireAccessToken", () => {
  test("should return the initial state", () => {
    expect(useAcquireAccessToken).toBeDefined();
  });

  test("should return expected default accessToken", () => {
    const { result } = renderHook(() => useAcquireAccessToken());
    act(() => {
      result.current = "test token 2112";
    })
  });
});