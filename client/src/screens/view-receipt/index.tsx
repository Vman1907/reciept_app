import { AxiosError } from 'axios';
import React from 'react';
import { ScrollView, StyleSheet, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useDispatch, useSelector } from 'react-redux';
import { EDIT, SHARE } from '../../../assets/image';
import Button from '../../components/elements/button';
import PageHeader from '../../components/elements/pageHeader';
import Text from '../../components/elements/text';
import ReceiptService from '../../services/receipts.service';
import { StoreNames, StoreState } from '../../store';
import { reset } from '../../store/reducers/ReceiptReducer';
import { Receipt } from '../../store/types/ReceiptState';
import { SCREENS } from '../../utils/const';

export default function ViewForm({navigation}: {navigation: any; route: any}) {
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
          if ((err as AxiosError).response?.status === 401) {
            navigation.navigate(SCREENS.LOGIN as never);
          }
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
          header="Receipt"
          backRoute={() => {
            dispatch(reset());
            handleNavigateBack();
          }}>
          <View style={styles.navbarContainer}>
            <TouchableOpacity
              onPress={() => {
                navigation.navigate(SCREENS.FORM);
              }}>
              <EDIT />
            </TouchableOpacity>
            <TouchableOpacity>
              <SHARE />
            </TouchableOpacity>
          </View>
        </PageHeader>
        <ScrollView style={styles.pageContainer}>
          <Text style={styles.label} fontWeight="medium">
            Receipt ID
            <Text fontWeight="medium" style={styles.infoText}>
              #{details.referenceNumber}
            </Text>
          </Text>
          <Text fontWeight='bold'>{details.idType}:{details.idNumber}</Text>
          <Text>Address: {details.address}</Text>
          <Text>Date: {details.date.split('-').reverse().join('/')}</Text>
          <Text>Customer Name: {details.name}</Text>
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
  navbarContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'flex-end',
    alignItems: 'center',
    marginLeft: 'auto',
    gap: 20,
  },
  container: {
    display: 'flex',
    height: '100%',
    backgroundColor: 'white',
    paddingVertical: '2%',
  },
  pageContainer: {
    marginTop: 10,
    paddingHorizontal: '5%',
  },
  label: {
    fontSize: 22,
    marginVertical: '5%',
  },
  infoText: {
    padding: 10,
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
