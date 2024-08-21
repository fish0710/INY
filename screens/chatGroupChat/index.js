import {Text, View} from 'react-native';
import {GiftedChat} from 'react-native-gifted-chat';
import 'dayjs/locale/zh-cn';
import {useCallback, useContext, useEffect, useState} from 'react';
import AuthContext from '../../context/AuthContext'; //中文时间
import {defaultAvatar, defaultUrl} from '../../config';
import {
  getChatGroupMessageWithId,
  writeChatGroupMessage,
} from '../../utils/RealmUtil';
import {FindAvatar} from '../../api/chatGroup';
const ChatGroupChat = props => {
  const {params} = props.route;
  const [messages, setMessages] = useState([]);
  const {
    myId,
    newChatGroupMessageData,
    myCode,
    myName,
    myAvatar,
    changeIsGetMessageState,
  } = useContext(AuthContext);
  const onSend = useCallback((msg = []) => {
    FindAvatar(params.chatGroupId).then(theAvatarAndName => {
      const msgObj = {
        content: msg[0].text,
        senderCode: myCode,
        senderName: myName,
        sender: myId,
        date: msg[0].createdAt,
        chatGroupId: params.chatGroupId,
        senderAvatar: myAvatar,
        avatar: theAvatarAndName.avatar,
        name: theAvatarAndName.name,
      };
      console.log(msgObj);
      this.socket.emit('chatGroupMessage', {
        chatGroupId: params.chatGroupId,
        messageData: msgObj,
      });
      writeChatGroupMessage(msgObj).then(data => {
        changeIsGetMessageState();
      });
    });
    setMessages(previousMessages => GiftedChat.append(previousMessages, msg));
  }, []);
  useEffect(() => {
    getChatGroupMessageWithId(params.chatGroupId).then(function (data) {
      if (data.length > 0) {
        let list = data.map(item => {
          return {
            _id: item.id,
            text: item.content,
            createdAt: item.date,
            user: {
              _id: item.sender,
              name: item.senderName,
              avatar: item.senderAvatar
                ? defaultUrl + item.senderAvatar
                : defaultAvatar,
            },
          };
        });
        setMessages(list);
      }
    });
  }, []);

  useEffect(() => {
    if (newChatGroupMessageData.chatGroupId === params.chatGroupId) {
      let newData = {
        _id: newChatGroupMessageData.id,
        text: newChatGroupMessageData.content,
        createdAt: newChatGroupMessageData.date,
        user: {
          _id: newChatGroupMessageData.sender,
          name: newChatGroupMessageData.senderName,
          avatar: newChatGroupMessageData.senderAvatar
            ? defaultUrl + newChatGroupMessageData.senderAvatar
            : defaultAvatar,
        },
      };
      setMessages(previousMessages =>
        GiftedChat.append(previousMessages, newData),
      );
    }
  }, [newChatGroupMessageData]);
  return (
    <GiftedChat
      messages={messages}
      onSend={messages => onSend(messages)}
      renderUsernameOnMessage
      user={{
        _id: myId,
      }}></GiftedChat>
  );
};

export default ChatGroupChat;
