import React from 'react';
import MainLayout from '../components/mainLayout/MainLayout';
import Login from '../components/home/login/Login';
import signUpComponent from '../components/home/login/SignUp';
import ResetPassword from '../components/home/login/ResetPassword';
import PageNotFound from '../../error/pageNotFound';

const publicRoutes = [
  {
    path: '/login',
    component: Login,
    exact: true,
  },
  {
    path: '/reset-password',
    component: ResetPassword,
    exact: true,
  },
  {
    path: '/sign-up',
    component: signUpComponent,
    exact: true,
  },
];

const routes = [
  {
    path: '/',
    component: MainLayout,
    exact: true,
  },
  {
    path: '/:menuItem',
    component: MainLayout,
    exact: true,
  },
  {
    path: '/:menuItem/:section',
    component: MainLayout,
    exact: true,
  },
  {
    path: '/:menuItem/:section/:id',
    component: MainLayout,
    exact: true,
  },
  {
    path: '/:menuItem/:section/:section_2/:id',
    component: MainLayout,
    exact: true,
  },
  {
    path: '*',
    component: PageNotFound,
    exact: true,
  },
];

export default {
  publicRoutes,
  routes,
};
