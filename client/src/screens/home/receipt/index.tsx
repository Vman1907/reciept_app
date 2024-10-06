import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from '../../../components/elements/Input';
import PageHeader from '../../../components/elements/pageHeader';
import ReceiptListItem from '../../../components/elements/receiptListItem';
import {Receipt} from '../../../types/receipt';
import {COLORS, SCREENS} from '../../../utils/const';

const DUMMY_DATA: Receipt[] = [
  {
    id: 1,
    date: '2022-01-01',
    name: 'John Doe',
    mobile: '1234567890',
    address: '123, Lorem Ipsum',
    city: 'City',
    amount: 1000,
    paymentMethod: 'Cash',
    referenceNumber: 'ADHR-12344',
    idType: 'PAN Card',
    idNumber: 'ABCDE1234F',
    receiptNumber: 1,
    createdAt: '2024-10-06T06:33:48.575Z',
  },
  {
    id: 2,
    date: '2022-01-01',
    name: 'John Doe',
    mobile: '1234567890',
    address: '123, Lorem Ipsum',
    city: 'City',
    amount: 1000,
    paymentMethod: 'Cash',
    referenceNumber: 'ADHR-12342',
    idType: 'PAN Card',
    idNumber: 'ABCDE1234F',
    receiptNumber: 2,
    createdAt: '2024-10-06T06:34:44.600Z',
  },
  {
    id: 2,
    date: '2022-01-01',
    name: 'John Doe',
    mobile: '1234567890',
    address: '123, Lorem Ipsum',
    city: 'City',
    amount: 1000,
    paymentMethod: 'Cash',
    referenceNumber: 'ADHR-12342',
    idType: 'PAN Card',
    idNumber: 'ABCDE1234F',
    receiptNumber: 2,
    createdAt: '2024-10-06T06:34:44.600Z',
  },
  {
    id: 2,
    date: '2022-01-01',
    name: 'John Doe',
    mobile: '1234567890',
    address: '123, Lorem Ipsum',
    city: 'City',
    amount: 1000,
    paymentMethod: 'Cash',
    referenceNumber: 'ADHR-12342',
    idType: 'PAN Card',
    idNumber: 'ABCDE1234F',
    receiptNumber: 2,
    createdAt: '2024-10-06T06:34:44.600Z',
  },
  {
    id: 2,
    date: '2022-01-01',
    name: 'John Doe',
    mobile: '1234567890',
    address: '123, Lorem Ipsum',
    city: 'City',
    amount: 1000,
    paymentMethod: 'Cash',
    referenceNumber: 'ADHR-12342',
    idType: 'PAN Card',
    idNumber: 'ABCDE1234F',
    receiptNumber: 2,
    createdAt: '2024-10-06T06:34:44.600Z',
  },
  {
    id: 2,
    date: '2022-01-01',
    name: 'John Doe',
    mobile: '1234567890',
    address: '123, Lorem Ipsum',
    city: 'City',
    amount: 1000,
    paymentMethod: 'Cash',
    referenceNumber: 'ADHR-12342',
    idType: 'PAN Card',
    idNumber: 'ABCDE1234F',
    receiptNumber: 2,
    createdAt: '2024-10-06T06:34:44.600Z',
  },
  {
    id: 2,
    date: '2022-01-01',
    name: 'John Doe',
    mobile: '1234567890',
    address: '123, Lorem Ipsum',
    city: 'City',
    amount: 1000,
    paymentMethod: 'Cash',
    referenceNumber: 'ADHR-12342',
    idType: 'PAN Card',
    idNumber: 'ABCDE1234F',
    receiptNumber: 2,
    createdAt: '2024-10-06T06:34:44.600Z',
  },
  {
    id: 2,
    date: '2022-01-01',
    name: 'John Doe',
    mobile: '1234567890',
    address: '123, Lorem Ipsum',
    city: 'City',
    amount: 1000,
    paymentMethod: 'Cash',
    referenceNumber: 'ADHR-12342',
    idType: 'PAN Card',
    idNumber: 'ABCDE1234F',
    receiptNumber: 2,
    createdAt: '2024-10-06T06:34:44.600Z',
  },
  {
    id: 2,
    date: '2022-01-01',
    name: 'John Doe',
    mobile: '1234567890',
    address: '123, Lorem Ipsum',
    city: 'City',
    amount: 1000,
    paymentMethod: 'Cash',
    referenceNumber: 'ADHR-12342',
    idType: 'PAN Card',
    idNumber: 'ABCDE1234F',
    receiptNumber: 2,
    createdAt: '2024-10-06T06:34:44.600Z',
  },
];

export default function ReceiptPage() {
  const [search, setSearch] = React.useState('');

  const navigation = useNavigation();

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

        <View style={style.scrollContainer}>
          <FlatList
            style={style.scrollComponent}
            data={[...DUMMY_DATA, ...DUMMY_DATA]}
            renderItem={receipt => (
              <ReceiptListItem
                onPress={() => navigation.navigate(SCREENS.FORM as never)}
                receipt={receipt.item}
              />
            )}
          />
        </View>
      </View>
      {/* </TouchableWithoutFeedback> */}
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
