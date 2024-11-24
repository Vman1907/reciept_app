import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {TextInput} from '../../../components/elements/Input';
import PageHeader from '../../../components/elements/pageHeader';
import ReceiptListItem from '../../../components/elements/receiptListItem';
import Text from '../../../components/elements/text';
import {StoreNames, StoreState} from '../../../store';
import {setReceiptDetails} from '../../../store/reducers/ReceiptReducer';
import {COLORS, SCREENS} from '../../../utils/const';

export default function ReceiptPage({navigation}: {navigation: any}) {
  const dispatch = useDispatch();
  const [search, setSearch] = React.useState('');

  const {list: receipts, loading} = useSelector(
    (state: StoreState) => state[StoreNames.RECEIPT],
  );

  const filtered = receipts.filter(receipt => {
    return (
      receipt.name.toLowerCase().includes(search.toLowerCase()) ||
      receipt.mobile.toLowerCase().includes(search.toLowerCase())
    );
  });

  return (
    <SafeAreaView>
      {/* <TouchableWithoutFeedback onPress={Keyboard.dismiss}> */}
      <View style={style.pageContainer}>
        <PageHeader header="View All Receipts" />

        <View style={style.inputContainer}>
          <TextInput
            value={search}
            onChangeText={setSearch}
            placeholder="Enter customer name or mobile number"
            style={style.input}
          />
        </View>
        {loading ? (
          <Text>Loading...</Text>
        ) : (
          <View style={style.scrollContainer}>
            <FlatList
              style={style.scrollComponent}
              data={filtered}
              renderItem={receipt => (
                <ReceiptListItem
                  onPress={() => {
                    dispatch(setReceiptDetails(receipt.item));
                    navigation.navigate(SCREENS.FORM);
                  }}
                  receipt={receipt.item}
                />
              )}
            />
          </View>
        )}
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
  inputContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: '4%',
  },
  input: {
    flex: 1,
    borderRadius: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
  },
  buttonContent: {
    padding: 0,
    margin: 0,
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
    marginTop: 10,
    display: 'flex',
    flex: 1,
    zIndex: 1000,
  },
});
