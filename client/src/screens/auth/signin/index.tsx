import React, {useEffect} from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {useAuth} from '../../../components/context/authProvider';
import {PasswordInput, TextInput} from '../../../components/elements/Input';
import Button from '../../../components/elements/button';
import Text from '../../../components/elements/text';
import AuthService from '../../../services/auth.service';
import {SCREENS} from '../../../utils/const';

export default function Signin({navigation}: {navigation: any}) {
  const {setAuth, isAuthenticating, isAuthenticated} = useAuth();

  useEffect(() => {
    setEmail('');
    setPassword('');
  }, []);

  useEffect(() => {
    if (isAuthenticated) {
      navigation.navigate(SCREENS.HOME);
    }
  }, [isAuthenticated, navigation]);
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState('');
  const openSignupPage = () => {
    navigation.navigate(SCREENS.SIGNUP);
  };
  if (isAuthenticating) {
    return <Text>Loading...</Text>;
  }

  const handleLogin = async () => {
    if (!email || !password) {
      setError('All fields are required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    setError('');
    setLoading(true);
    AuthService.signin(email, password)
      .then(res => {
        if (!res) {
          setError('Login failed');
          return;
        }
        setAuth(true);
      })
      .catch(err => {
        console.log(err);
        setError('Something went wrong, please try again');
        setAuth(true);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>Login</Text>
            <View style={styles.inputContainer}>
              <TextInput
                value={email}
                onChangeText={setEmail}
                placeholder="Email"
              />
              <PasswordInput
                value={password}
                onChangeText={setPassword}
                placeholder="Password"
              />
            </View>
            <View>
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
            <Button loading={loading} onPress={handleLogin} disabled={loading}>
              <Text style={styles.loginText}>Login</Text>
            </Button>
          </View>
          <View style={styles.signUpTextContainer}>
            <Text style={styles.signUpText}>Don't have an account?</Text>
            <Text onPress={openSignupPage} style={styles.signUpText}>
              Sign Up
            </Text>
          </View>
        </View>
      </TouchableWithoutFeedback>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingTop: '20%',
    backgroundColor: 'white',
    height: '100%',
    paddingHorizontal: '5%',
    justifyContent: 'space-between',
  },
  heading: {
    color: 'black',
    fontSize: 40,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  inputContainer: {
    display: 'flex',
    gap: 20,
    marginVertical: '10%',
  },
  signUpText: {
    color: 'black',
    fontSize: 16,
    textAlign: 'center',
    margin: 0,
  },
  loginText: {
    color: 'white',
  },
  signUpTextContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: '5%',
  },
  signUpButton: {
    padding: 0,
    margin: 0,
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
