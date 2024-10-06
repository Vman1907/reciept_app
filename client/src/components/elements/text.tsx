import React from 'react';
import {StyleSheet, TextProps} from 'react-native';
import {Text as TEXT} from 'react-native-paper';
import {FONT_BOLD, FONT_MEDIUM, FONT_REGULAR} from '../../../assets/fonts';

type Props = {
  children: React.ReactNode;
  fontWeight?: 'regular' | 'medium' | 'bold';
} & TextProps;

export default function Text({...props}: Props) {
  return (
    <TEXT
      {...props}
      style={[
        style.text,
        props.fontWeight === 'medium' && style.textMedium,
        props.fontWeight === 'bold' && style.textBold,
        props.style,
      ]}>
      {props.children}
    </TEXT>
  );
}

const style = StyleSheet.create({
  text: {
    fontSize: 20,
    color: 'black',
    fontFamily: FONT_REGULAR,
  },
  textMedium: {
    fontFamily: FONT_MEDIUM,
  },
  textBold: {
    fontFamily: FONT_BOLD,
  },
});
