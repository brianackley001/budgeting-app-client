import { fireEvent, render, screen } from '@testing-library/react';
import { StoreRefreshButton } from "./StoreRefreshButton";
import { vi, describe, it, expect, afterAll, vitest, afterEach } from 'vitest';

import axiosInstance from "@utils/axiosInstance"; 
import {logEvent} from '@utils/logger';
//import { loginSync } from '@/utils/loginStateUtils';


describe('Store Refresh Button', () => {
  beforeEach(() => {
    vi.mock('@utils/axiosInstance');
    vi.mock('@utils/logger');
    vi.mock('@utils/loginStateUtils.ts');

    vi.mock('@hooks/storeHooks', async (importOriginal) => {
      const actual = await importOriginal<typeof import('@hooks/storeHooks')>()
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
    render(<StoreRefreshButton />);
  });
  afterEach(() => {
    vi.resetAllMocks();
  });

  test('Renders the Store Refresh Button', () => {
    expect(screen.getByTestId('button-store-refresh')).toBeInTheDocument();
  })
  test('Clicking the Store Refresh Button', () => {
    const fetchSpy = vi.spyOn(axiosInstance, 'get');
    fetchSpy.mockImplementation(() => Promise.resolve({data: {id: "1234"}}));
    fireEvent.click(screen.getByTestId('button-store-refresh'));
    expect(axiosInstance.get).toHaveBeenCalledTimes(1);
    expect(logEvent).toHaveBeenCalledTimes(1);
    //expect(loginSync).toHaveBeenCalledTimes(1); // This is called in  returned Axios Promise, need a mockImplementation that will surface the call to loginSync
  })
})
