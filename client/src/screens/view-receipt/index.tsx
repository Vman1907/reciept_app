import React from 'react';
import {
  Alert,
  PermissionsAndroid,
  Platform,
  StyleSheet,
  TouchableOpacity,
  View,
} from 'react-native';
import RNFS from 'react-native-fs';
import {SafeAreaView} from 'react-native-safe-area-context';
import {useDispatch, useSelector} from 'react-redux';
import {EDIT, SHARE, TRASH} from '../../../assets/image';
import ConfirmationDialog from '../../components/comfirm-dialog';
import Button from '../../components/elements/button';
import PageHeader from '../../components/elements/pageHeader';
import Text from '../../components/elements/text';
import ReceiptService from '../../services/receipts.service';
import {StoreNames, StoreState} from '../../store';
import {deleteReceipt, reset} from '../../store/reducers/ReceiptReducer';
import {Receipt} from '../../store/types/ReceiptState';
import {IdType, SCREENS} from '../../utils/const';

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

  // const handleDownload = async () => {
  //   setLoading(true);
  // };

  const handleDownload = async () => {
    const fileUrl =
      'https://drive.google.com/uc?export=download&id=13FQrm-uo5RVvc-7QxSDtk7j4WPwFL88t'; // Replace with your file URL
    const fileName = 'receipt.pdf';
    const downloadPath =
      Platform.OS === 'android'
        ? `${RNFS.DownloadDirectoryPath}/${fileName}`
        : `${RNFS.DocumentDirectoryPath}/${fileName}`;
    const options = {
      fromUrl: fileUrl,
      toFile: downloadPath,
    };

    const granted = await hasAndroidPermission();
    if (!granted) {
      return Alert.alert(
        'Permission Denied',
        'Storage permission is required.',
      );
    }
    try {
      setLoading(true);
      const result = await ReceiptService.downloadReceipt(details.id);
      if (result instanceof Error) {
        Alert.alert('Download Failed', 'File could not be downloaded.');
      } else {
        Alert.alert('Download Complete', `File saved to ${downloadPath}`);
      }
    } catch (err) {
      console.error('Download Error:', err);
      Alert.alert('Error', 'An error occurred while downloading the file.');
    } finally {
      setLoading(false);
    }
  };

  async function hasAndroidPermission() {
    if (Number(Platform.Version) >= 33) {
      return true;
    }

    const permission = PermissionsAndroid.PERMISSIONS.WRITE_EXTERNAL_STORAGE;

    console.log('Checking permission:', permission);

    const hasPermission = await PermissionsAndroid.check(permission);
    if (hasPermission) {
      return true;
    }

    const status = await PermissionsAndroid.request(permission);
    return status === 'granted';
  }

  const handleDelete = async () => {
    setLoading(true);

    ReceiptService.deleteReceipt(details.id)
      .then(res => {
        if (res) {
          dispatch(deleteReceipt([details.id]));
          navigation.navigate(SCREENS.HOME);
        }
      })
      .catch(err => {
        setError({
          field: 'name',
          message: 'Failed to delete receipt',
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
            <TouchableOpacity>
              <ConfirmationDialog
                name={details.id}
                onConfirm={handleDelete}
                isLoading={loading}>
                <TRASH />
              </ConfirmationDialog>
            </TouchableOpacity>
          </View>
        </PageHeader>
        <View style={styles.pageContainer}>
          <View style={styles.label}>
            <Text fontWeight="medium">
              Receipt ID
              <Text fontWeight="medium" style={styles.infoText}>
                #{details.referenceNumber}
              </Text>
            </Text>
            <Text fontWeight="bold">
              ({IdType[details.idType]}-{details.idNumber})
            </Text>
          </View>
          <Text>Address: {details.address}</Text>
          <Text>Date: {new Date(details.createdAt).toLocaleDateString()}</Text>
          <Text>Customer Name: {details.name}</Text>
          <Text>Total Amount: ₹{details.amount}</Text>
          <View style={styles.submitButton}>
            <Text>{error.message}</Text>
            <Button loading={loading} onPress={handleDownload}>
              <Text style={styles.submitButtonText}>Download receipt</Text>
            </Button>
          </View>
        </View>
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
    flexGrow: 1,
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
  submitButton: {
    marginTop: 'auto',
    justifyContent: 'flex-end',
  },
});
