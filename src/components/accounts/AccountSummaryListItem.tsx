import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { Col, Row } from 'react-bootstrap';
import {getElapsedTime} from "@utils/dateTimeUtils";

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */


function AccountSummaryListItem({item, balanceIsDebt}) {
  const accountDisplayValue = item.customName && item.customName.length > 0 ? item.customName : item.name;
  return (
    <ListGroupItem data-testid="list-group-item-container" variant="flush" eventKey={item.accountId}>
      <Row >
        <Col xs="9" data-testid="list-item-name" className='accountSummaryListItemText'>
          {accountDisplayValue}
        </Col>
        <Col xs="3" data-testid="list-item-balance" className='accountSummaryListItemBalance'>
          {balanceIsDebt ? "-" : ""}{item.balances.current.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }
        </Col>
      </Row>
      <Row>
        <Col xs="9" data-testid="list-item-institution-name" className='accountSummaryListItemText'>
          <i>{item.institutionName}</i>
        </Col>
        <Col xs="3" data-testid="list-item-last-updated-date" className='accountSummaryListItemText'>
          <i>{getElapsedTime(item.dateUpdated)}</i>
        </Col>
      </Row>
    </ListGroupItem>
  );
}

export default AccountSummaryListItem;

