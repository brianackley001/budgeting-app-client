import { useEffect, useState } from "react";
import { Badge, Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBookmark,faCircleCheck, faXmark } from "@fortawesome/free-solid-svg-icons";
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { getPagedTransactions, setActivePageItems, setTransactionPagination } from "@store/transactionSlice";
import { paginationLinkSet } from "@utils/transactionUtils"

export const TransactionPageJump = (props) => {
  const { paginationConfig } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [jumpPageValue, setJumpPageValue] = useState(paginationConfig.pageNumber);
  const [showCancel, setShowCancel] = useState(true);
  const [pageRangeValueIsValid, setPageRangeValueIsValid] = useState(true);
  const [textBoxClass, setTextBoxClass] = useState("mb-2");
  const dispatch = useAppDispatch();
  const maxInteractivePages = Number(import.meta.env.VITE_TRANSACTION_PAGINATION_SET_SIZE) || 5;
  const transactionPaginationSize = useAppSelector(state => state.userSlice.preferences.transactionItemsPerPage);
  const pages = Math.ceil(paginationConfig.total / transactionPaginationSize); 

  useEffect(() => {
    const jumpPageValueIsValid = jumpPageValue >= 1 && jumpPageValue <= pages;
    const showCancelButton = jumpPageValue === paginationConfig.pageNumber;
    const textBoxClassValue = jumpPageValueIsValid ? "mb-2" : "mb-2 textbox-error-pre-submit";
    setShowCancel(showCancelButton);
    setPageRangeValueIsValid(jumpPageValueIsValid);
    setTextBoxClass(textBoxClassValue);
  }, [jumpPageValue]);

  const handleToggleEditMode = () => {
    setShowEdit(!showEdit);
  };
  
  const handleFormButtonClick = (action: string) => {
    if (action === "save") {
      const activePageSet = paginationLinkSet(
        paginationConfig.pageNumber,
        jumpPageValue,
        maxInteractivePages,
        pages,
        false,
        false
      );
      const updatedPaginationConfig = {
        ...paginationConfig,
        pageNumber: Number(jumpPageValue),
      };
      dispatch(setTransactionPagination(updatedPaginationConfig));
      dispatch(setActivePageItems(activePageSet));
      dispatch(getPagedTransactions(updatedPaginationConfig));
    }
    setShowEdit(false);
  };
  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setJumpPageValue(e.target.value);
  };


  return (
    <div data-testid="transaction-page-jump-container"  className="d-flex align-items-center  
    justify-content-center mt-2">
      {!showEdit && (
        <div data-testid="transaction-page-jump-cta">
          <Button
            variant="link"
            className="iconButton buttonLinkTextGrey"
            size="sm"
            onClick={() => handleToggleEditMode()}
          >
            <FontAwesomeIcon
              icon={faBookmark}
              className="iconStyle"
              color="gray"
            />
            <span className="buttonLinkTextGrey">jump to page</span>
          </Button>
        </div>
      )}
      {showEdit && 
        <div data-testid="transaction-page-jump-form">
          <Form>
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                  Go To Page
                </Form.Label>
                <Form.Control
                  className={textBoxClass}
                  id="inlineFormInput"
                  type="number"
                  value={jumpPageValue}
                  size="sm"
                  onChange={(e) => handleFormInputChange(e)}
                />
              </Col>
              <Col xs="auto">
                {showCancel && <Button onClick={() => handleFormButtonClick("cancel")} className="mb-2" size="sm">
                  <span><FontAwesomeIcon icon={faXmark} className="iconStyle" />Cancel</span>
                </Button>}
                {!showCancel && <Button onClick={() => handleFormButtonClick("save")} className="mb-2" size="sm" disabled={!pageRangeValueIsValid}>
                  <span><FontAwesomeIcon icon={faCircleCheck} className="iconStyle" />Save</span>
                </Button>}
              </Col>
            </Row>
          </Form>
        </div>}
    </div>
  );
};
