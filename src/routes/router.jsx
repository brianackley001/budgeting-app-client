import ErrorPage from '../pages/ErrorPage';
import { Accounts } from '../pages/Accounts';
import { Transactions } from '../pages/Transactions';
import { Settings } from '../pages/Settings';
import { Home } from '../pages/Dashboard';
import { SessionExpired } from '../pages/SessionExpired';
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
  },,
  {
    path: '/session-expired',
    component: {SessionExpired},
    errorElement: {ErrorPage},
  },
];

const router = createBrowserRouter([routes]);

export  {router};
