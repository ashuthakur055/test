import React from 'react';
import { HomeOutlined } from '@ant-design/icons';
import DashboardComponent from '../dashboard/Dashboard';
// import { logOut } from './GoogleAuth'; // Import the GoogleAuthButton component

export const sideMenu = [
  {
    name: 'Dashboard',
    key: 'dashboard',
    icon: <HomeOutlined className={'sidebar-icon'} />,
    component: props => <DashboardComponent {...props} />,
  },
];
export const profileMenu = [
  {
    name: 'Sign Out',
    key: 'sign-out',
  },
];
