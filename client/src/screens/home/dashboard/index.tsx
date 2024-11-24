import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../../components/elements/button';
import PageHeader from '../../../components/elements/pageHeader';
import ReceiptListItem from '../../../components/elements/receiptListItem';
import Text from '../../../components/elements/text';
import {StoreNames, StoreState} from '../../../store';
import {setReceiptDetails} from '../../../store/reducers/ReceiptReducer';
import {COLORS, SCREENS} from '../../../utils/const';

export default function Dashboard({navigation}: {navigation: any; route: any}) {
  const nav = useNavigation();
  const dispatch = useDispatch();

  const {list, loading} = useSelector(
    (state: StoreState) => state[StoreNames.RECEIPT],
  );


  // const sortedList = list.sort((a, b) => {
  //   return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
  // });

  return (
    <SafeAreaView>
      <View style={style.pageContainer}>
        <PageHeader header="Dashboard" />

        <Text>Welcome back! What would you like to do?</Text>

        <View style={style.buttonContainer}>
          <Button
            onPress={() => nav.navigate(SCREENS.FORM as never)}
            style={style.button}>
            <Text fontWeight="bold" style={style.buttonText}>
              Create New
            </Text>
          </Button>
          <Button
            onPress={() => navigation.navigate('Receipt')}
            style={[style.button, style.secondaryButton]}>
            <Text fontWeight="bold" style={style.secondaryButtonText}>
              View All
            </Text>
          </Button>
        </View>

        <View style={style.scrollContainer}>
          <Text style={style.heading} fontWeight="bold">
            Your recent Activity:
          </Text>
          {loading ? (
            <Text>Loading...</Text>
          ) : (
            <FlatList
              style={style.scrollComponent}
              data={list}
              renderItem={receipt => (
                <ReceiptListItem
                  onPress={() => {
                    dispatch(setReceiptDetails(receipt.item));
                    nav.navigate(SCREENS.VIEW_FORM as never);
                  }}
                  receipt={receipt.item}
                />
              )}
            />
          )}
        </View>
      </View>
    </SafeAreaView>
  );
}

const style = StyleSheet.create({
  pageContainer: {
    paddingHorizontal: '5%',
    backgroundColor: 'white',
    height: '100%',
    display: 'flex',
  },
  pageContainerDark: {
    paddingHorizontal: '5%',
    backgroundColor: 'black',
    height: '100%',
    display: 'flex',
  },
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: '4%',
  },
  button: {
    flex: 1,
    padding: 5,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  secondaryButton: {
    backgroundColor: COLORS.SECONDARY,
  },
  secondaryButtonText: {
    fontSize: 16,
    color: COLORS.PRIMARY,
  },
  heading: {
    fontSize: 24,
    marginTop: 20,
    marginBottom: 10,
  },
  scrollComponent: {
    flex: 1,
  },
  scrollContainer: {
    display: 'flex',
    flex: 1,
  },
});
