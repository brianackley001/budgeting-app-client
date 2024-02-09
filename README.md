[![Docker Image CI](https://github.com/brianackley001/budgeting-app-client/actions/workflows/docker-image.yml/badge.svg)](https://github.com/brianackley001/budgeting-app-client/actions/workflows/docker-image.yml)

 # budgeting-app-client
 
### Premise
Utilize the Plaid API to replicate behavior of the Mint application (EOL March 2024) for monitoring bank account /invetment balances and transactions.

### Scaffolding / Architecture
| Feature | Description |
| ----------- | ----------- |
| Authentication | MSAL authentication.  Initial project cloned from  [MSFT MSAL React repo](https://github.com/Azure-Samples/ms-identity-javascript-react-spa) |
| Client Framework | React |
| HMR dev environment | Given React [no longer recommends/supports CRA](https://github.com/reactjs/react.dev/pull/5487), refactored app to run with Vite  |
| External Service(s) |  Plaid.  This is how Mint linked accounts. [Plaid Docs](https://plaid.com/docs/) |
| State Management | [React Redux Store](https://react-redux.js.org/introduction/getting-started) to manage accounts/transactions locally in the client |
| Unit Tests | As Vite is leveraged for HMR, this project has aimed to utilize [Vitest](https://vitest.dev/guide/comparisons.html) for the unit tests. Mocking the store has proved challenging to date with most examples I have found relying on aspects of Jest that require a deep dive to fix broken dependencies when using Vitest. |


### Work In Progress...
Items to still be addressed

- [ ] Docker Image for GitHub Actions
- [ ] Deployments to Azure app/image
- [ ] Increase Unit Test Coverage
- [ ] Code Cleanup
- [ ] Revisit/Complete typescript for the entire project (started with jsx files, project is in transition to clean typescript implementation)
