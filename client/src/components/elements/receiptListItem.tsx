import React from 'react';
import {StyleSheet, TouchableNativeFeedback, View} from 'react-native';
import {Receipt} from '../../types/receipt';
import {COLORS} from '../../utils/const';
import {DateHelper} from '../../utils/dateHelper';
import Text from './text';

export default function ReceiptListItem({
  receipt,
  onPress,
}: {
  receipt: Receipt;
  onPress?: () => void;
}) {
  return (
    <TouchableNativeFeedback onPress={onPress}>
      <View style={styles.container}>
        <Text fontWeight="medium" style={styles.name}>
          {receipt.name}
        </Text>
        <Text style={styles.description}>
          Receipt generated at {DateHelper(receipt.createdAt)}
        </Text>
      </View>
    </TouchableNativeFeedback>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    gap: 5,
    marginBottom: 10,
  },
  name: {
    fontSize: 18,
  },
  description: {
    fontSize: 14,
    color: COLORS.TEXT_MUTED,
  },
});
