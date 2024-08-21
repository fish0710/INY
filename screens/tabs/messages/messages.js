import {
  StyleSheet,
  SafeAreaView,
  SectionList,
  StatusBar,
  View,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import AuthContext from '../../../context/AuthContext';
import {useContext} from 'react';
import {Button, Text} from 'react-native-elements';

//导航
import {useNavigation} from '@react-navigation/native';

import MessageItem from '../../../components/messageItem';
import ChatGroupMessageItem from '../../../components/chatGroupMessageItem';

import {
  writeToRealm,
  queryAllFromRealm,
  clearRowFromRealm,
  clearAllFromRealm,
  writeMessage,
  getMessageItem,
  getChatGroupMessageItem,
} from '../../../utils/RealmUtil';
import {FindAvatar} from '../../../api/findAvatar';

const MessageList = props => {
  const {isGetMessage, newChatGroupMessage} = useContext(AuthContext);
  const [list, setList] = useState([]);
  useEffect(() => {
    let newList = [];
    getMessageItem().then(data => {
      // setList([]);
      // setList([{data: [...data]}]);
      if (data.length > 0) {
        newList = [{data: [...data], title: '联系人'}];
      }
      getChatGroupMessageItem().then(data1 => {
        if (data1.length > 0) {
          newList = [...newList, {data: [...data1], title: '群聊'}];
        }
        setList([]);
        setList([...newList]);
      });
    });
  }, [isGetMessage, newChatGroupMessage]);
  const navigation = useNavigation();
  return (
    <SafeAreaView>
      <SectionList
        sections={list}
        keyExtractor={(item, index) => item + index}
        renderItem={({item}) =>
          !item.chatGroupId ? (
            <MessageItem
              data={item}
              onPress={() => {
                navigation.navigate('ChatScreen', {
                  data: item.theShow,
                  theMan: {
                    receiver: item.theShow,
                    receiverCode:
                      item.theShow === item.sender
                        ? item.senderCode
                        : item.receiverCode,
                    receiverName:
                      item.theShow === item.sender
                        ? item.senderName
                        : item.receiverName,
                  },
                });
              }}
            />
          ) : (
            <ChatGroupMessageItem
              data={item}
              onPress={() => {
                navigation.navigate('ChatGroupChat', {
                  chatGroupId: item.chatGroupId,
                });
              }}></ChatGroupMessageItem>
          )
        }
        renderSectionHeader={({section: {title}}) => (
          <View
            style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text>{title}</Text>
          </View>
        )}
      />
    </SafeAreaView>
  );
};

const Messages = props => {
  return <MessageList />;
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: StatusBar.currentHeight,
    marginHorizontal: 16,
  },
  item: {
    backgroundColor: '#ffffff',
    padding: 20,
    marginVertical: 1,
  },
  header: {
    fontSize: 32,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 24,
  },
});

export default Messages;
