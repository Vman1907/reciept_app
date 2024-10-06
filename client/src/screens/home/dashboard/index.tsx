import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../../components/elements/button';
import PageHeader from '../../../components/elements/pageHeader';
import ReceiptListItem from '../../../components/elements/receiptListItem';
import Text from '../../../components/elements/text';
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

export default function Dashboard({navigation}: {navigation: any}) {
  const nav = useNavigation();

  return (
    <SafeAreaView>
      <View style={style.pageContainer}>
        <PageHeader header="Dashboard" />

        <Text>Welcome back! What would you like to do?</Text>

        <View style={style.buttonContainer}>
          <Button
            onPress={() => nav.navigate(SCREENS.FORM as never)}
            contentStyle={style.buttonContent}
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
          <FlatList
            style={style.scrollComponent}
            data={[...DUMMY_DATA, ...DUMMY_DATA]}
            renderItem={receipt => <ReceiptListItem receipt={receipt.item} />}
          />
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
  buttonContainer: {
    display: 'flex',
    flexDirection: 'row',
    gap: 10,
    marginTop: '4%',
  },
  button: {
    flex: 1,
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
    display: 'flex',
    flex: 1,
  },
});
