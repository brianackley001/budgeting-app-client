import { vi } from "vitest";

const loginSync = vi.mock("@utils/loginStateUtils.ts'", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@utils/loginStateUtils.ts")>()
  return {
    ...actual,
    beginSyncOperation: vi.fn(),
    broadcastSyncError: vi.fn(),
    endSyncOperation: vi.fn(),
    setAccountState: vi.fn(),
    setPlaidState: vi.fn(),
    setUserState: vi.fn(),
    setTransactionState: vi.fn()
  }
});

export default loginSync;