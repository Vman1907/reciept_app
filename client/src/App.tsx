import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import React from 'react';

import {View} from 'react-native';
import {PaperProvider, Text} from 'react-native-paper';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useAuth} from './hooks/useAuth';
import useTheme from './hooks/useTheme';
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

  console.log(isAuthenticated, 'App.tsx');

  if (!true) {
    return (
      <PaperProvider theme={theme}>
        <NavigationContainer>
          <Stack.Navigator screenOptions={{headerShown: false}}>
            <Stack.Group>
              <Stack.Screen
                name={SCREENS.LOGIN.name}
                component={SCREENS.LOGIN.component}
                options={{
                  headerShown: false,
                }}
              />
              <Stack.Screen
                name={SCREENS.SignUp.name}
                component={SCREENS.SignUp.component}
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
              name={SCREENS.HOME.name}
              component={SCREENS.HOME.component}
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
