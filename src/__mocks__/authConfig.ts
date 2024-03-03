import { vi } from "vitest";

const authConfig = vi.mock("@config/authConfig", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@config/authConfig")>()
  return {
    ...actual,
    loginRequest: vi.fn(),
    msalConfig: vi.fn(),
  }
});

export default authConfig;