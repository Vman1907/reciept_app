import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import Button from '../../components/Button';
import Header from '../../components/Header';
import ScreenContainer from '../../components/ScreenContainer';
import { getText } from '../../utils/const';
import ConfirmationModal from './components/ConfirmationModal';

export default function WithdrawalConfirmScreen() {
  const navigation = useNavigation();
  const [visible, setVisible] = useState(false);

  return (
    <ScreenContainer>
      <Header showClose />
      <View style={styles.pageContainer}>
        <View>
          <View style={styles.textContainer}>
            {getText('membershipWithdrawalScreen.title', []).map(
              (text, index) => {
                return (
                  <Text key={index} style={styles.title}>
                    {text}
                  </Text>
                );
              },
            )}
          </View>
          <View style={styles.textContainer}>
            {getText('membershipWithdrawalScreen.description', []).map(
              (text, index) => {
                return (
                  <Text key={index} style={styles.text}>
                    {text}
                  </Text>
                );
              },
            )}
          </View>
          <View style={styles.textContainer}>
            <Text style={[styles.text]}>
              {getText('membershipWithdrawalScreen.confirmationText', '')}
            </Text>
          </View>
        </View>
        <View>
          <Button
            title={getText('membershipWithdrawalScreen.cancelButtonText', '')}
            onPress={() => navigation.goBack()}
          />
          <Button
            variant="ghost"
            title={getText('membershipWithdrawalScreen.confirmButtonText', '')}
            onPress={() => setVisible(true)}
          />
        </View>
      </View>

      <ConfirmationModal
        visible={visible}
        onClose={() => setVisible(false)}
        onConfirm={() => {
          setVisible(false);
          navigation.navigate('CustomerCenter' as never);
        }}
      />
    </ScreenContainer>
  );
}

const styles = StyleSheet.create({
  pageContainer: { flex: 1, justifyContent: 'space-between' },
  title: { fontSize: 20, fontWeight: '600' },
  text: { fontSize: 15, color: '#444' },
  textContainer: {
    marginTop: 20,
  },
});
