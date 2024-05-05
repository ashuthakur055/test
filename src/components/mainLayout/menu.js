import React from 'react';
import { HomeOutlined } from '@ant-design/icons';

const SideMenu = [
  {
    name: 'Dashboard',
    key: 'dashboard',
    icon: <HomeOutlined className={'sidebar-icon'} />,
    component: props => <Dashboard {...props} />,
  },
];
export const profileMenu = [
  {
    name: 'Sign Out',
    key: 'sign-out',
  },
];

export const sideMenu = {
  SideMenu,
};
