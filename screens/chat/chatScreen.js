//主页Tabs
// import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import React, {useState, useEffect, useCallback, useContext} from 'react';

import 'dayjs/locale/zh-cn'; //中文时间
import {GiftedChat, Bubble, Send} from 'react-native-gifted-chat';

import {Alert, View} from 'react-native';
import {getMessageWithOne, writeMessage} from '../../utils/RealmUtil';
import AuthContext from '../../context/AuthContext';
import {defaultUrl, defaultAvatar} from '../../config';
import {FindAvatar} from '../../api/findAvatar';

const ChatScreen = props => {
  const {
    myId,
    newMessageData,
    myName,
    myCode,
    changeIsGetMessageState,
    myAvatar,
    hmdSwitch,
  } = useContext(AuthContext);
  const {params} = props.route;
  const [messages, setMessages] = useState([]);
  useEffect(() => {
    FindAvatar(params.data).then(data => {
      let avatarData = data;
      getMessageWithOne(params.data).then(data => {
        if (data.length > 0) {
          let list = data.map(item => {
            return {
              _id: item.id,
              text: item.content,
              createdAt: item.date,
              user: {
                _id: item.sender == myId ? myId : params.data,
                name:
                  item.sender == params.data
                    ? item.senderName
                    : item.receiverName,
                avatar:
                  item.sender == myId
                    ? myAvatar
                      ? defaultUrl + myAvatar
                      : defaultAvatar
                    : avatarData
                    ? defaultUrl + avatarData
                    : defaultAvatar,
              },
            };
          });
          setMessages(list);
        }
      });
    });
  }, []);
  const onSend = useCallback((msg = []) => {
    const msgObj = {
      content: msg[0].text,
      senderCode: myCode,
      senderName: myName,
      sender: myId,
      isChatGroup: false,
      date: msg[0].createdAt,
      receiverCode: params.theMan.receiverCode,
      receiver: params.theMan.receiver,
      receiverName: params.theMan.receiverName,
      chatGroupId: null,
    };
    this.socket.emit('message', {
      //发送给在线用户
      room: params.theMan.receiverCode,
      messageData: msgObj,
    });
    if (!msgObj.chatGroupId) msgObj.chatGroupId = '';
    writeMessage(msgObj).then(data => {
      //把消息存到前端
      changeIsGetMessageState(); //告诉消息栏可以更新
    });
    setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
    // console.log(messages);
  }, []);

  useEffect(
    data => {
      // console.log('append', messages);
    },
    [messages],
  );

  useEffect(() => {
    if (newMessageData.sender === params.data) {
      let newData = {
        _id: newMessageData.id,
        text: newMessageData.content,
        createdAt: newMessageData.date,
        user: {
          _id: params.data,
          name:
            newMessageData.sender == params.data
              ? newMessageData.senderName
              : newMessageData.receiverName,
          avatar: 'http://192.168.145.16:3000/public/images/s1.jpg',
        },
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newData),
      );
    }
  }, [newMessageData]);

  return (
    <GiftedChat
      messages={messages}
      renderUsernameOnMessage
      onSend={messages => {
        if (!hmdSwitch) {
          onSend(messages);
        } else {
          Alert.alert('消息被拒收或被对方删除！');
        }
      }}
      user={{
        _id: myId,
      }}
    />
  );
};

export default ChatScreen;
