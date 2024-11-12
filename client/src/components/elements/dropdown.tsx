import React from 'react';
import {StyleSheet, View} from 'react-native';
import {TouchableRipple} from 'react-native-paper';
import {CHEVRON_DOWN} from '../../../assets/image';
import {COLORS} from '../../utils/const';
import Text from './text';

export default function DropDown({
  value: _value,
  setValue,
  items,
}: {
  value: string;
  items: string[];
  setValue: (value: string) => void;
}) {
  const [visible, setVisible] = React.useState(false);

  const toggle = () => setVisible(!visible);

  const closeMenu = (value: string) => {
    setValue(value);
    setVisible(false);
  };

  return (
    <View style={[style.container, visible ? null : style.collapseHeight]}>
      <TouchableRipple onPress={toggle}>
        <View style={style.itemContainer}>
          <Text style={style.text}>{_value}</Text>
          <CHEVRON_DOWN style={visible ? style.down : null} />
        </View>
      </TouchableRipple>
      {items.map((method, index) => {
        if (method === _value) {
          return;
        }
        return (
          <TouchableRipple key={index} onPress={() => closeMenu(method)}>
            <View style={style.itemContainer}>
              <Text style={style.text}>{method}</Text>
            </View>
          </TouchableRipple>
        );
      })}
    </View>
  );
}

const style = StyleSheet.create({
  container: {
    width: '100%',
    backgroundColor: COLORS.SECONDARY,
    borderRadius: 15,
    overflow: 'hidden',
  },
  itemContainer: {
    display: 'flex',
    flexDirection: 'row',
    paddingHorizontal: '5%',
    paddingVertical: '4%',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  text: {
    fontSize: 16,
  },
  down: {
    transform: [{rotate: '180deg'}],
  },
  collapseHeight: {
    height: 60,
  },
});
