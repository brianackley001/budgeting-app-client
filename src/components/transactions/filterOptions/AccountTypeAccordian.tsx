
import { Accordion } from 'react-bootstrap';
import AccountAccordianItem from './AccountAccordianItem';

export default function AccountTypeAccordian (props) {
  const { accounts, onSelect, trackedAccounts } = props;

  const depositoryAccounts = accounts.filter((account) => account.type.toLowerCase() === "depository").sort((a, b) => {
    return a.institutionName > b.institutionName ? 1 : b.institutionName < a.institutionName ? -1 : 0;
  });
  const creditAccounts = accounts.filter((account) => account.type.toLowerCase() === "credit").sort((a, b) => {
    return a.institutionName > b.institutionName ? 1 : b.institutionName < a.institutionName ? -1 : 0;
  });
  const investmentAccounts = accounts.filter((account) => account.type.toLowerCase() === "investment").sort((a, b) => {
    return a.institutionName > b.institutionName ? 1 : b.institutionName < a.institutionName ? -1 : 0;
  });
  const loanAccounts = accounts.filter((account) => account.type.toLowerCase() === "loan").sort((a, b) => {
    return a.institutionName > b.institutionName ? 1 : b.institutionName < a.institutionName ? -1 : 0;
  });

  return (
    <>
      {accounts && accounts.length > 0 &&
        <Accordion flush>
          {depositoryAccounts && depositoryAccounts.length > 0 &&
            <AccountAccordianItem
              accounts={depositoryAccounts}
              accountTypeIdLabel="depository"
              accountTypeLabel="Checking and Savings"
              eventKey={0}
              onSelect={(eventItem: any) => onSelect(eventItem)}
              trackedAccounts={trackedAccounts} />
          }
          {creditAccounts && creditAccounts.length > 0 &&
            <AccountAccordianItem
              accounts={creditAccounts}
              accountTypeIdLabel="credit"
              accountTypeLabel="Credit"
              eventKey={1}
              onSelect={(eventItem: any) => onSelect(eventItem)}
              trackedAccounts={trackedAccounts} />
          }
          {investmentAccounts && investmentAccounts.length > 0 &&
            <AccountAccordianItem
              accounts={investmentAccounts}
              accountTypeIdLabel="investment"
              accountTypeLabel="Investment"
              eventKey={2}
              onSelect={(eventItem: any) => onSelect(eventItem)}
              trackedAccounts={trackedAccounts} />
          }
          {loanAccounts && loanAccounts.length > 0 &&
            <AccountAccordianItem
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
