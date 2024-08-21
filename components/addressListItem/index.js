import {Text, ListItem, Avatar} from 'react-native-elements';
import {View, StyleSheet, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import {defaultAvatar, defaultUrl} from '../../config';

const AddressListItem = props => {
  const [item, setItem] = useState(props.data);
  const [index, setIndex] = useState(props.index);
  return (
    <TouchableOpacity onPress={props.onPress}>
      <ListItem key={index} bottomDivider>
        <Avatar
          rounded
          source={{uri: item.avatar ? defaultUrl + item.avatar : defaultAvatar}}
        />
        <ListItem.Content>
          <ListItem.Title>{item.name}</ListItem.Title>
          {item.remark ? (
            <ListItem.Subtitle>
              <Text>备注：</Text>
              {item.remark}
            </ListItem.Subtitle>
          ) : (
            ''
          )}
          {item.code ? (
            <ListItem.Subtitle>
              <Text>账号：</Text>
              {item.code}
            </ListItem.Subtitle>
          ) : (
            ''
          )}
        </ListItem.Content>
      </ListItem>
    </TouchableOpacity>
  );
};

export default AddressListItem;
