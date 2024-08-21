import {View, StyleSheet, SafeAreaView, ScrollView} from 'react-native';
import {Text, Card, ListItem, Button, Avatar} from 'react-native-elements';
import React from 'react';
import AddressListItem from '../addressListItem';
const ChatGroupAvatar = props => {
  return (
    <Card containerStyle={{padding: 20, margin: 0}}>
      <Card.Title>成员列表</Card.Title>
      <Card.Divider />
      <SafeAreaView style={{maxHeight: 300}}>
        <ScrollView>
          {props.memberList.map((l, i) => (
            <AddressListItem
              data={l}
              index={i}
              key={i}
              onPress={() => console.log('1')}
            />
          ))}
        </ScrollView>
      </SafeAreaView>
    </Card>
  );
};
const styles = StyleSheet.create({});

export default ChatGroupAvatar;
