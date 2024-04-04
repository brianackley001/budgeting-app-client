import { useState } from "react";
import { useAppDispatch } from "@/hooks/useStoreHooks";
import { getPagedTransactions, setTransactionPagination } from "@store/transactionSlice";
import { Accordion, Button, Col, Form, Offcanvas, Row} from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faFilter } from "@fortawesome/free-solid-svg-icons"
import AccountTypeAccordion from "./filterOptions/AccountTypeAccordion";
import AmountAccordionItem from "./filterOptions/AmountAccordionItem";
import CategoryAccordionItem from "./filterOptions/CategoryAccordionItem";
import DateRangeAccordionItem from "./filterOptions/DateRangeAccordionItem";
import MerchantNameAccordionItem from "./filterOptions/MerchantNameAccordion";
import NotesAccordionItem from "./filterOptions/NotesAccordionItem";
import TagAccordionItem from "./filterOptions/TagAccordionItem";

export default function FilterOptions(props: any){
  const { accounts, filteringInEffect, paginationConfig, placement, tags } = props;
  const dispatch = useAppDispatch();

  const [show, setShow] = useState(false);
  const [validated, setValidated] = useState(false);

  // Track form field values for submission:
  const [trackedAccounts, setTrackedAccounts] = useState( paginationConfig.accountIds.length === accounts.filter(account => account.includeAccountTransactions).length 
    ? [] 
    : paginationConfig.accountIds.map(accountId => accountId.toString()));
  const [trackedCategory, setTrackedCategory] = useState(paginationConfig.categorySearchValue.length > 0 ? paginationConfig.categorySearchValue : "");
  const [trackedEndDate, setTrackedEndDate] = useState(paginationConfig.endDate.length > 0 ? paginationConfig.endDate : "");
  const [trackedFromAmount, setTrackedFromAmount] = useState(paginationConfig.amountFrom.length > 0 ? paginationConfig.amountFrom : 0);
  const [trackedMerchantName, setTrackedMerchantName] = useState(paginationConfig.merchantNameSearchValue.length > 0 ? paginationConfig.merchantNameSearchValue : "")
  const [trackedStartDate, setTrackedStartDate] = useState(paginationConfig.startDate.length > 0 ? paginationConfig.startDate : "");
  const [trackedTags, setTrackedTags] = useState(paginationConfig.tagSearchValue.length > 0 ? paginationConfig.tagSearchValue.split(",") : []);
  const [trackedToAmount, setTrackedToAmount] = useState(paginationConfig.amountTo.length > 0 ? paginationConfig.amountTo : 0);;
  const [trackedUserNotes, setTrackedUserNotes] = useState(paginationConfig.userNotesSearchValue.length > 0 ? paginationConfig.userNotesSearchValue : "");

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
  
  const handleCategoryChange = (event) => {
    setTrackedCategory(event.target.value);
  }

  const handleDateRangeChange = (event, dateType) => {
    if (dateType === "startDate") {
      setTrackedStartDate(event.target.value);
    }
    else {
      setTrackedEndDate(event.target.value);
    }
  }

  const handleFormSubmit = (isReset) => {
    if(!isReset){
      setValidated(true);
    }

    const accountIdCollectionSubmitValue = isReset ? 
      accounts.map(account => account.accountId) : 
      trackedAccounts.length > 0 
        ? trackedAccounts 
        : accounts.filter(account => account.includeAccountTransactions).map(account => account.accountId);

    const pageNumber = isReset ? 
        1 : 
        (trackedFromAmount > 0 || trackedToAmount > 0 || trackedCategory.length > 0 || 
        trackedEndDate.length > 0 || trackedStartDate.length > 0 || trackedTags.length > 0 || 
        trackedUserNotes.length > 0) ? 1 : paginationConfig.pageNumber;

    const updatedPaginationConfig = {
      ...paginationConfig,
      accountIds: accountIdCollectionSubmitValue,
      amountFrom: isReset ? 0 : trackedFromAmount > 0 ? trackedFromAmount : 0,
      amountTo: isReset ? 0 : trackedToAmount > 0 ? trackedToAmount : 0,
      categorySearchValue: isReset ? "" : trackedCategory.length > 0 ? trackedCategory.toUpperCase() : "", // PLAID Category format = "CATEGORY_SUBCATEGORY"
      endDate: isReset ? "" : trackedEndDate.length > 0 ? trackedEndDate : "",
      merchantNameSearchValue: isReset ? "" : trackedMerchantName.length > 0 ? trackedMerchantName : "",
      pageNumber: pageNumber,
      startDate: isReset ? "" : trackedStartDate.length > 0 ? trackedStartDate : "",
      tagSearchValue: isReset ? "" : trackedTags.length > 0 ? trackedTags.join(",") : "",
      userNotesSearchValue: isReset ? "" : trackedUserNotes.length > 0 ? trackedUserNotes : ""
    };
    dispatch(setTransactionPagination(updatedPaginationConfig));
    dispatch(getPagedTransactions(updatedPaginationConfig));
    handleClose();
  }

  const handleMerchantNameChange = (event) => {
    setTrackedMerchantName(event.target.value);
  }

  const handleNotesChange = (event) => {
    setTrackedUserNotes(event.target.value);
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
        <Button variant={filteringInEffect ? "warning": "primary"} onClick={handleShow} className="me-2">
          <FontAwesomeIcon icon={faFilter} flip="horizontal" className="iconStyle" />Filters
        </Button>
      </span>
      <Offcanvas show={show} onHide={handleClose} placement={placement} backdrop="static" className="vw-100" >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title as="div"><FontAwesomeIcon icon={faFilter} size="xl" flip="horizontal" className="iconStyle text-primary" /><span className="text-primary">Transaction Filters</span></Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <Form noValidate validated={validated} data-testid="filter-options-form">
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
                <AccountTypeAccordion accounts={accounts} 
                  onSelect={(eventItem: any) => handleAccountCheckboxChange(eventItem)} 
                  trackedAccounts={trackedAccounts} />
              </Col>
              <Col xs={6}>
                <Accordion flush>
                  <MerchantNameAccordionItem eventKey={"MerchantNameAccordionItemFilter"}
                    onSelect={(eventItem: any) => { handleMerchantNameChange(eventItem) }} 
                    trackedValue={trackedMerchantName} />
                  <TagAccordionItem eventKey={"TagAccordionItemFilter"}
                    onSelect={(eventItem: any) => { handleTagCheckboxChange(eventItem) }}
                    trackedTags={trackedTags} tags={tags} />
                  <CategoryAccordionItem eventKey={4} onSelect={(eventItem: any) => { handleCategoryChange(eventItem) }}
                    trackedValue={trackedCategory} />
                  <NotesAccordionItem eventKey={"NotesAccordionItemFilter"} 
                    onSelect={(eventItem: any) => { handleNotesChange(eventItem) }} 
                    trackedValue={trackedUserNotes} />
                  <DateRangeAccordionItem eventKey={"DateRangeAccordionItemFilter"}
                      onSelect={(eventItem: any, dateType: string) => handleDateRangeChange(eventItem, dateType)}
                      trackedStartDate={trackedStartDate} trackedEndDate={trackedEndDate} />
                  <AmountAccordionItem eventKey={"AmountAccordionItemFilter"}
                    onSelect={(eventItem: any, boundaryValue: string) => handleAmountChange(eventItem, boundaryValue)}
                    trackedFromAmount={trackedFromAmount} 
                    trackedToAmount={trackedToAmount} />
                </Accordion>
              </Col>
            </Row>
            <Row>
              <Col xs={2}>&nbsp;</Col>
              <Col xs={8} className="mx-auto mt-5">
                <Button variant="secondary" onClick={() =>{handleFormSubmit(true)}}className="mx-5">Reset</Button>
                <Button variant="primary" onClick={() =>{handleFormSubmit(false)}} className="mx-5">Apply Filters
                </Button>
              </Col>
              <Col xs={2}>&nbsp;</Col>
            </Row>
          </Form>
        </Offcanvas.Body>
      </Offcanvas>
    </>
  );
}
