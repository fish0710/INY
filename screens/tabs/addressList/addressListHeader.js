import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import React, {useState} from 'react';
import TopIconButton from '../../../components/topIconButton';

const AddressListHeader = props => {
  const [messagesAccount, setMessagesAccount] = useState(4);
  return (
    <View style={styles.header}>
      <Text h4>联系人</Text>
      <TopIconButton></TopIconButton>
    </View>
  );
};
const styles = StyleSheet.create({
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 20,
    backgroundColor: 'rgb(250,250,250)',
  },
  centerItem: {flex: 0},
  iconDiv: {
    flexDirection: 'row',
    width: 60,
  },
});

export default AddressListHeader;
