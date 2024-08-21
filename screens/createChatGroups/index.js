import {View, StyleSheet, SafeAreaView, ScrollView, Alert} from 'react-native';
import {Avatar, Button, ListItem, Text} from 'react-native-elements';
import React, {useContext, useEffect, useState} from 'react';
import CheckBoxListItem from '../../components/checkBoxListItem';
import {GetMyFriend} from '../../api/getMyFriend';
import {CreateChatGroup} from '../../api/chatGroup';
import {useNavigation} from '@react-navigation/native';
import AuthContext from '../../context/AuthContext';

const CreateChatGroups = props => {
  const navigation = useNavigation();
  const {myName} = useContext(AuthContext);
  const [myFriend, setMyFriend] = useState([]);
  const [theChatGroupName, setTheChatGroupName] = useState([]);
  const [choseFriendList, setChoseFriendList] = useState([]);
  const [disallowCreate, setDisallowCreate] = useState(true);
  useEffect(() => {
    GetMyFriend().then(function (data) {
      if (data) {
        setMyFriend(data);
      }
    });
  }, []);
  useEffect(() => {
    if (theChatGroupName.length >= 3) {
      setDisallowCreate(false);
    } else {
      setDisallowCreate(true);
    }
  }, [theChatGroupName]);
  const doCreateChatGroup = () => {
    let name = myName + ',' + theChatGroupName.join(',') + '的群聊';
    CreateChatGroup(name, choseFriendList)
      .then(data => {
        if (data.success) {
          Alert.alert('创建成功');
          navigation.goBack();
        } else {
          Alert.alert('创建失败，请重试');
        }
      })
      .catch(err => {
        Alert.alert(err);
      });
  };
  return (
    <View>
      <SafeAreaView style={{height: 750}}>
        <ScrollView>
          {myFriend.map((l, i) => (
            <CheckBoxListItem
              data={l}
              index={i}
              key={i}
              onPress={flag => {
                if (flag) {
                  setTheChatGroupName([...theChatGroupName, l.name]);
                  setChoseFriendList([...choseFriendList, l._id]);
                } else {
                  setTheChatGroupName([
                    ...theChatGroupName.filter(name => name !== l.name),
                  ]);
                  setChoseFriendList([
                    ...choseFriendList.filter(id => id !== l._id),
                  ]);
                }
              }}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
      <ListItem key={9999999} bottomDivider>
        <ListItem.Content
          style={{
            display: 'flex',
            flexDirection: 'row',
            justifyContent: 'space-between',
          }}>
          <Button title="" type="clear" />
          <Button
            title="确认"
            type="clear"
            disabled={disallowCreate}
            onPress={doCreateChatGroup}
          />
        </ListItem.Content>
      </ListItem>
    </View>
  );
};
const styles = StyleSheet.create({});

export default CreateChatGroups;
