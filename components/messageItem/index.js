import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text, Avatar} from 'react-native-elements';
import React, {useContext, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {defaultUrl, defaultAvatar} from '../../config';
import {FindAvatar} from '../../api/findAvatar';
import storage from '../../libs/storage';
import AuthContext from '../../context/AuthContext';
const MessageItem = props => {
  const {myFriend} = useContext(AuthContext);
  const [message, setMessage] = useState(props.data.content);
  const [userName, setUserName] = useState(
    props.data.theShow === props.data.receiver
      ? props.data.receiverName
      : props.data.senderName,
  );
  const [newestDate, setNewestDate] = useState(props.data.date);
  const [avatar, setAvatar] = useState('');
  const [remark, setRemark] = useState('');
  const findRemark = () => {
    let remark = '';
    myFriend.map(item => {
      if (item.id === props.data.theShow) {
        remark = item.remark;
      }
    });
    return remark;
  };
  useEffect(() => {
    FindAvatar(props.data.theShow).then(data => {
      setAvatar(data);
      setRemark(findRemark());
    });
  }, []);
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Avatar
            rounded
            source={{uri: avatar ? defaultUrl + avatar : defaultAvatar}}
          />
        </View>
        <View style={styles.nameAndMessage}>
          <Text style={{fontSize: 20}}>{remark ? remark : userName}</Text>
          <Text style={{fontSize: 12, color: 'grey'}}>
            {message
              ? message.length < 15
                ? message
                : message.slice(0, 15) + '...'
              : ''}
          </Text>
        </View>
        <View style={styles.date}>
          <Text>{dayjs(newestDate).format('MM月DD日')}</Text>
          {/*<Text>{newestDate}</Text>*/}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 0.5,
  },
  avatar: {
    flexBasis: 'auto',
    flexShrink: 1,
    flexGrow: 0,
  },
  nameAndMessage: {
    paddingLeft: 5,
    flexBasis: 'auto',
    flexShrink: 1,
    flexGrow: 1,
  },
  date: {
    flexBasis: 'auto',
    flexShrink: 1,
    flexGrow: 0,
    width: 70,
  },
});

export default MessageItem;
