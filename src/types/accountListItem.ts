export type AccountListItemType = {
  account_id: string;
  balances: {
    available: number;
    current: number;
    iso_currency_code: string;
    limit: null;
    unofficial_currency_code: null;
  }
  name: string;
  mask: string;
  type: string;
  subtype: string;
  official_name: string;
  includeInTransactions: boolean;
};


/*
 "account_id": "lv5KvMeBlgTmRMMjPgz9Sbr5QmDxKXcpzo5Dp",
          "balances": {
              "available": 100,
              "current": 110,
              "iso_currency_code": "USD",
              "limit": null,
              "unofficial_currency_code": null
          },
          "mask": "0000",
          "name": "Plaid Checking",
          "official_name": "Plaid Gold Standard 0% Interest Checking",
          "subtype": "checking",
          "type": "depository"
          */