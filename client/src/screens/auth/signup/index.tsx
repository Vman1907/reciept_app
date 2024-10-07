import React from 'react';
import {
  Keyboard,
  SafeAreaView,
  StyleSheet,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {PasswordInput, TextInput} from '../../../components/elements/Input';
import Button from '../../../components/elements/button';
import Text from '../../../components/elements/text';
import AuthService from '../../../services/auth.service';
import {SCREENS} from '../../../utils/const';

export default function SignUp({navigation}: {navigation: any}) {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [confirmPassword, setConfirmPassword] = React.useState('');
  const [loading, setLoading] = React.useState(false);

  const [error, setError] = React.useState('');

  const handleSignup = async () => {
    if (!email || !password || !confirmPassword) {
      setError('All fields are required');
      return;
    }
    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }
    if (password !== confirmPassword) {
      setError('Password and confirm password do not match');
      return;
    }
    setError('');
    setLoading(true);
    AuthService.signup(email, password)
      .then(res => {
        if (!res) {
          setError('Signup failed');
          return;
        }
      })
      .catch(err => {
        console.log(err);
        setError('Something went wrong, please try again');
      })
      .finally(() => {
        setLoading(false);
      });
  };

  const openSigninPage = () => {
    navigation.navigate(SCREENS.LOGIN);
  };

  return (
    <SafeAreaView>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={styles.container}>
          <View>
            <Text style={styles.heading}>SignUp</Text>
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
              <PasswordInput
                value={confirmPassword}
                onChangeText={setConfirmPassword}
                placeholder="Confirm Password"
              />
            </View>
            <View>
              {error && <Text style={styles.errorText}>{error}</Text>}
            </View>
            <Button onPress={handleSignup} loading={loading}>
              <Text style={styles.loginText}>Create Account</Text>
            </Button>
          </View>
          <View style={styles.signUpTextContainer}>
            <Text style={styles.signUpText}>Already have an account?</Text>
            <Text onPress={openSigninPage} style={styles.signUpText}>
              Login
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
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
});
