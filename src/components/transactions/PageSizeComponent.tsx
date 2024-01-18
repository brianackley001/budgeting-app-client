import React , { useEffect, useState } from 'react';
import { Badge, Button, Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCircleCheck, faPencil, faXmark } from '@fortawesome/free-solid-svg-icons'
import { setPaginationPageSize } from "../../store/transactionSlice";
import { useAppDispatch} from "../../hooks/storeHooks";

export default function PageSizeComponent(props) {
  const { pageSize } = props;
  const [showEdit, setShowEdit] = useState(false);
  const [showCancel, setShowCancel] = useState(true);
  const [editedSize, setEditedSize] = useState(pageSize);
  const dispatch = useAppDispatch();
  
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
      dispatch(setPaginationPageSize(editedSize));
    }
    setShowEdit(false);
  }

  const handleFormInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setEditedSize(e.target.value);
  }

  return (
    <>
      <div className="cardHeaderIconRight"  data-testid="page-size-component-parent-container">
        {!showEdit ?
          <div data-testid="page-size-component-read-only-container" onClick={() => handleToggleEditMode()}>
            <FontAwesomeIcon icon={faPencil} className='iconStyle' color="gray" />
            <Badge pill bg="secondary" >
              {pageSize}
            </Badge> items per page
          </div> : null}

        {showEdit ?
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
                { showCancel ? <Button onClick={() => handleFormButtonClick("cancel")} className="mb-2" size="sm">
                    <span><FontAwesomeIcon icon={faXmark} className='iconStyle' />Cancel</span>
                  </Button>: null}
                  {!showCancel ? <Button onClick={() => handleFormButtonClick("save")} className="mb-2" size="sm">
                    <span><FontAwesomeIcon icon={faCircleCheck} className='iconStyle' />Save</span>
                  </Button> : null}
                </Col>
              </Row>
            </Form>
          </div> : null}
      </div>
    </>
  );
}