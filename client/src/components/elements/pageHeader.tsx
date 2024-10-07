import React from 'react';
import {StyleSheet, View} from 'react-native';
import {CHEVRON_LEFT} from '../../../assets/image';
import Text from './text';

export default function PageHeader({
  header,
  backRoute,
}: {
  header: string;
  backRoute?: () => void;
}) {
  return (
    <View style={style.headerContainer}>
      {backRoute && <CHEVRON_LEFT onPress={backRoute} />}
      <Text fontWeight="bold" style={style.headerText}>
        {header}
      </Text>
    </View>
  );
}

const style = StyleSheet.create({
  headerContainer: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingTop: '5%',
  },
  headerText: {
    fontSize: 28,
  },
  backButton: {
    padding: 0,
  },
});
