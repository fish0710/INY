import {View, StyleSheet, SectionList, TouchableOpacity} from 'react-native';
import {Text, Button, ListItem} from 'react-native-elements';
import React, {useContext} from 'react';
import PersonItem from '../../../components/personButton';
import AddressListButton from '../../../components/addressListButton';
import AuthContext from '../../../context/AuthContext';
import storage from '../../../libs/storage';

const MyAccount = props => {
  const {loginOut, myAvatar, myName, myCode} = useContext(AuthContext);
  const doLoginOut = () => {
    storage.load({key: 'token'}).then(function (data) {
      let roomId = data.user.code;
      storage
        .remove({key: 'token'})
        .then(function (data) {
          this.socket.emit('leaveRoom', roomId);
          loginOut();
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
  const buttonConfig = [
    {
      title: '按钮',
      data: [{label: '关于', icon: 'info', message: 0}],
    },
  ];
  return (
    <View>
      <PersonItem
        path={'MySet'}
        avatar={myAvatar}
        userData={{name: myName, code: myCode}}></PersonItem>
      <View style={{marginVertical: 10}}>
        <SectionList
          sections={buttonConfig}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => <AddressListButton data={item} />}
        />
      </View>
      <TouchableOpacity onPress={doLoginOut}>
        <ListItem
          containerStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 17, color: 'red'}}>退出登录</Text>
        </ListItem>
      </TouchableOpacity>
    </View>
  );
};
const styles = StyleSheet.create({});

export default MyAccount;
