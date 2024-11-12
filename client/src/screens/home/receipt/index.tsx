import React, {useEffect} from 'react';
import {FlatList, StyleSheet, View} from 'react-native';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TextInput} from '../../../components/elements/Input';
import PageHeader from '../../../components/elements/pageHeader';
import ReceiptListItem from '../../../components/elements/receiptListItem';
import Text from '../../../components/elements/text';
import UserService from '../../../services/user.service';
import {Receipt} from '../../../types/receipt';
import {COLORS, SCREENS} from '../../../utils/const';

export default function ReceiptPage({navigation}: {navigation: any}) {
  const [search, setSearch] = React.useState('');

  // const navigation = useNavigation();

  const [receipts, setReceipts] = React.useState<Receipt[]>([]);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    UserService.getAllReceipts()
      .then(res => {
        setReceipts(res);
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

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
                  onPress={() =>
                    navigation.navigate(SCREENS.FORM, {
                      receipt: JSON.stringify(receipt.item),
                    })
                  }
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
