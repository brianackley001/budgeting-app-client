import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup';
import { Card, Row, Col } from "react-bootstrap";
import AccountSummaryListItem from "./AccountSummaryListItem.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheckDollar, faCreditCard, faBuildingColumns,faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons'
/**
 * Renders List of Acouunt Summary Items
 * @param props
 */


function AccountSummaryList({ items }) {
  const bankAccounts = items.filter((item) => item.type === 'depository');
  const creditCards = items.filter((item) => item.type === 'credit');
  const loans = items.filter((item) => item.type === 'loan');
  const investmentAccounts = items.filter((item) => item.type === 'investment');

  //<Accordion.Header data-testid="accordian-header">{props.name} (<i>...{props.mask}</i>)&nbsp;-&nbsp;<b>${props.balances.available}</b></Accordion.Header>

// <FontAwesomeIcon icon={faMoneyCheckDollar} /> 
//<FontAwesomeIcon icon={faCreditCard} />
//<FontAwesomeIcon icon={faBuildingColumns} />
//<FontAwesomeIcon icon={faMoneyBillTrendUp} />


  return (
    // <ListGroupItem data-testid="list-group-item-container" key={item.id}>
    //   <Row >
    //     <Col xs="9" data-testid="list-item-name">
    //       {item.name}
    //     </Col>
    //     <Col xs="3" data-testid="list-item-balance">
    //       <b>${item.balances.current}</b>
    //     </Col>
    //   </Row>
    //   <Row>
    //     <Col xs="9" data-testid="list-item-institution-name">
    //       <i>{item.institutionName}</i>
    //     </Col>
    //     {/* <Col xs="3" data-testid="list-item-status-icon">
    //     <FontAwesomeIcon color='green' icon={faCheckCircle} />
    //     </Col> */}
    //   </Row>
    // </ListGroupItem>
    // <ListGroup variant="flush">
    //             {accountItems.map((accountItem) => (
    //               <AccountSummaryListItem item={accountItem} key={accountItem.id} />
    //             ))}
    //           </ListGroup>
    <>
      <Card.Body>
        <Card.Subtitle className="mb-2  text-bold">
        <span className='iconStyle'>
          <FontAwesomeIcon icon={faMoneyCheckDollar}  size='lg' style={{color: "#2baf3d",}} />
        </span>
        Checking & Savings</Card.Subtitle>
        <Card.Text>
          <ListGroup variant="flush">
            {bankAccounts.map((accountItem) => (
              <AccountSummaryListItem item={accountItem} balanceIsDebt={false} key={accountItem.id} />
            ))}
          </ListGroup>
        </Card.Text>
      </Card.Body>

      <Card.Body>
        <Card.Subtitle className="mb-2text-bold">
        <span className='iconStyle'>
          <FontAwesomeIcon icon={faCreditCard}  size='lg' style={{color: "#2baf3d",}} />
        </span>Credit Cards</Card.Subtitle>
        <Card.Text>
          <ListGroup variant="flush">
            {creditCards.map((accountItem) => (
              <AccountSummaryListItem item={accountItem} balanceIsDebt={true} key={accountItem.id} />
            ))}
          </ListGroup>
        </Card.Text>
      </Card.Body>

      <Card.Body>
        <Card.Subtitle className="mb-2 text-bold">
        <span className='iconStyle'>
          <FontAwesomeIcon icon={faMoneyBillTrendUp}  size='lg' style={{color: "#2baf3d",}} />
        </span>Investments</Card.Subtitle>
        <Card.Text>
          <ListGroup variant="flush">
            {investmentAccounts.map((accountItem) => (
              <AccountSummaryListItem item={accountItem} balanceIsDebt={false} key={accountItem.id} />
            ))}
          </ListGroup>
        </Card.Text>
      </Card.Body>

      <Card.Body>
        <Card.Subtitle className="mb-2 text-bold">
        <span className='iconStyle'>
          <FontAwesomeIcon icon={faBuildingColumns}  size='lg' style={{color: "#2baf3d",}} />
        </span>Loans</Card.Subtitle>
        <Card.Text>
          <ListGroup variant="flush">
            {loans.map((accountItem) => (
              <AccountSummaryListItem item={accountItem} balanceIsDebt={true} key={accountItem.id} />
            ))}
          </ListGroup>
        </Card.Text>
      </Card.Body>
    </>
  );
}

export default AccountSummaryList;

