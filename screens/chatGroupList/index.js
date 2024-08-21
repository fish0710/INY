import {View, StyleSheet, SafeAreaView} from 'react-native';
import {Text} from 'react-native-elements';
import {useNavigation} from '@react-navigation/native';
import React, {useEffect, useState} from 'react';
import AddressListItem from '../../components/addressListItem';
import {defaultAvatar, defaultUrl} from '../../config';
import {FindMyChatGroup} from '../../api/chatGroup';
const ChatGroupList = props => {
  const navigation = useNavigation();
  const [chatGroupsList, setChatGroupsList] = useState([]);
  useEffect(() => {
    FindMyChatGroup().then(function (data) {
      setChatGroupsList(data.data);
    });
  }, []);
  const goToDetail = data => {
    navigation.navigate('ChatGroupsDetail', {chatGroupData: data});
  };
  return (
    <SafeAreaView>
      <View>
        {chatGroupsList.map((l, i) => (
          <AddressListItem
            data={l}
            index={i}
            key={i}
            onPress={() => goToDetail(l)}
          />
        ))}
      </View>
    </SafeAreaView>
  );
};
const styles = StyleSheet.create({});

export default ChatGroupList;
