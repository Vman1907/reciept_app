import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Header from '../../components/Header';
import ScreenContainer from '../../components/ScreenContainer';
import { getText } from '../../utils/const';

export default function ContactScreen() {
  return (
    <ScreenContainer>
      <Header showBack title="Contact" />
      <View style={styles.body}>
        <Text style={styles.heading}>{getText('contactScreen.title', '')}</Text>
        <Text style={styles.text}>
          {getText('contactScreen.companyName', '')}
        </Text>
        <Text style={styles.text}>
          {getText('contactScreen.companyAddress', '')}
        </Text>
        <Text style={styles.text}>
          {getText('contactScreen.email', '')} |{' '}
          {getText('contactScreen.phone', '')}
        </Text>
      </View>
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  body: {
    flex: 1,
    paddingTop: 10,
  },
  heading: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 20,
  },
  label: {
    fontSize: 15,
    fontWeight: '500',
    color: '#333',
    marginBottom: 4,
    marginTop: 12,
  },
  text: {
    fontSize: 15,
    color: '#000',
    lineHeight: 22,
    marginBottom: 5,
  },
});
