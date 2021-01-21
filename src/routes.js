import React from 'react';

const changePassword = React.lazy(()=> import("./views/changePassword/ChangePassword"));
const addAvailability = React.lazy(() => import('./views/addAvailability/AddAvailability'));
const signIn = React.lazy(()=>import("./views/Login/Login"));
const Profile = React.lazy(()=>import("./views/Profile/Profile"));
const NewAdminLogin = React.lazy(()=>import("./views/Login/NewAdminLogin"));
const routes = [
  {
    path: '/add-availability',
    component: addAvailability
  },
  {
    path: "/",
    component: signIn
  },
  {
    path:"/change-password",
    component: changePassword
  },
  {
    path:"/profile",
    component: Profile
  },
  {
    path:"/new-guru-login",
    component:NewAdminLogin
  }
];

export default routes;
