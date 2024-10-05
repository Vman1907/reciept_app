import * as React from 'react';
import {StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import useBottomNavigation from '../../hooks/useBottomNavigation';
import {COLORS} from '../../utils/const';
import Button from '../elements/button';
import Text from '../elements/text';

export default function BottomNavigation() {
  const {pages, page: currentPage, handleChangePage} = useBottomNavigation();

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <View>
          <Text>Header</Text>
        </View>
        <View style={styles.pageContainer}>
          <View>{currentPage.component}</View>
        </View>
        <View style={styles.bottomContainer}>
          {pages.map((page, index) => (
            <Button
              mode="text"
              onPress={() => handleChangePage(index)}
              key={index}>
              <View style={styles.bottomNavigationButton}>
                <View>
                  <page.Icon
                    stroke={
                      page === currentPage ? COLORS.PRIMARY : COLORS.TEXT_MUTED
                    }
                  />
                </View>
                <View>
                  <Text
                    style={[
                      styles.bottomNavigationText,
                      page !== currentPage ? styles.textMuted : null,
                    ]}>
                    {page.title}
                  </Text>
                </View>
              </View>
            </Button>
          ))}
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    paddingTop: '5%',
    display: 'flex',
    height: '100%',
  },
  text: {
    fontSize: 20,
    color: 'black',
  },
  pageContainer: {
    flex: 1,
  },
  bottomContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
    fontSize: 12,
  },
  bottomNavigationButton: {
    display: 'flex',
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  bottomNavigationText: {
    fontSize: 14,
    color: COLORS.PRIMARY,
  },
  textMuted: {
    color: COLORS.TEXT_MUTED,
  },
});
