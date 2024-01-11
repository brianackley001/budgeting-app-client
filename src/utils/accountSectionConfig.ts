const configuredSectionData = (bankAccounts: any, creditCards: any, investmentAccounts: any, loans: any, iconColorValue:string) => {
  return [
    {
      key:0,
      items: bankAccounts,
      balanceIsDebt: false,
      testLabels: {
        container: "accordian-container-depository-accounts",
        accordianHeader: "accordian-header-depository-accounts",
        accordianBody: "accordian-body-depository-accounts",
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
        container: "accordian-container-credit-accounts",
        accordianHeader: "accordian-header-credit-accounts",
        accordianBody: "accordian-body-credit-accounts",
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
        container: "accordian-container-investment-accounts",
        accordianHeader: "accordian-header-investment-accounts",
        accordianBody: "accordian-body-investment-accounts",
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
        container: "accordian-container-loan-accounts",
        accordianHeader: "accordian-header-loan-accounts",
        accordianBody: "accordian-body-loan-accounts",
      },
      iconColorValue: iconColorValue,
      iconId: "loan",
      sectionLabel: "Loans",
    }
  ];
}

export  { configuredSectionData } ;