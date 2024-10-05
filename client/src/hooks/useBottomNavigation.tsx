import React from 'react';
import {HOME, RECEIPT, SEARCH, USER} from '../../assets/image';
import Dashboard from '../screens/dashboard';

const pages = [
  {
    key: 'home',
    title: 'Home',
    Icon: HOME,
    component: <Dashboard />,
  },
  {key: 'receipt', title: 'Receipt', Icon: RECEIPT, component: <Dashboard />},
  {key: 'search', title: 'Search', Icon: SEARCH, component: <Dashboard />},
  {
    key: 'profile',
    title: 'Profile',
    Icon: USER,
    component: <Dashboard />,
  },
];

export default function useBottomNavigation() {
  const [page, setPage] = React.useState<(typeof pages)[0]>(pages[0]);

  const handleChangePage = (index: number) => {
    setPage(pages[index]);
  };

  return {page, handleChangePage, pages};
}
