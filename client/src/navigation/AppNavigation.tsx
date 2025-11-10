import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';
import ContactScreen from '../screens/Contact/ContactScreen.tsx';
import CustomerCenterScreen from '../screens/CustomerCenter/CustomerCenterScreen.tsx';
import FAQScreen from '../screens/FAQ/FAQScreen';
import WithdrawalScreen from '../screens/Withdrawal/WithdrawalScreen';
import WithdrawalConfirmScreen from '../screens/Withdrawal/WithdrawalScreen.tsx';

const Stack = createNativeStackNavigator();

export default function AppNavigator() {
  return (
    <Stack.Navigator screenOptions={{ headerShown: false }}>
      <Stack.Screen name="CustomerCenter" component={CustomerCenterScreen} />
      <Stack.Screen name="Contact" component={ContactScreen} />
      <Stack.Screen name="FAQ" component={FAQScreen} />
      <Stack.Screen name="Withdrawal" component={WithdrawalScreen} />
      <Stack.Screen
        name="WithdrawalConfirm"
        component={WithdrawalConfirmScreen}
      />
    </Stack.Navigator>
  );
}
