const configuredSectionData = (bankAccounts: any, creditCards: any, investmentAccounts: any, loans: any, iconColorValue:string) => {
  return [
    {
      key:0,
      items: bankAccounts,
      balanceIsDebt: false,
      testLabels: {
        container: "accordion-container-depository-accounts",
        accordionHeader: "accordion-header-depository-accounts",
        accordionBody: "accordion-body-depository-accounts",
      },
      iconColorValue: iconColorValue,
      iconId: "depository",
      sectionLabel: "Checking & Savings",
    },
    {
      key:1,
      items: creditCards,
      balanceIsDebt: true,
      testLabels: {
        container: "accordion-container-credit-accounts",
        accordionHeader: "accordion-header-credit-accounts",
        accordionBody: "accordion-body-credit-accounts",
      },
      iconColorValue: iconColorValue,
      iconId: "credit",
      sectionLabel: "Credit Cards",
    },
    {
      key:2,
      items: investmentAccounts,
      balanceIsDebt: false,
      testLabels: {
        container: "accordion-container-investment-accounts",
        accordionHeader: "accordion-header-investment-accounts",
        accordionBody: "accordion-body-investment-accounts",
      },
      iconColorValue: iconColorValue,
      iconId: "investment",
      sectionLabel: "Investments",
    },
    {
      key:3,
      items: loans,
      balanceIsDebt: true,
      testLabels: {
        container: "accordion-container-loan-accounts",
        accordionHeader: "accordion-header-loan-accounts",
        accordionBody: "accordion-body-loan-accounts",
      },
      iconColorValue: iconColorValue,
      iconId: "loan",
      sectionLabel: "Loans",
    }
  ];
}

export  { configuredSectionData } ;