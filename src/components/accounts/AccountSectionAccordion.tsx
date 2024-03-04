import { Key } from 'react';
import ListGroup from 'react-bootstrap/ListGroup';
import { Accordion, Card} from "react-bootstrap";
import AccountSummaryListItem from "./AccountSummaryListItem.tsx";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faMoneyCheckDollar, faCreditCard, faBuildingColumns,faMoneyBillTrendUp } from '@fortawesome/free-solid-svg-icons'

/**
 * Renders Account Summary Section of grouped account types (e.g. Checking & Savings, Credit Cards, etc.)
 * @param props
 */


function AccountSectionAccordion({ items, balanceIsDebt, testLabels, iconColorValue, iconId, sectionLabel }) {
  let iconSelection;
  if (iconId === 'depository') {
    iconSelection = faMoneyCheckDollar;
  } else if (iconId === 'credit') {
    iconSelection = faCreditCard;
  } else if (iconId === 'loan') {
    iconSelection = faBuildingColumns;
  } else if (iconId === 'investment') {
    iconSelection = faMoneyBillTrendUp;
  } else {
    iconSelection = faMoneyCheckDollar;
  }
  return (
    <>
      <Accordion data-testid={testLabels.container} defaultActiveKey="0">
        <Accordion.Item eventKey="0">
          <Card.Body>
            <Accordion.Header data-testid={testLabels.accordianHeader}>
              <Card.Subtitle className="mb-2 text-bold">
                <span className='iconStyle'>
                  <FontAwesomeIcon icon={iconSelection} size='lg' style={{ color: iconColorValue, }} />
                </span>
                {sectionLabel}</Card.Subtitle>
            </Accordion.Header>
            <Accordion.Body data-testid={testLabels.accordianBody}>

              <span className='card-text'>
                <ListGroup variant="flush">
                  {items.map((accountItem: any, i: Key | null | undefined) => (
                    <AccountSummaryListItem item={accountItem} balanceIsDebt={balanceIsDebt} key={i} />
                  ))}
                </ListGroup>
              </span>
            </Accordion.Body>
          </Card.Body>
        </Accordion.Item>
      </Accordion>
    </>
)};

export default AccountSectionAccordion;

