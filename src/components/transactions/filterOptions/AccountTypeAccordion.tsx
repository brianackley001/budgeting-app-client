
import { Accordion } from 'react-bootstrap';
import AccountAccordionItem from './AccountAccordionItem';

export default function AccountTypeAccordion (props) {
  const { accounts, onSelect, trackedAccounts } = props;

  const depositoryAccounts = accounts.filter((account) => account.type.toLowerCase() === "depository");
  const creditAccounts = accounts.filter((account) => account.type.toLowerCase() === "credit");
  const investmentAccounts = accounts.filter((account) => account.type.toLowerCase() === "investment");
  const loanAccounts = accounts.filter((account) => account.type.toLowerCase() === "loan");

  return (
    <>
      {accounts && accounts.length > 0 &&
        <Accordion flush>
          {depositoryAccounts && depositoryAccounts.length > 0 &&
            <AccountAccordionItem
              accounts={depositoryAccounts}
              accountTypeIdLabel="depository"
              accountTypeLabel="Checking and Savings"
              eventKey={0}
              onSelect={(eventItem: any) => onSelect(eventItem)}
              trackedAccounts={trackedAccounts} />
          }
          {creditAccounts && creditAccounts.length > 0 &&
            <AccountAccordionItem
              accounts={creditAccounts}
              accountTypeIdLabel="credit"
              accountTypeLabel="Credit"
              eventKey={1}
              onSelect={(eventItem: any) => onSelect(eventItem)}
              trackedAccounts={trackedAccounts} />
          }
          {investmentAccounts && investmentAccounts.length > 0 &&
            <AccountAccordionItem
              accounts={investmentAccounts}
              accountTypeIdLabel="investment"
              accountTypeLabel="Investment"
              eventKey={2}
              onSelect={(eventItem: any) => onSelect(eventItem)}
              trackedAccounts={trackedAccounts} />
          }
          {loanAccounts && loanAccounts.length > 0 &&
            <AccountAccordionItem
              accounts={loanAccounts}
              accountTypeIdLabel="loan"
              accountTypeLabel="Loan"
              eventKey={3}
              onSelect={(eventItem: any) => onSelect(eventItem)}
              trackedAccounts={trackedAccounts} />
          }
        </Accordion>
      }
    </>
  )
};
