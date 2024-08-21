import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, BottomSheet, ListItem} from 'react-native-elements';
import React from 'react';
import IconAnt from '../IconAnt';
import {useState} from 'react';
import {useNavigation} from '@react-navigation/native';

const TopIconButton = props => {
  const navigation = useNavigation();
  const [isVisible, setIsVisible] = useState(false);
  const list = [
    {
      title: '添加好友',
      onPress: () => {
        setIsVisible(false);
        navigation.navigate('AddFriend');
      },
    },
    {
      title: '创建群聊',
      onPress: () => {
        setIsVisible(false);
        navigation.navigate('CreateChatGroups');
      },
    },
    {
      title: '取消',
      containerStyle: {backgroundColor: 'white'},
      titleStyle: {color: 'red'},
      onPress: () => setIsVisible(false),
    },
  ];
  return (
    <View style={styles.iconDiv}>
      <TouchableOpacity onPress={() => navigation.navigate('AddFriend')}>
        <IconAnt name={'search1'} size={22} style={{paddingRight: 20}} />
      </TouchableOpacity>

      <TouchableOpacity onPress={() => setIsVisible(true)}>
        <IconAnt name={'pluscircleo'} size={22} />
      </TouchableOpacity>
      <BottomSheet
        isVisible={isVisible}
        containerStyle={{backgroundColor: 'rgba(0.5, 0.25, 0, 0.2)'}}>
        {list.map((l, i) => (
          <TouchableOpacity key={i} onPress={l.onPress}>
            <ListItem
              key={i}
              containerStyle={l.containerStyle}
              onPress={l.onPress}>
              <ListItem.Content>
                <ListItem.Title style={l.titleStyle}>{l.title}</ListItem.Title>
              </ListItem.Content>
            </ListItem>
          </TouchableOpacity>
        ))}
      </BottomSheet>
    </View>
  );
};
const styles = StyleSheet.create({
  iconDiv: {
    flexDirection: 'row',
    width: 60,
  },
});

export default TopIconButton;
