import AccountSectionAccordion  from "./AccountSectionAccordion.tsx";
import { configuredSectionData } from "@utils/accountSectionConfig.ts"

/**
 * Renders List of Account Summary Items
 * @param props
 */


function AccountSummaryList({ items }) {
  const bankAccounts = items && items.length > 0 ? items.filter((item) => item.type === 'depository')
    .sort((a, b) => a.balances.current < b.balances.current ? 1 : -1) : [];
  const creditCards = items && items.length > 0 ? items.filter((item) => item.type === 'credit')
    .sort((a, b) => a.balances.current < b.balances.current ? 1 : -1): [];
  const loans = items && items.length > 0 ? items.filter((item) => item.type === 'loan')
    .sort((a, b) => a.balances.current < b.balances.current ? 1 : -1): [];
  const investmentAccounts = items && items.length > 0 ? items.filter((item) => item.type === 'investment')
    .sort((a, b) => a.balances.current < b.balances.current ? 1 : -1): [];
  const iconColorValue = "198754";

  const accountSections = configuredSectionData(bankAccounts, creditCards, investmentAccounts, loans, iconColorValue);
 

  return (
    <>
    {accountSections.map((section) => (
      <AccountSectionAccordion items={section.items} 
      balanceIsDebt={section.balanceIsDebt} 
      testLabels={section.testLabels} 
      iconColorValue={section.iconColorValue} 
      iconId={section.iconId} 
      sectionLabel={section.sectionLabel}
      key={section.key} />
    ))}
    </>
  );
}

export default AccountSummaryList;