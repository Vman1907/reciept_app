import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {PaperProvider} from 'react-native-paper';
import {AuthProvider} from './components/context/authProvider';
import useTheme from './hooks/useTheme';
import Signin from './screens/auth/signin';
import SignUp from './screens/auth/signup';
import Home from './screens/home';
import ReceiptForm from './screens/receiptForm';
import {SCREENS} from './utils/const';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const theme = useTheme();

  return (
    <AuthProvider>
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Group>
              <Stack.Screen
                name={SCREENS.LOGIN}
                component={Signin}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={SCREENS.SIGNUP}
                component={SignUp}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Group>
            <Stack.Group>
              <Stack.Screen
                name={SCREENS.HOME}
                component={Home}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={SCREENS.FORM}
                component={ReceiptForm}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </AuthProvider>
  );
}

export default App;
