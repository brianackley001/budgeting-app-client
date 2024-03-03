import { vi } from "vitest";

const logger = vi.mock("@utils/logger", async (importOriginal) => {
  const actual = await importOriginal<typeof import("@utils/logger")>()
  return {
    ...actual,
    logError: vi.fn(),
    logEvent: vi.fn(),
    logMetric: vi.fn(),
    logTrace: vi.fn(),
  }
});

export default logger;