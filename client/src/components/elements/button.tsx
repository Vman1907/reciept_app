import React from 'react';
import {StyleSheet} from 'react-native';
import {Button as BUTTON, ButtonProps} from 'react-native-paper';

type Props = {} & ButtonProps;

export default function Button({...props}: Props) {
  return (
    <BUTTON
      {...props}
      mode={props.mode ?? 'contained'}
      style={[styles.button, props.style]}>
      {props.children}
    </BUTTON>
  );
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 15,
  },
});
