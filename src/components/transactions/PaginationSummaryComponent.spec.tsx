import { render, screen} from '@utils/test-utils'
import { describe, expect } from "vitest";
import PaginationSummaryComponent from './PaginationSummaryComponent';


//currentPage, pageSize, totalItemCount
describe("Transaction Pagination Summary test", () => {
  test.each([
    { currentPage: 1, pageSize:10, totalItemCount:15, expected: {start:1, end:10, total:15}},
    { currentPage: 2, pageSize:10, totalItemCount:101, expected: {start:11, end:20, total:101}},
    { currentPage: 3, pageSize:5, totalItemCount:158, expected: {start:11, end:15, total:158}},
    { currentPage: 4, pageSize:2, totalItemCount:20, expected: {start:7, end:8, total:20}},
    { currentPage: 15, pageSize:20, totalItemCount:390, expected: {start:281, end:300, total:390}},
  ])('Pagination Summary($currentPage, $pageSize, $totalItemCount) -> $expected', (
    { currentPage, pageSize, totalItemCount, expected }) => {
    // Act
    let item = render(
      <PaginationSummaryComponent 
        currentPage={currentPage} 
        pageSize={pageSize} 
        totalItemCount={totalItemCount} /> as React.ReactElement<any, string | React.JSXElementConstructor<any>>
      );
    
    // Assert
    expect(screen.getByTestId('pagination-summary-container')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-start-id')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-start-id')).toHaveTextContent(expected.start.toString());
    expect(screen.getByTestId('pagination-end-id')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-end-id')).toHaveTextContent(expected.end.toString());
    expect(screen.getByTestId('pagination-total')).toBeInTheDocument();
    expect(screen.getByTestId('pagination-total')).toHaveTextContent(expected.total.toString());
  });

})