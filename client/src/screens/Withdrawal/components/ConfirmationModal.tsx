import React from 'react';
import {
  Modal,
  StyleSheet,
  Text,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import { getText } from '../../../utils/const';

interface Props {
  visible: boolean;
  onClose: () => void;
  onConfirm: () => void;
}

export default function ConfirmationModal({
  visible,
  onClose,
  onConfirm,
}: Props) {
  if (!visible) return null;

  return (
    <Modal
      transparent
      animationType="fade"
      visible={visible}
      onRequestClose={onClose} // Handles Android back button
    >
      {/* Overlay for outside click */}
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.overlay}>
          {/* Stop propagation so inner box isn't clickable outside */}
          <TouchableWithoutFeedback>
            <View style={styles.box}>
              <Text style={styles.title}>
                {getText(
                  'membershipWithdrawalScreen.confirmationDialog.title',
                  '',
                )}
              </Text>
              {getText(
                'membershipWithdrawalScreen.confirmationDialog.description',
                [],
              ).map((text, index) => {
                return (
                  <Text key={index} style={styles.text}>
                    {text}
                  </Text>
                );
              })}

              <TouchableOpacity style={styles.button} onPress={onConfirm}>
                <Text style={styles.buttonText}>
                  {' '}
                  {getText(
                    'membershipWithdrawalScreen.confirmationDialog.buttonText',
                    '',
                  )}
                </Text>
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
}

const styles = StyleSheet.create({
  overlay: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.4)',
  },
  box: {
    width: '80%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 20,
    elevation: 5,
  },
  title: {
    fontSize: 17,
    fontWeight: '600',
    marginBottom: 10,
    textAlign: 'center',
  },
  text: {
    fontSize: 15,
    color: '#444',
    textAlign: 'center',
  },
  button: {
    backgroundColor: '#000',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 20,
  },
  buttonText: {
    color: '#fff',
    textAlign: 'center',
    fontWeight: '500',
  },
});
