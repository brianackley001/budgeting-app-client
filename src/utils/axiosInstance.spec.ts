import { vi, describe, it, expect, afterAll, vitest, afterEach } from "vitest";
import axiosInstance from "./axiosInstance";

vi.mock("@utils/axiosInstance");
describe("axiosInstance", () => {
  it("should create expected mock object and accept HTTP requests", async () => {
    
    let sut = axiosInstance;
    sut.get('./path');
    sut.post('./path', {data: 'data'});

    expect(axiosInstance.get).toHaveBeenCalledTimes(1)
    expect(axiosInstance.post).toHaveBeenCalledTimes(1)
  });
});
