import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import React from 'react';
import {HOME, RECEIPT, USER} from '../../../assets/image';
import ReceiptPage from '../../screens/home/all-receipt';
import Dashboard from '../../screens/home/dashboard';
import Profile from '../../screens/home/profile';
import {COLORS} from '../../utils/const';

const Tab = createBottomTabNavigator();

export default function BottomNavigation() {
  const renderIcon = (routeName: string, color: string) => {
    let iconName;

    if (routeName === 'Dashboard') {
      iconName = <HOME stroke={color} />;
    } else if (routeName === 'Receipt') {
      iconName = <RECEIPT stroke={color} />;
    } else if (routeName === 'Profile') {
      iconName = <USER stroke={color} />;
    }

    return iconName;
  };

  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        headerShown: false,
        tabBarIcon: ({color}) => renderIcon(route.name, color),
        tabBarActiveTintColor: COLORS.PRIMARY,
        tabBarInactiveTintColor: COLORS.TEXT_MUTED,
      })}>
      <Tab.Screen name="Dashboard" component={Dashboard} />
      <Tab.Screen name="Receipt" component={ReceiptPage} />
      <Tab.Screen name="Profile" component={Profile} />
    </Tab.Navigator>
  );
}
