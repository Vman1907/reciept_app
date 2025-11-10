import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  title: string;
  onPress: () => void;
  variant?: 'contained' | 'outlined' | 'ghost';
}

export default function Button({
  title,
  onPress,
  variant = 'contained',
}: Props) {
  return (
    <TouchableOpacity
      style={[
        styles.button,
        variant === 'outlined'
          ? styles.outlined
          : variant === 'ghost'
          ? styles.ghost
          : {},
      ]}
      onPress={onPress}
    >
      <Text
        style={[
          styles.text,
          variant === 'outlined' ? styles.textOutlined : {},
          variant === 'ghost' ? styles.textGhost : {},
        ]}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    backgroundColor: '#000',
    paddingVertical: 14,
    borderRadius: 8,
    alignItems: 'center',
    marginVertical: 10,
  },
  outlined: {
    backgroundColor: '#fff',
    borderWidth: 1,
    borderColor: '#000',
  },
  ghost: {
    backgroundColor: 'transparent',
  },
  text: { color: '#fff', fontWeight: '500', fontSize: 16 },
  textOutlined: { color: '#000' },
  textGhost: { color: '#000' },
});
