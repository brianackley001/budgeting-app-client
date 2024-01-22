import { Col } from "react-bootstrap";


export default function PaginationSummaryComponent(props) {
  const { currentPage, pageSize, totalItemCount } = props;
  const startRecord = currentPage === 1 ? 1 : (currentPage -1) * pageSize + 1;
  const endRecord = currentPage === 1 ? pageSize : startRecord + pageSize - 1;

  return (
    <>
      <Col xs={6} data-testid="pagination-summary-container">
          <i>Showing <span data-testid="pagination-start-id">{startRecord}</span>-<span data-testid="pagination-end-id">{endRecord}</span> of <span data-testid="pagination-total">{totalItemCount}</span></i>
      </Col>
    </>
  );
}