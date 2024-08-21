import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {
  Text,
  Card,
  ListItem,
  Button,
  Icon,
  Avatar,
} from 'react-native-elements';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import {defaultAvatar, defaultUrl} from '../../config';

const PersonItem = props => {
  const navigation = useNavigation();
  return (
    <TouchableOpacity
      onPress={() => {
        if (props.path) {
          navigation.navigate(props.path);
        }
      }}>
      <Card containerStyle={{padding: 5, margin: 0}}>
        <ListItem>
          <Avatar
            size="large"
            rounded
            source={{
              uri: props.avatar ? defaultUrl + props.avatar : defaultAvatar,
            }}
          />
          <ListItem.Content>
            <ListItem.Title>
              {props.userData ? props.userData.name : '用户13123'}
            </ListItem.Title>
            {props.remark ? (
              <ListItem.Title>{'备注：' + props.remark}</ListItem.Title>
            ) : null}
            <ListItem.Subtitle>
              {props.userData ? props.userData.code : '1919825521'}
            </ListItem.Subtitle>
          </ListItem.Content>
          {props.chevron ? <ListItem.Chevron /> : null}
        </ListItem>
      </Card>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({});

export default PersonItem;
