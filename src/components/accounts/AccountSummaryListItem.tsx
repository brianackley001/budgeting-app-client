import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { AccountSummaryListItemType } from "../../types/accountSummaryListItem.ts";
import { Col, Row } from 'react-bootstrap';

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */


function AccountSummaryListItem({item, balanceIsDebt}) {
  return (
    <ListGroupItem data-testid="list-group-item-container" variant="flush" eventKey={item.accountId}>
      <Row >
        <Col xs="9" data-testid="list-item-name" className='accountSummaryListItemText'>
          {item.name}
        </Col>
        <Col xs="3" data-testid="list-item-balance" className='accountSummaryListItemBalance'>
          {balanceIsDebt ? "-" : ""}{item.balances.current.toLocaleString('en-US', { style: 'currency', currency: 'USD' }) }
        </Col>
      </Row>
      <Row>
        <Col xs="9" data-testid="list-item-institution-name" className='accountSummaryListItemText'>
          <i>{item.institutionName}</i>
        </Col>
      </Row>
    </ListGroupItem>
  );
}

export default AccountSummaryListItem;

