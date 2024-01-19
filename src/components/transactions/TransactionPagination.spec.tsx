import { render, screen } from '@testing-library/react';
import TransactionPagination from '@/components/transactions/TransactionPagination';

// beforeEach(() => {
//   let item = render(<AccountSummaryListItem {...accountSummaryListItem} />);
// });


describe("Transaction Pagination Component test", () => {
  test("should render first page as expected", () => {
    let item = render(<TransactionPagination collectionTotal={100} itemsPerPage={10} currentPage={1} />);
    expect(screen.getByTestId('transaction-pagination-container')).toBeInTheDocument();
  })

})