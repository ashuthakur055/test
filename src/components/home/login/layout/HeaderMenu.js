import React from 'react';
import LoginComponent from '../Login';
import signUpComponent from '../SignUp';
const rightHeader = [
  {
    name: 'Cart',
    key: 'Cart',
    component: props => <LoginComponent {...props} />,
  },
  {
    name: 'Login',
    key: 'login',
    component: props => <LoginComponent {...props} />,
  },
  {
    name: 'Signup',
    key: 'sign-up',
    component: props => <signUpComponent {...props} />,
  },
];
const leftHeader = [
  {
    name: 'Signals',
    key: 'signals',
    component: props => <LoginComponent {...props} />,
  },
  {
    name: 'Experts',
    key: 'experts',
    component: props => <LoginComponent {...props} />,
  },
  {
    name: 'Online Courses',
    key: 'online-courses',
    component: props => <signUpComponent {...props} />,
  },
  {
    name: 'Webinars',
    key: 'webinars',
    component: props => <signUpComponent {...props} />,
  },
];

export const HeaderMenu = {
  rightHeader,
  leftHeader,
};
