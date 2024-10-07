import {useNavigation} from '@react-navigation/native';
import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import Button from '../../components/elements/button';
import DropDown from '../../components/elements/dropdown';
import {NumberInput, TextInput} from '../../components/elements/Input';
import PageHeader from '../../components/elements/pageHeader';
import Text from '../../components/elements/text';
import {Receipt} from '../../types/receipt';
import {idTypes, PaymentMethods} from '../../utils/const';

export default function ReceiptForm() {
  const navigation = useNavigation();

  const [error, setError] = React.useState<{
    field: keyof Omit<Receipt, 'createdAt'> | '';
    message: string;
  }>({
    field: '',
    message: '',
  });

  const [details, setDetails] = React.useState<Omit<Receipt, 'createdAt'>>({
    address: '',
    amount: 0,
    city: '',
    date: '',
    id: 0,
    idNumber: '',
    idType: 'Aadhar Card',
    mobile: '',
    name: '',
    paymentMethod: 'Card',
    receiptNumber: 0,
    referenceNumber: '',
  });

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleChange = (
    type: keyof Omit<Receipt, 'createdAt'>,
    value: string | number,
  ) => {
    if (type === 'mobile') {
      if (value.toString().trim().length > 10) {
        return;
      }
    }
    setDetails(prev => {
      return {
        ...prev,
        [type]: value,
      };
    });
  };

  const handleSubmit = () => {
    if (details.name.trim().length < 3) {
      setError({
        field: 'name',
        message: 'Name should be at least 3 characters long',
      });
      return;
    }
    if (details.mobile.trim().length < 10) {
      setError({
        field: 'mobile',
        message: 'Mobile number should be atleast 10 characters long',
      });
      return;
    }
    if (details.address.trim().length < 1) {
      setError({
        field: 'address',
        message: 'Address cannot be empty',
      });
      return;
    }
    if (details.amount <= 0) {
      setError({
        field: 'amount',
        message: 'Amount should be greater than 0',
      });
      return;
    }
    if (details.referenceNumber.trim().length < 3) {
      setError({
        field: 'referenceNumber',
        message: 'Reference number should be atleast 3 characters long',
      });
      return;
    }
    if (details.idNumber.trim().length < 3) {
      setError({
        field: 'idNumber',
        message: 'ID number should be atleast 3 characters long',
      });
      return;
    }
    setError({
      field: '',
      message: '',
    });
  };

  return (
    <SafeAreaView>
      <View style={styles.container}>
        <PageHeader
          header="Create New Receipt"
          backRoute={handleNavigateBack}
        />
        <ScrollView style={styles.formContainer}>
          <View style={styles.inputContainer}>
            <Text style={styles.label} fontWeight="bold">
              Name
            </Text>
            <TextInput
              value={details.name}
              onChangeText={value => handleChange('name', value)}
              placeholder="eg. John Doe"
            />
            {error.field === 'name' && (
              <Text style={styles.error}>{error.message}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} fontWeight="bold">
              Mobile
            </Text>
            <NumberInput
              value={details.mobile}
              onChangeText={value => handleChange('mobile', value)}
              placeholder="eg. 98XXXXXX43"
            />
            {error.field === 'mobile' && (
              <Text style={styles.error}>{error.message}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} fontWeight="bold">
              Address
            </Text>
            <TextInput
              value={details.address}
              onChangeText={value => handleChange('address', value)}
              placeholder="eg. Gandhinagar, Near NH-4, Mumbai"
            />
            {error.field === 'address' && (
              <Text style={styles.error}>{error.message}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} fontWeight="bold">
              Payment Method
            </Text>
            <DropDown
              items={PaymentMethods}
              value={details.paymentMethod}
              setValue={value => handleChange('paymentMethod', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} fontWeight="bold">
              Amount (₹)
            </Text>
            <NumberInput
              value={details.amount.toString()}
              onChangeText={value => handleChange('amount', value)}
              placeholder="eg. 4000"
            />
            {error.field === 'amount' && (
              <Text style={styles.error}>{error.message}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} fontWeight="bold">
              Reference Number
            </Text>
            <TextInput
              value={details.referenceNumber ?? ''}
              onChangeText={value => handleChange('referenceNumber', value)}
              placeholder="eg. 4000"
            />
            {error.field === 'referenceNumber' && (
              <Text style={styles.error}>{error.message}</Text>
            )}
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} fontWeight="bold">
              ID Type
            </Text>
            <DropDown
              items={idTypes}
              value={details.idType}
              setValue={value => handleChange('idType', value)}
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} fontWeight="bold">
              ID Number
            </Text>
            <TextInput
              value={details.idNumber ?? ''}
              onChangeText={value => handleChange('idNumber', value)}
              placeholder="eg. 1234124124"
            />
            {error.field === 'idNumber' && (
              <Text style={styles.error}>{error.message}</Text>
            )}
          </View>
          <Button onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>Generate Receipt</Text>
          </Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    paddingHorizontal: '5%',
    height: '100%',
    backgroundColor: 'white',
    paddingVertical: '2%',
  },
  formContainer: {
    marginTop: 10,
  },
  label: {
    fontSize: 16,
  },
  inputContainer: {
    display: 'flex',
    flexDirection: 'column',
    gap: 5,
    marginBottom: 10,
  },
  submitButtonText: {
    color: 'white',
    fontSize: 16,
  },
  error: {
    color: 'red',
    fontSize: 16,
  },
});
