import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import {Text, Avatar} from 'react-native-elements';
import React, {useContext, useEffect, useState} from 'react';
import dayjs from 'dayjs';
import {defaultUrl, defaultAvatar} from '../../config';
const ChatGroupMessageItem = props => {
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.row}>
        <View style={styles.avatar}>
          <Avatar
            rounded
            source={{
              uri: props.data.avatar
                ? defaultUrl + props.data.avatar
                : defaultAvatar,
            }}
          />
        </View>
        <View style={styles.nameAndMessage}>
          <Text style={{fontSize: 20}}>
            {props.data.name
              ? props.data.name.length < 10
                ? props.data.name
                : props.data.name.slice(0, 10) + '...'
              : ''}
          </Text>
          <Text style={{fontSize: 12, color: 'grey'}}>
            {props.data.senderName + '：'}
            {props.data.content
              ? props.data.content.length < 15
                ? props.data.content
                : props.data.content.slice(0, 15) + '...'
              : ''}
          </Text>
        </View>
        <View style={styles.date}>
          <Text>{dayjs(props.data.date).format('MM月DD日')}</Text>
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
export default ChatGroupMessageItem;
