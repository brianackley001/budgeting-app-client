import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { AccountSummaryListItemType } from "../../types/accountSummaryListItem.ts";
import { Col, Row } from 'react-bootstrap';

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */


function AccountSummaryListItem(props: AccountSummaryListItemType) {
  //const { name, mask, type, balances, includeInTransactions } = props;

//<Accordion.Header data-testid="accordian-header">{props.name} (<i>...{props.mask}</i>)&nbsp;-&nbsp;<b>${props.balances.available}</b></Accordion.Header>



  return (
    <ListGroupItem data-testid="list-group-item-container">
      <Row className="mb-3">
        <Col xs="9" data-testid="list-item-name">
          <b>{props.name}</b>
        </Col>
        <Col xs="3" data-testid="list-item-balance">
          $<b>{props.balances.current}</b>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs="9" data-testid="list-item-institution-name">
          <i>{props.institution_name}</i>
        </Col>
        <Col xs="3" data-testid="list-item-status-icon">
        <i className="fa-regular fa-circle-check"></i>
        </Col>
      </Row>
    </ListGroupItem>
  );
}

export default AccountSummaryListItem;

