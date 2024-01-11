import ListGroupItem from 'react-bootstrap/ListGroupItem'
import { AccountSummaryListItemType } from "../../types/accountSummaryListItem.ts";
import { Col, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faCheckCircle } from '@fortawesome/free-solid-svg-icons'

/**
 * Renders information about the user obtained from MS Graph
 * @param props
 */


function AccountSummaryListItem({item}) {
  //const { name, mask, type, balances, includeInTransactions } = props;

//<Accordion.Header data-testid="accordian-header">{props.name} (<i>...{props.mask}</i>)&nbsp;-&nbsp;<b>${props.balances.available}</b></Accordion.Header>



  return (
    <ListGroupItem data-testid="list-group-item-container" key={item.id}>
      <Row className="mb-3">
        <Col xs="9" data-testid="list-item-name">
          <b>{item.name}</b>
        </Col>
        <Col xs="3" data-testid="list-item-balance">
          $<b>{item.balances.current}</b>
        </Col>
      </Row>
      <Row className="mb-3">
        <Col xs="9" data-testid="list-item-institution-name">
          <i>{item.institutionName}</i>
        </Col>
        {/* <Col xs="3" data-testid="list-item-status-icon">
        <FontAwesomeIcon color='green' icon={faCheckCircle} />
        </Col> */}
      </Row>
    </ListGroupItem>
  );
}

export default AccountSummaryListItem;

