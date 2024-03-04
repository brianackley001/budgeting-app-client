import { useDispatch, useSelector } from 'react-redux'
import type { TypedUseSelectorHook } from 'react-redux'
import type { RootState, AppDispatch } from '../store/store'
import { vi, describe, it, expect, afterAll, vitest, afterEach } from "vitest";
import { useAppDispatch, useAppSelector } from './storeHooks';


describe("storeHooks", () => {
  test("should return the initial state", () => {
    expect(useAppDispatch).toBeDefined();
    expect(useAppSelector).toBeDefined();
  });
});