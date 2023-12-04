import ErrorPage from './error-page';
import { Accounts } from './accounts';
import { Transactions } from './transactions';
import { Settings } from './settings';
import { Home } from './home';
import { createBrowserRouter} from 'react-router-dom';


const routes = [
  {
    path: '/',
    component: {Home},
    errorElement: {ErrorPage},
  },
  {
    path: '/accounts',
    component: {Accounts},
    errorElement: {ErrorPage},
  },
  {
    path: '/transactions',
    component: {Transactions},
    errorElement: {ErrorPage},
  },
  {
    path: '/settings',
    component: {Settings},
    errorElement: {ErrorPage},
  },
];

const router = createBrowserRouter([routes]);

export  {router};
