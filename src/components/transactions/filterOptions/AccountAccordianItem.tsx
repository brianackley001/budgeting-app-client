
import { Fragment } from 'react';
import { Accordion, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

export default function AccountAccordianItem(props) {
  const { accounts, accountTypeIdLabel, accountTypeLabel, eventKey, onSelect, trackedAccounts } = props;
  return (
    <>
      {accounts.length > 0 &&
        <Accordion.Item eventKey={eventKey}>
          <Accordion.Header>{accountTypeLabel}</Accordion.Header>
          <Accordion.Body>
            {
              accounts.map((accountItem) => (
                <Fragment key={`account-accordian-item-fragment-container-${accountItem.accountId}`}>
                {!accountItem.includeAccountTransactions &&
                  <>
                  <span key={`warning-text-message-${accountItem.accountId}`} className='text-info'><i>Account excluded from transactions</i></span>
                  <FontAwesomeIcon key={`fa-warning-icon-${accountItem.accountId}`}  icon={faTriangleExclamation} className='text-info' size="xl" title='This account is excluded from transactions' style={{float: "right"}} />
                  </>
                }
                <OverlayTrigger key={`overlay-trigger-${accountItem.accountId}`} placement='right' overlay={
                  <Tooltip id={`tooltip-${accountItem.accountId}`}  key={`tooltip-key-${accountItem.accountId}`} >
                    <strong>{accountItem.institutionName}</strong>
                  </Tooltip>
                }>
                  <Form.Check
                    key={`form-check-${accountItem.accountId}`}
                    label={accountItem.customName && accountItem.customName.length > 0 ? accountItem.customName : accountItem.name}
                    name={`${accountTypeIdLabel}-${accountItem.accountId}`}
                    value={accountItem.accountId}
                    checked={trackedAccounts.includes(accountItem.accountId)}
                    type="checkbox"
                    id={accountItem.accountId}
                    title={accountItem.institutionName}
                    disabled={!accountItem.includeAccountTransactions}
                    onChange={(event) => { onSelect(event) }}
                  />
                </OverlayTrigger>
                </Fragment>
              ))
            }
          </Accordion.Body>
        </Accordion.Item>}
    </>
  )
};