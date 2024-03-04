
import type { RootState } from '@store/store';

const rootState: RootState = {
  accountSlice: { accounts: [], institutions: [] },
  alertSlice: {
    headerText: "",
    icon: {
      iconType: "",
      isVisible: false,
      iconSize: "",
      iconColor: ""
    },
    inProgress: false,
    messageText: "",
    showAlert: false,
    variantStyle: ""
  },
  msalSlice: {
    accessToken: "test token",
    uid: "test uid",
  },
  plaidSlice: {
    institutions: [],
    linkedItems: [],
    publicToken: ""
  },
  transactionSlice: {
    activePageItems: [],
    isLoading: false,
    pagedTransactions: {
      pages: [{
        pageNumber: 0,
        items: [],
        transactionPagination: {
          accountIds: "",
          amountFrom: 0,
          amountTo: 0,
          categorySearchValue: "",
          total: 0,
          pageSize: 0,
          pageNumber: 0,
          sortBy: "",
          sortDirection: "",
          startDate: "",
          endDate: "",
          tagSearchValue: "",
          userId: "",
          userNotesSearchValue: ""
        }
      }]
    },
    transactionPagination: {
      accountIds: "",
      amountFrom: 0,
      amountTo: 0,
      categorySearchValue: "",
      total: 0,
      pageSize: 0,
      pageNumber: 0,
      sortBy: "",
      sortDirection: "",
      startDate: "",
      endDate: "",
      tagSearchValue: "",
      userId: "",
      userNotesSearchValue: ""
    }
  },
  userSlice: {
    name: "",
    preferences: {
      transactionItemsPerPage: 0
    },
    userId: "",
    userName: "",
    transactionTags: []
  },
};

export default rootState;