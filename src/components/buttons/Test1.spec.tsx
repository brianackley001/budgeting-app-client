import { fireEvent, render, screen } from '@testing-library/react';
import { Test1 } from "./Test1";
import { vi } from 'vitest';
import axiosInstance from '@utils/axiosInstance.ts';

  vi.mock('@utils/axiosInstance')

  beforeEach(() => {
    let item = render(<Test1 />);
  });

describe('mocking with factory', () => {

  test('mocks node_modules', () => {
    axiosInstance.get('./path')

    expect(axiosInstance.get).toHaveBeenCalledTimes(1)
  })

})
