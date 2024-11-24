import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React, {lazy} from 'react';

import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import {AuthProvider} from './components/context/authProvider';
import useTheme from './hooks/useTheme';
import {store} from './store';
import {SCREENS} from './utils/const';

const Home = lazy(() => import('./screens/home'));
const Signin = lazy(() => import('./screens/auth/signin'));
const SignUp = lazy(() => import('./screens/auth/signup'));
const ReceiptForm = lazy(() => import('./screens/receiptForm'));
const ViewReceipt = lazy(() => import('./screens/view-receipt'));

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const theme = useTheme();

  return (
    <Provider store={store}>
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
                <Stack.Screen
                  name={SCREENS.VIEW_FORM}
                  component={ViewReceipt}
                  options={{
                    headerShown: false,
                  }}
                />
              </Stack.Group>
            </Stack.Navigator>
          </NavigationContainer>
        </PaperProvider>
      </AuthProvider>
    </Provider>
  );
}

export default App;
