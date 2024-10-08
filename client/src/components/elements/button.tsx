import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as BUTTON, ButtonProps} from 'react-native-paper';

type Props = {} & ButtonProps;

export default function Button({...props}: Props) {
  return (
    <BUTTON
      mode={props.mode ?? 'contained'}
      style={[styles.button, props.style]}
      {...props}>
      {props.children}
    </BUTTON>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 5,
    borderRadius: 15,
  },
});
