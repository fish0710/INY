import {
  View,
  StyleSheet,
  SafeAreaView,
  SectionList,
  ScrollView,
} from 'react-native';
import AddressListButton from '../../../components/addressListButton';
import React, {useEffect, useState, useContext} from 'react';
import AddressListItem from '../../../components/addressListItem';
import {useNavigation} from '@react-navigation/native';

import {GetMyFriend} from '../../../api/getMyFriend';
import AuthContext from '../../../context/AuthContext';

const AddressList = props => {
  const {refreshAddress} = useContext(AuthContext);
  const navigation = useNavigation();
  const buttonConfig = [
    {
      title: '按钮',
      data: [
        {
          label: '群聊',
          icon: 'addusergroup',
          message: 0,
          path: 'ChatGroupList',
        },
        {
          label: '新的好友',
          icon: 'adduser',
          message: 0,
          path: 'NewFriendScreen',
        },
      ],
    },
  ];
  const [friendList, setFriendList] = useState([]);
  useEffect(() => {
    fetchData();
  }, [refreshAddress]); // 将 fetchData 函数添加到依赖数组中
  //
  // useEffect(() => {
  //   console.log('发现要更新');
  // }, [refreshAddress]);
  const fetchData = () => {
    GetMyFriend().then(function (data) {
      if (data) {
        setFriendList([]);
        setFriendList(data);
      }
    });
  };
  return (
    <SafeAreaView>
      <View>
        <SectionList
          sections={buttonConfig}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <AddressListButton
              data={item}
              onPress={() => navigation.navigate(item.path)}
            />
          )}
        />
      </View>
      <ScrollView>
        <View>
          {friendList.map((l, i) => (
            <AddressListItem
              data={l}
              index={i}
              key={i}
              onPress={() => navigation.navigate('Detail', {theMan: l})}
            />
          ))}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});

export default AddressList;
