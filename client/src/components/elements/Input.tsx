import React, {useEffect} from 'react';
import {StyleSheet, TouchableWithoutFeedback, View} from 'react-native';
import {TextInput as TEXTINUPT} from 'react-native-paper';
import {EYE_CLOSE, EYE_OPEN} from '../../../assets/image';
import {COLORS} from '../../utils/const';

export function TextInput({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) {
  return (
    <View style={styles.inputContainer}>
      <TEXTINUPT
        mode="outlined"
        outlineStyle={styles.outlineNone}
        style={styles.container}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={styles.placeholderColor.color}
      />
    </View>
  );
}

export const PasswordInput = ({
  value,
  onChangeText,
  placeholder,
}: {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
}) => {
  const [show, setShow] = React.useState(false);
  useEffect(() => {
    setShow(false);
  }, []);
  return (
    <View style={styles.inputContainer}>
      <TEXTINUPT
        mode="outlined"
        outlineStyle={styles.outlineNone}
        style={styles.container}
        placeholder={placeholder}
        onChangeText={onChangeText}
        value={value}
        placeholderTextColor={styles.placeholderColor.color}
        secureTextEntry={!show}
      />
      <TouchableWithoutFeedback
        style={styles.buttonContainer}
        onPress={() => setShow(!show)}>
        {show ? <EYE_OPEN /> : <EYE_CLOSE />}
      </TouchableWithoutFeedback>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderRadius: 16,
    backgroundColor: COLORS.SECONDARY,
    overflow: 'hidden',
    flex: 1,
  },
  inputContainer: {
    width: '100%',
    paddingHorizontal: '3%',
    borderRadius: 16,
    backgroundColor: COLORS.SECONDARY,
    overflow: 'hidden',
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  default: {
    flex: 1,
    backgroundColor: 'transparent',
    fontFamily: 'Raleway-Light',
  },
  outlineNone: {
    borderWidth: 0,
    backgroundColor: 'transparent',
  },
  placeholderColor: {
    color: COLORS.TEXT_MUTED,
  },
  buttonContainer: {
    paddingHorizontal: '2%',
  },
});