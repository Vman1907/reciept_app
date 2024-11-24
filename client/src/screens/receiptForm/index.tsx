import React from 'react';
import {ScrollView, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import Button from '../../components/elements/button';
import DropDown from '../../components/elements/dropdown';
import {NumberInput, TextInput} from '../../components/elements/Input';
import PageHeader from '../../components/elements/pageHeader';
import Text from '../../components/elements/text';
import ReceiptService from '../../services/receipts.service';
import {StoreNames, StoreState} from '../../store';
import {
  setReceiptAddress,
  setReceiptAmount,
  setReceiptIdNumber,
  setReceiptIdType,
  setReceiptMobile,
  setReceiptName,
  setReceiptPaymentMethod,
  setReceiptReferenceNumber,
} from '../../store/reducers/ReceiptReducer';
import {Receipt} from '../../store/types/ReceiptState';
import {idTypes, PaymentMethods, SCREENS} from '../../utils/const';
import { AxiosError } from 'axios';

export default function ReceiptForm({
  navigation,
}: {
  navigation: any;
  route: any;
}) {
  const dispatch = useDispatch();
  const [error, setError] = React.useState<{
    field: keyof Omit<Receipt, 'createdAt'> | '';
    message: string;
  }>({
    field: '',
    message: '',
  });

  const [loading, setLoading] = React.useState<boolean>(false);

  const {details} = useSelector(
    (state: StoreState) => state[StoreNames.RECEIPT],
  );

  const handleNavigateBack = () => {
    navigation.goBack();
  };

  const handleSubmit = async () => {
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

    setLoading(true);

    if (details.id) {
      ReceiptService.updateReceipt(details)
        .then(res => {
          if (res) {
            navigation.navigate(SCREENS.HOME);
          }
        })
        .catch(err => {
          setError({
            field: 'name',
            message: 'Failed to update receipt',
          });
          if ((err as AxiosError).response?.status === 401){
            navigation.navigate(SCREENS.LOGIN as never);
          }
            console.log((err as AxiosError).response?.status);
        })
        .finally(() => {
          setLoading(false);
        });
      return;
    }

    ReceiptService.createReceipt(details)
      .then(res => {
        if (res) {
          navigation.navigate(SCREENS.HOME as never);
        }
      })
      .catch(err => {
        setError({
          field: 'name',
          message: 'Failed to create receipt',
        });
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
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
              onChangeText={value => dispatch(setReceiptName(value))}
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
              onChangeText={value => dispatch(setReceiptMobile(value))}
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
              onChangeText={value => dispatch(setReceiptAddress(value))}
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
              setValue={value =>
                dispatch(
                  setReceiptPaymentMethod(
                    value as 'UPI' | 'Netbanking' | 'Card' | 'Cash' | 'Other',
                  ),
                )
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} fontWeight="bold">
              Amount (₹)
            </Text>
            <NumberInput
              value={details.amount.toString()}
              onChangeText={value => {
                if (Number.isNaN(Number(value))) {
                  return;
                }
                dispatch(setReceiptAmount(Number(value)));
              }}
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
              onChangeText={value => dispatch(setReceiptReferenceNumber(value))}
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
              setValue={value =>
                dispatch(setReceiptIdType(value as typeof details.idType))
              }
            />
          </View>
          <View style={styles.inputContainer}>
            <Text style={styles.label} fontWeight="bold">
              ID Number
            </Text>
            <TextInput
              value={details.idNumber ?? ''}
              onChangeText={value => dispatch(setReceiptIdNumber(value))}
              placeholder="eg. 1234124124"
            />
            {error.field === 'idNumber' && (
              <Text style={styles.error}>{error.message}</Text>
            )}
          </View>
          <Button loading={loading} onPress={handleSubmit}>
            <Text style={styles.submitButtonText}>
              {details.id ? 'Save' : 'Generate'} receipt
            </Text>
          </Button>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: 'white',
    paddingVertical: '2%',
  },
  formContainer: {
    marginTop: 10,
    paddingHorizontal: '5%',
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
