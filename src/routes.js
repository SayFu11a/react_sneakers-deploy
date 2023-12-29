import { LOGIN_ROUTE, ADMIN_ROUTE, HOME_ROUTE } from './components/adimMB/utils/consts';
import Login from './components/adimMB/Login';
// import Chat from './components/Chat';
import Admin from './components/adimMB/Admin';
import Home from './pages/Home';

export const publicRoutes = [
   {
      path: LOGIN_ROUTE,
      Component: Login,
      //   Component: <Login />,
   },
];

// export const privateRoutes = [
//    {
//       path: CHAT_ROUTE,
//       Component: Chat,
//    },
// ];

export const privateRoutes = [
   {
      path: HOME_ROUTE,
      Component: Home,
   },
];

export const privateRoutes2 = [
   {
      path: ADMIN_ROUTE,
      Component: Admin,
   },
];
