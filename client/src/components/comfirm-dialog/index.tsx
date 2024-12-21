import React from 'react';
import {StyleSheet, View} from 'react-native';
import {Dialog, Portal} from 'react-native-paper';
import Button from '../elements/button';
import Text from '../elements/text';

export default function ConfirmationDialog({
  name,
  onConfirm,
  isLoading,
  children,
}: {
  children: React.ReactNode;
  name: string;
  onConfirm: () => void;
  isLoading?: boolean;
}) {
  const [visible, setVisible] = React.useState(false);

  const showDialog = () => setVisible(true);

  const hideDialog = () => setVisible(false);
  return (
    <View>
      <Button
        compact
        mode="text"
        onPress={showDialog}
        style={styles.triggerButton}
        contentStyle={styles.triggerButtonContainer}>
        {children}
      </Button>
      <Portal>
        <Dialog
          dismissable={!isLoading}
          dismissableBackButton={false}
          visible={visible}
          onDismiss={hideDialog}>
          <Dialog.Title style={styles.title}>
            Do you want to delete "{name}"?
          </Dialog.Title>
          <Dialog.Actions style={styles.buttonsContainer}>
            <Button mode="text" onPress={hideDialog} disabled={isLoading}>
              <Text style={styles.buttonText} fontWeight="medium">
                Cancel
              </Text>
            </Button>
            <Button
              mode="text"
              onPress={hideDialog}
              loading={isLoading}
              disabled={isLoading}>
              <Text
                style={[styles.buttonText, styles.redText]}
                fontWeight="medium"
                onPress={onConfirm}>
                Delete
              </Text>
            </Button>
          </Dialog.Actions>
        </Dialog>
      </Portal>
    </View>
  );
}

const styles = StyleSheet.create({
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    textAlign: 'center',
  },
  buttonsContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonText: {
    fontSize: 16,
  },
  redText: {
    color: 'red',
  },
  triggerButton: {
    padding: 0,
    margin: 0,
  },
  triggerButtonContainer: {
    padding: 0,
    margin: 0,
  },
});
