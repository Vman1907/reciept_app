import React from 'react';
import {StyleSheet, TouchableOpacity, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {THEME} from '../../../../assets/image';
import PageHeader from '../../../components/elements/pageHeader';
import Text from '../../../components/elements/text';
import useTheme from '../../../hooks/useTheme';

const Profile = () => {
  const {isDark, toggleTheme} = useTheme();
  return (
    <SafeAreaView>
      <View style={isDark ? styles.containerDark : styles.container}>
        <PageHeader header="Profile and Settings" />
        <View>
          <TouchableOpacity style={styles.themeButton} onPress={toggleTheme}>
            <THEME />
            <Text>Theme</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: '5%',
    height: '100%',
    backgroundColor: 'white',
    paddingVertical: '2%',
  },
  containerDark: {
    display: 'flex',
    paddingHorizontal: '5%',
    height: '100%',
    backgroundColor: 'black',
    paddingVertical: '2%',
  },
  themeButton: {
    display: 'flex',
    flexDirection: 'row',
    alignItems: 'center',
    padding: 4,
    gap: 10,
    marginTop: '10%',
  },
});

export default Profile;
