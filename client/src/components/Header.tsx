import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TouchableOpacity, View } from 'react-native';
import { Ionicons } from '@react-native-vector-icons/ionicons';
interface HeaderProps {
  title?: string;
  showBack?: boolean;
  showClose?: boolean;
}

export default function Header({ showBack, showClose }: HeaderProps) {
  const navigation = useNavigation();

  return (
    <View style={styles.header}>
      {showBack && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Ionicons name="arrow-back-outline" size={26} color="#000" />
        </TouchableOpacity>
      )}
      {showClose && (
        <TouchableOpacity
          onPress={() => navigation.goBack()}
          style={styles.iconButton}
        >
          <Ionicons name="close" size={26} color="#000" />
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: '10%',
  },
  iconButton: {
    paddingRight: 0,
  },
  title: {
    fontSize: 18,
    fontWeight: '600',
  },
});
