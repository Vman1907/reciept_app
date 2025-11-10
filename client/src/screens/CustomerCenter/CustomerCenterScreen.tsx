import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import ScreenContainer from '../../components/ScreenContainer';
import { getText } from '../../utils/const';
import MenuItem from './components/MenuItem';

export default function CustomerCenterScreen() {
  const navigation = useNavigation();

  return (
    <ScreenContainer>
      <Header showBack />
      <View style={styles.greetingContainer}>
        <Text style={styles.greeting}>
          {getText('customerCenter.title', '')}
          {getText('customerCenter.userName', '')}
        </Text>
        <Text style={styles.greeting}>
          {getText('customerCenter.WelcomeText', '')}
        </Text>
      </View>
      <MenuItem
        title={getText('customerCenter.menuList[0]', '')}
        onPress={() => navigation.navigate('Contact' as never)}
      />
      <MenuItem
        title={getText('customerCenter.menuList[1]', '')}
        onPress={() => navigation.navigate('FAQ' as never)}
      />
      <MenuItem
        title={getText('customerCenter.menuList[2]', '')}
        onPress={() => navigation.navigate('Withdrawal' as never)}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  greetingContainer: { marginBottom: 20 },
  greeting: {
    fontSize: 20,
    fontWeight: '600',
  },
});
