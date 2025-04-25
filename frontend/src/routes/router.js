// router.jsx
import { createBrowserRouter } from "react-router";

import Home from "../pages/Home";
import Login from "../pages/Login";
import Register from "../pages/Register";
import Dashboard from "../pages/Dashboard";
// renamed PrivateRoute to match RR style
import { selectIsLoggedIn } from "../store/authSlice";
import AuthLayout from "../Layout/AuthLayout";
import GuestLayout from "../Layout/GuestLayout";

// const isLoggedIn = selectIsLoggedIn();
const router = createBrowserRouter([
  {
    path: "/",
    Component: Home,
  },
  // {
  //   path: "/login",
  //   Component: Login,
  // },
  // {
  //   path: "/register",
  //   Component: Register,
  // },
  {
     Component:GuestLayout,
     children:[
       {
         path:"/login",
         Component:Login,
       },{
          path:"/register",
          Component:Register,
       }
     ] 
  },
  {
     Component: AuthLayout,
     children:[
      {
        path:"/dashboard",
        Component:Dashboard,
      },
     ]
  }
]);

export default router;
