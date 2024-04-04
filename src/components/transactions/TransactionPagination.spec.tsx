import { render, screen } from '@testing-library/react';
import TransactionPagination from '@/components/transactions/TransactionPagination';

describe("Transaction Pagination Component test", () => {
  test.skip("should render first page as expected", () => {
    render(<TransactionPagination collectionTotal={100} itemsPerPage={10} currentPage={1} />);
    expect(screen.getByTestId('transaction-pagination-container')).toBeInTheDocument();
  })
})