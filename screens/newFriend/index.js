import {View, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import {Text, ListItem, Avatar, Badge, Button} from 'react-native-elements';
import React, {useContext, useEffect, useState} from 'react';
import {GetAddReqList, AgreeAddReq, RejectAddReq} from '../../api/sendAddReq';
import storage from '../../libs/storage';
import AuthContext from '../../context/AuthContext';

const NewFriendScreen = props => {
  const {doRefreshAdd} = useContext(AuthContext);
  const [reqList, setReqList] = useState([]);
  useEffect(() => {
    fetchData();
  }, [fetchData]);
  const fetchData = () => {
    GetAddReqList().then(function (data) {
      storage.load({key: 'token'}).then(function (token) {
        setReqList([
          ...data.map(item => {
            if (item.sender._id === token.user._id) {
              item.isMyReq = true;
              return item;
            } else {
              item.isMyReq = false;
              return item;
            }
          }),
        ]);
      });
    });
  };

  const agreeReq = reqId => {
    AgreeAddReq(reqId).then(function (data) {
      fetchData();
      doRefreshAdd();
      Alert.alert(data);
    });
  };
  const rejectReq = reqId => {
    RejectAddReq(reqId).then(function (data) {
      fetchData();
      Alert.alert(data);
    });
  };
  return (
    <SafeAreaView>
      <ScrollView>
        {reqList.map((l, i) => (
          <ListItem key={i} bottomDivider>
            <Avatar rounded source={require('../../static/img/s1.jpg')} />
            <ListItem.Content>
              <ListItem.Title>
                {l.isMyReq ? l.receiver.name : l.sender.name}
              </ListItem.Title>
              <ListItem.Title>
                {'账号：'}
                {l.isMyReq ? l.receiver.code : l.sender.code}
              </ListItem.Title>
              {l.remark ? (
                <ListItem.Subtitle>
                  {l.isMyReq ? '我：' + l.remark : '对方：' + l.remark}
                </ListItem.Subtitle>
              ) : (
                ''
              )}
            </ListItem.Content>
            <View style={{flexDirection: 'row'}}>
              {l.isMyReq ? (
                <Text>
                  {l.isAgree === 1 ? '对方已同意' : '对方未同意或拒绝'}
                </Text>
              ) : (
                <View>
                  {l.isAgree === 0 ? (
                    <View>
                      <Button
                        onPress={() => {
                          agreeReq(l._id);
                        }}
                        title={'同意'}
                        type="clear"></Button>
                      <Button
                        onPress={() => {
                          rejectReq(l._id);
                        }}
                        title={'拒绝'}
                        type="clear"
                        titleStyle={{color: 'red'}}></Button>
                    </View>
                  ) : l.isAgree === 1 ? (
                    <Text>已同意</Text>
                  ) : (
                    <Text>已拒绝</Text>
                  )}
                </View>
              )}
            </View>
          </ListItem>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});

export default NewFriendScreen;
