const configuredSectionData = (bankAccounts: any, creditCards: any, investmentAccounts: any, loans: any, iconColorValue:string) => {
  return [
    {
      key:0,
      items: bankAccounts,
      balanceIsDebt: false,
      testLabels: {
        container: "accordion-container-depository-accounts",
        accordianHeader: "accordion-header-depository-accounts",
        accordianBody: "accordion-body-depository-accounts",
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
        accordianHeader: "accordion-header-credit-accounts",
        accordianBody: "accordion-body-credit-accounts",
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
        accordianHeader: "accordion-header-investment-accounts",
        accordianBody: "accordion-body-investment-accounts",
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
        accordianHeader: "accordion-header-loan-accounts",
        accordianBody: "accordion-body-loan-accounts",
      },
      iconColorValue: iconColorValue,
      iconId: "loan",
      sectionLabel: "Loans",
    }
  ];
}

export  { configuredSectionData } ;