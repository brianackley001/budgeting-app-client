import React, { Fragment } from 'react'; 
import { Accordion, Form, OverlayTrigger, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome"
import { faTriangleExclamation } from "@fortawesome/free-solid-svg-icons"

export default function AccountAccordianItem(props) {
  const { accounts, accountTypeIdLabel, accountTypeLabel, eventKey, onSelect, trackedAccounts } = props;
  return (
    <>
      {accounts.length > 0 &&
        <Accordion.Item eventKey={eventKey} data-testid="account-accordion-item-container">
          <Accordion.Header data-testid="account-accordion-item-header">{accountTypeLabel}</Accordion.Header>
          <Accordion.Body data-testid="account-accordion-item-body">
            {
              accounts.map((accountItem) => (
                <Fragment key={`account-accordion-item-fragment-container-${accountItem.accountId}`}>
                {!accountItem.includeAccountTransactions &&
                  <div data-testid={`account-accordion-item-account-excluded-warning-container-${accountItem.accountId}`}>
                  <span key={`warning-text-message-${accountItem.accountId}`} className='text-info'><i>Account excluded from transactions</i></span>
                  <FontAwesomeIcon key={`fa-warning-icon-${accountItem.accountId}`}  icon={faTriangleExclamation} className='text-info' 
                    size="xl" title='This account is excluded from transactions' 
                    style={{float: "right"}} />
                  </div>
                }
                <OverlayTrigger key={`overlay-trigger-${accountItem.accountId}`} placement='right' overlay={
                  <Tooltip id={`tooltip-${accountItem.accountId}`}  key={`tooltip-key-${accountItem.accountId}`} 
                    data-testid={`account-accordion-item-tooltip-${accountItem.accountId}`} >
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
                    data-testid={`account-accordion-item-account-form-checkbox-${accountItem.accountId}`}
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