import ListGroupItem from 'react-bootstrap/ListGroupItem'
import ListGroup from 'react-bootstrap/ListGroup';
import { Card, Row, Col } from "react-bootstrap";
import AccountSummaryListItem from "./AccountSummaryListItem.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheckDollar, faCreditCard, faBuildingColumns,faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons'
import { Key } from 'react';
/**
 * Renders List of Acouunt Summary Items
 * @param props
 */


function AccountSummaryList({ items }) {
  const bankAccounts = items.filter((item) => item.type === 'depository')
    .sort((a, b) => a.balances.current < b.balances.current ? 1 : -1);
  const creditCards = items.filter((item) => item.type === 'credit')
    .sort((a, b) => a.balances.current < b.balances.current ? 1 : -1);
  const loans = items.filter((item) => item.type === 'loan')
    .sort((a, b) => a.balances.current < b.balances.current ? 1 : -1);
  const investmentAccounts = items.filter((item) => item.type === 'investment')
    .sort((a, b) => a.balances.current < b.balances.current ? 1 : -1);
  const iconColorValue = "198754";
  //<Accordion.Header data-testid="accordian-header">{props.name} (<i>...{props.mask}</i>)&nbsp;-&nbsp;<b>${props.balances.available}</b></Accordion.Header>



  return (
    <>
      <Card.Body key={0}>
        <Card.Subtitle className="mb-2  text-bold">
        <span className='iconStyle'>
          <FontAwesomeIcon icon={faMoneyCheckDollar}  size='lg' style={{color: iconColorValue,}} />
        </span>
        Checking & Savings</Card.Subtitle>
        <span className='card-text'>
          <ListGroup variant="flush">
            {bankAccounts.map((accountItem: any, i: Key | null | undefined) => (
              <AccountSummaryListItem item={accountItem} balanceIsDebt={false} key={i} />
            ))}
          </ListGroup>
        </span>
      </Card.Body>

      <Card.Body key={1}>
        <Card.Subtitle className="mb-2text-bold">
        <span className='iconStyle'>
          <FontAwesomeIcon icon={faCreditCard}  size='lg' style={{color: iconColorValue,}} />
        </span>Credit Cards</Card.Subtitle>
        <span className='card-text'>
          <ListGroup variant="flush">
            {creditCards.map((accountItem: any, i: Key | null | undefined) => (
              <AccountSummaryListItem item={accountItem} balanceIsDebt={true} key={i} />
            ))}
          </ListGroup>
        </span>
      </Card.Body>

      <Card.Body key={2}>
        <Card.Subtitle className="mb-2 text-bold">
        <span className='iconStyle'>
          <FontAwesomeIcon icon={faMoneyBillTrendUp}  size='lg' style={{color: iconColorValue,}} />
        </span>Investments</Card.Subtitle>
          <span className='card-text'>
          <ListGroup variant="flush">
            {investmentAccounts.map((accountItem: any, i: Key | null | undefined) => (
              <AccountSummaryListItem item={accountItem} balanceIsDebt={false} key={i} />
            ))}
          </ListGroup>
          </span>
      </Card.Body>

      <Card.Body key={3}>
        <Card.Subtitle className="mb-2 text-bold">
        <span className='iconStyle'>
          <FontAwesomeIcon icon={faBuildingColumns}  size='lg' style={{color: iconColorValue,}} />
        </span>Loans</Card.Subtitle>
        <span className='card-text'>
          <ListGroup variant="flush">
            {loans.map((accountItem: any, i: Key | null | undefined) => (
              <AccountSummaryListItem item={accountItem} balanceIsDebt={true} key={i} />
            ))}
          </ListGroup>
        </span>
      </Card.Body>
    </>
  );
}

export default AccountSummaryList;

