import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import React, {useState} from 'react';
import IconAnt from '../../../components/IconAnt';
import TopIconButton from '../../../components/topIconButton';

const MessagesHeader = props => {
  const [messagesAccount, setMessagesAccount] = useState(4);
  return (
    <View style={styles.header}>
      <Text style={styles.iconDiv}></Text>
      <Text h4>
        INY{messagesAccount > 0 ? '(' + messagesAccount.toString() + ')' : ''}
      </Text>
      {/*<View style={styles.iconDiv}>*/}
      {/*  <IconAnt name={'search1'} size={22} style={{paddingRight: 20}} />*/}
      {/*  <IconAnt name={'pluscircleo'} size={22} />*/}
      {/*</View>*/}
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

export default MessagesHeader;
