import {ListItem, Avatar, CheckBox, Text} from 'react-native-elements';
import {TouchableOpacity} from 'react-native';
import React, {useEffect, useState} from 'react';
import {defaultAvatar, defaultUrl} from '../../config';

const CheckBoxListItem = props => {
  const [check, setCheck] = useState(false);
  const changeCheck = () => {
    setCheck(!check);
  };
  const touchF = () => {
    changeCheck();
    // console.log(check);
    // props.onPress();
  };
  useEffect(() => {
    props.onPress(check);
  }, [check]);
  const [item, setItem] = useState(props.data);
  const [index, setIndex] = useState(props.index);
  return (
    <TouchableOpacity onPress={touchF}>
      <ListItem key={index} bottomDivider>
        <ListItem.CheckBox title="" checked={check} onPress={changeCheck} />
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

export default CheckBoxListItem;
