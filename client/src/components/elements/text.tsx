import React from 'react';
import {StyleSheet, TextProps} from 'react-native';
import {Text as TEXT} from 'react-native-paper';

type Props = {children: React.ReactNode} & TextProps;

export default function Text({...props}: Props) {
  return (
    <TEXT {...props} style={[style.text, props.style]}>
      {props.children}
    </TEXT>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
  },
});
