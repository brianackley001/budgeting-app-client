import { fireEvent, render, screen } from '@testing-library/react';
import { beforeAll, describe, expect } from "vitest";
import AccountSectionAccordion from "./AccountSectionAccordion";

// vi.mock('./AccountSummaryListItem.tsx', () => {
//   return <div data-testid="list-group-item-container">Child List Item</div>;
// });
// vi.mock("./AccountSummaryListItem.tsx", async () => {
//   const actual = await vi.importActual("./AccountSummaryListItem.tsx")
//   return <div data-testid="list-group-item-container">Child List Item</div>;
// })
const mockItems = [
  { name: "Account 1", customName:"CustomName", accountId: "60000ABCDEF", balances: {current: 100}, dateUpdated: "2024-01-01", institutionName: "Institution 1" },
];
const testLabels =  {
    container: "accordion-container-test-accounts",
    accordionHeader: "accordion-header-test-accounts",
    accordionBody: "accordion-body-test-accounts",
  }
// beforeAll(() => {
// });

describe ("AccountSectionAccordion test", () => {
  test.each([
    { sectionLabel: "Checking & Savings", balanceIsDebt:true, items:mockItems, testLabels: testLabels},
    { sectionLabel: "Credit Cards", balanceIsDebt:true, items:mockItems, testLabels: testLabels},
    { sectionLabel: "Investments", balanceIsDebt:true, items:mockItems, testLabels: testLabels},
    { sectionLabel: "Loans", balanceIsDebt:true, items:mockItems, testLabels: testLabels},
  ])('AccountSectionAccordion ($sectionLabel, $balanceIsDebt, $items, $testLabels)', (
    { sectionLabel, balanceIsDebt, items, testLabels}) => {
    // Act
    let item = render(
      <AccountSectionAccordion 
        items={items} 
        balanceIsDebt={balanceIsDebt} 
        testLabels={testLabels}
        iconColorValue={"198754"}
        iconId={"iconId"}
        sectionLabel={sectionLabel} /> 
      );
    
    // Assert
    expect(screen.getByTestId(testLabels.container)).toBeInTheDocument();
    expect(screen.getByTestId(testLabels.accordionHeader)).toBeInTheDocument();
    expect(screen.getByTestId(testLabels.accordionBody)).toBeInTheDocument(); 
    expect(screen.getByTestId(testLabels.accordionHeader)).toHaveTextContent(sectionLabel);
  });
})