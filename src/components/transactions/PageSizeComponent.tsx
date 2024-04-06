import React , { useEffect, useState } from "react";
import { Badge, Button, Col, Form, Row } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faCircleCheck, faPencil, faXmark } from "@fortawesome/free-solid-svg-icons"
import { useAppDispatch, useAppSelector } from "@/hooks/useStoreHooks";
import { getPagedTransactions, setTransactionPagination } from "@store/transactionSlice";
import { setTransactionItemsPerPage}  from "@store/userSlice"

export default function PageSizeComponent(props) {
  const { pageSize } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showCancel, setShowCancel] = useState(true);
  const [editedSize, setEditedSize] = useState(pageSize);
  const dispatch = useAppDispatch();
  const paginationConfig = useAppSelector(state => state.transactionSlice.transactionPagination);
  const userId = useAppSelector(state => state.userSlice.userId);
  
  useEffect(() => {
    if (editedSize === pageSize) {
      setShowCancel(true);
    } else {
      setShowCancel(false);
    }
  }, [editedSize]);

  const handleToggleEditMode = () => {
    setShowEdit(!showEdit);
  }
  const handleFormButtonClick = (action: string) => {
    if (action === "save") {
      const updatedPaginationConfig = {
        ...paginationConfig,
        pageSize: Number(editedSize)
      };
      dispatch(setTransactionPagination(updatedPaginationConfig));
      dispatch(setTransactionItemsPerPage({id: userId, transactionItemsPerPage: Number(editedSize)}))
      dispatch(getPagedTransactions(updatedPaginationConfig));
    }
    setShowEdit(false);
  }

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedSize(e.target.value);
  }

  return (
    <div className="cardHeaderIconRight" data-testid="page-size-component-parent-container">
      {!showEdit &&
        <div data-testid="page-size-component-read-only-container" onClick={() => handleToggleEditMode()}>
          <Button variant="link" className="iconButton buttonLinkTextGrey" size="sm" tabIndex={0}>
          <FontAwesomeIcon icon={faPencil} className="iconStyle" color="gray" />
          <Badge pill bg="secondary" >
            {pageSize}
          </Badge> <span className="buttonLinkTextGrey">items per page</span>
          </Button>
        </div>}

      {showEdit &&
        <div data-testid="page-size-component-editable-container">
          <Form>
            <Row className="align-items-center">
              <Col xs="auto">
                <Form.Label htmlFor="inlineFormInput" visuallyHidden>
                  Items Per Page
                </Form.Label>
                <Form.Control
                  className="mb-2"
                  id="inlineFormInput"
                  type="number"
                  value={editedSize}
                  size="sm"
                  onChange={(e) => handleFormInputChange(e)}
                />
              </Col>
              <Col xs="auto">
                {showCancel && <Button onClick={() => handleFormButtonClick("cancel")} className="mb-2" size="sm">
                  <span><FontAwesomeIcon icon={faXmark} className="iconStyle" />Cancel</span>
                </Button>}
                {!showCancel && <Button onClick={() => handleFormButtonClick("save")} className="mb-2" size="sm">
                  <span><FontAwesomeIcon icon={faCircleCheck} className="iconStyle" />Save</span>
                </Button>}
              </Col>
            </Row>
          </Form>
        </div>}
    </div>
  );
}