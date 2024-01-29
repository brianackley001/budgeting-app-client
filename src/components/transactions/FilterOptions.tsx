import { useState } from "react";
import { useAppDispatch } from "@hooks/storeHooks";
import { getPagedTransactions, setTransactionPagination } from "@store/transactionSlice";
import { Accordion, Button, Col, Form, FormGroup, FormControl, Offcanvas, OverlayTrigger, Row, Tooltip } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import AccountTypeAccordian from "./filterOptions/AccountTypeAccordian";
import AmountAccordianItem from "./filterOptions/AmountAccordianItem";
import DateRangeAccordianItem from "./filterOptions/DateRangeAccordianItem";
import NotesAccordianItem from "./filterOptions/NotesAccordianItem";
import TagAccordianItem from "./filterOptions/TagAccordianItem";

export default function FilterOptions(props) {
  const { accounts, paginationConfig, placement, tags } = props;
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);
  
  const initPaginationConfigState = (stateItem) => {
    switch (stateItem) {
      case "accountIds":
        return paginationConfig.accountIds.split(",").length === accounts.filter(account => account.includeAccountTransactions).length 
            ? [] 
            : paginationConfig.accountIds.split(",");
      case "endDate":
        return paginationConfig.endDate.length > 0 ? paginationConfig.endDate : "";
      case "startDate":
        return paginationConfig.startDate.length > 0 ? paginationConfig.startDate : "";
      case "notes":
        return paginationConfig.userNotesSearchValue.length > 0 ? paginationConfig.userNotesSearchValue : "";
      case "tags": 
        return paginationConfig.tagSearchValue.length > 0 ? paginationConfig.tagSearchValue.split(",") : [];
      default:
        return "";
    }
  };

  // Track form field values for submission:
  const [endDate, setEndDate] = useState(initPaginationConfigState("endDate"));
  const [startDate, setStartDate] = useState(initPaginationConfigState("startDate"));
  const [trackedAccounts, setTrackedAccounts] = useState(initPaginationConfigState("accountIds"));
  const [trackedFromAmount, setTrackedFromAmount] = useState(0);
  const [trackedTags, setTrackedTags] = useState(initPaginationConfigState("tags"));
  const [trackedToAmount, setTrackedToAmount] = useState(0);
  const [userNotes, setUserNotes] = useState(initPaginationConfigState("notes"));

  //Event Handler Methods:
  const handleAccountCheckboxChange = (event) => {
    const checkedId = event.target.value;
    if (event.target.checked) {
      setTrackedAccounts([...trackedAccounts, checkedId])
    } else {
      setTrackedAccounts(trackedAccounts.filter(id => id !== checkedId))
    }
  }

  const handleAmountChange = (event, boundaryValue) => {
    if (boundaryValue === "fromAmount") {
      setTrackedFromAmount(event.target.value);
    }
    else {
      setTrackedToAmount(event.target.value);
    }
  }

  const handleClose = () => {
    setShow(false);
  };

  const handleDateRangeChange = (event, dateType) => {
    if (dateType === "startDate") {
      setStartDate(event.target.value);
    }
    else {
      setEndDate(event.target.value);
    }
  }

  const handleFormSubmit = () => {
    const accountIdCollectionSubmitValue = trackedAccounts.length > 0 
        ? trackedAccounts.join(",") 
        : accounts.filter(account => account.includeAccountTransactions).map(account => account.accountId).join(",") ;

    const updatedPaginationConfig = {
      ...paginationConfig,
      accountIds: accountIdCollectionSubmitValue,
      amountFrom: trackedFromAmount > 0 ? trackedFromAmount : paginationConfig.amountFrom,
      amountTo: trackedToAmount > 0 ? trackedToAmount : paginationConfig.amountTo,
      startDate: startDate.length > 0 ? startDate : paginationConfig.startDate,
      endDate: endDate.length > 0 ? endDate : paginationConfig.endDate,
      tagSearchValue: trackedTags.length > 0 ? trackedTags.join(",") : "",
      userNotesSearchValue: userNotes.length > 0 ? userNotes : paginationConfig.userNotesSearchValue
    };
    dispatch(setTransactionPagination(updatedPaginationConfig));
    dispatch(getPagedTransactions(updatedPaginationConfig));
  }

  const handleNotesChange = (event) => {
    setUserNotes(event.target.value);
  }

  const handleReset = () => {
    setTrackedAccounts([]);
    setEndDate("");
    setStartDate("");
    setTrackedFromAmount(0);
    setTrackedToAmount(0);
    setTrackedTags([]);
    setUserNotes("");
  }

  const handleShow = () => setShow(true);

  const handleTagCheckboxChange = (event) => {
    const checkedName = event.target.name;
    if (event.target.checked) {
      setTrackedTags([...trackedTags, checkedName])
    } else {
      setTrackedTags(trackedTags.filter(id => id !== checkedName))
    }
  }

  return (
    <>
      <span className="cardHeaderIconRight">
        <Button variant="primary" onClick={handleShow} className="me-2">
          <FontAwesomeIcon icon={faFilter} flip="horizontal" className="iconStyle" />Filters
        </Button>
      </span>
      <Offcanvas show={show} onHide={handleClose} placement={placement} backdrop="static">
        <Offcanvas.Header closeButton>
          <Offcanvas.Title as="div"><FontAwesomeIcon icon={faFilter} size="xl" flip="horizontal" className="iconStyle text-primary" /><span className="text-primary">Transaction Filters</span></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form noValidate validated={validated} data-testid="filter-options-form">   {/* onSubmit={handleFormSubmit} */}
            <Row>
              <Col xs={6}>
                <h6>Account Types</h6>
              </Col>
              <Col xs={6}>
                <h6>Other Filters</h6>
              </Col>
            </Row>
            <Row>
              <Col xs={6}>
                <AccountTypeAccordian accounts={accounts} 
                  onSelect={(eventItem: any) => handleAccountCheckboxChange(eventItem)} 
                  trackedAccounts={trackedAccounts} />
              </Col>
              <Col xs={6}>
                <Accordion flush>
                  <DateRangeAccordianItem eventKey={0}
                    onSelect={(eventItem: any, dateType: string) => handleDateRangeChange(eventItem, dateType)}
                    trackedStartDate={startDate} trackedEndDate={endDate} />
                  <TagAccordianItem eventKey={1}
                    onSelect={(eventItem: any) => { handleTagCheckboxChange(eventItem) }}
                    trackedTags={trackedTags} tags={tags} />
                  <NotesAccordianItem eventKey={2} 
                    onSelect={(eventItem: any) => { handleNotesChange(eventItem) }} 
                    trackedValue={userNotes} />
                  <AmountAccordianItem eventKey={3}
                    onSelect={(eventItem: any, boundaryValue: string) => handleAmountChange(eventItem, boundaryValue)}
                    trackedFromAmount={trackedFromAmount} 
                    trackedToAmount={trackedToAmount} />
                </Accordion>
              </Col>
            </Row>
            <Row>
              <Col xs={7}>
                &nbsp;
              </Col>
              <Col xs={5}>
                <Button variant="secondary" onClick={handleReset} className="me-2">Reset</Button>
                <Button variant="primary" onClick={() =>{handleFormSubmit()}} className="me-2">Apply Filters
                </Button>
              </Col>
            </Row>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>

    </>
  );
}
