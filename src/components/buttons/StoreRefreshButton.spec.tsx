import { fireEvent, render, screen } from '@testing-library/react';
import { StoreRefreshButton } from "./StoreRefreshButton";
import { vi, describe, it, expect, afterAll, vitest, afterEach } from 'vitest';

import axiosInstance from "@utils/axiosInstance"; 



describe('Store Refresh Button', () => {
  beforeEach(() => {
    vi.mock('@utils/axiosInstance');
    vi.mock("@utils/logger", () => ({
      logError: vi.fn(),
      logEvent: vi.fn()
    }));
    vi.mock('@utils/userStateUtils.ts', async (importOriginal) => {
      const actual = await importOriginal<typeof import('@/utils/userStateUtils')>()
      return {
        ...actual,
        loginSync: vi.fn()
      }
    });
    vi.mock('@hooks/useStoreHooks', async (importOriginal) => {
      const actual = await importOriginal<typeof import('@/hooks/useStoreHooks')>()
      return {
        ...actual,
        useAppSelector: vi.fn(),
        useAppDispatch: vi.fn(),
      }
    });
    vi.mock('@store/msalSlice', async (importOriginal) => {
      const actual = await importOriginal<typeof import('@store/msalSlice')>()
      return {
        ...actual,
        useAppSelector: vi.fn(),
        useAppDispatch: vi.fn(),
        selectUid: "UID",
        selectAccessToken: "mockAccessTokenTestValue-xyz"
      }
    });
    vi.mock('@store/transactionSlice', async (importOriginal) => {
      const actual = await importOriginal<typeof import('@store/transactionSlice')>()
      return {
        ...actual,
        selectTransactionPagination: {
          accountIds: "",
          amountFrom: 0,
          amountTo: 0,
          categorySearchValue: "",
          total: 0,
          pageSize: 10,
          pageNumber: 1,
          sortBy: "date",
          sortDirection: "desc",
          startDate: "",
          endDate: "",
          tagSearchValue: "",
          userId: "",
          userNotesSearchValue: "",
        }
      }
    });
    let item = render(<StoreRefreshButton />);
  });
  test('Renders the Store Refresh Button', () => {
    expect(screen.getByTestId('button-store-refresh')).toBeInTheDocument();
  })
  test('Clicking the Store Refresh Button', () => {
    const fetchSpy = vi.spyOn(axiosInstance, 'get');
    fetchSpy.mockImplementation(() => Promise.resolve({data: {id: "1234"}}));
    fireEvent.click(screen.getByTestId('button-store-refresh'));
    expect(axiosInstance.get).toHaveBeenCalledTimes(1)
  })
})
