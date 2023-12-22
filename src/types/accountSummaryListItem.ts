export type AccountSummaryListItemType = {
  institution_id: string;
  item_id: string;
  institution_name: string;
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