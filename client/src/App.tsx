import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {View} from 'react-native';
import {PaperProvider, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from './hooks/useAuth';
import useTheme from './hooks/useTheme';
import Signin from './screens/auth/signin';
import SignUp from './screens/auth/signup';
import Home from './screens/home';
import ReceiptForm from './screens/receiptForm';
import {SCREENS} from './utils/const';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  const theme = useTheme();

  const {isAuthenticated, isAuthenticating} = useAuth();

  if (isAuthenticating) {
    return (
      <SafeAreaView>
        <View>
          <Text>Loading...</Text>
        </View>
      </SafeAreaView>
    );
  }

  if (!true) {
    return (
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
                name={SCREENS.SignUp}
                component={SignUp}
                options={{
                  headerShown: false,
                }}
              />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    );
  }

  return (
    <PaperProvider theme={theme}>
      <NavigationContainer>
        <Stack.Navigator screenOptions={{headerShown: false}}>
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
  );
}

export default App;
