//主页Tabs
import {View, StyleSheet} from 'react-native';
import React from 'react';

//tabs路由
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
//子组件
import Messages from './tabs/messages/messages';
import MessagesHeader from './tabs/messages/messagesHeader';
import AddressList from './tabs/addressList/addressList';
import MyAccount from './tabs/myAccount/myAccount';
import AddressListHeader from './tabs/addressList/addressListHeader';

//小组件
import IconAnt from '../components/IconAnt';
const Tab = createBottomTabNavigator();

const TabsPage = props => {
  return (
    <Tab.Navigator
      screenOptions={({route}) => ({
        tabBarIcon: ({focused, color, size}) => {
          let iconName;

          if (route.name === '消息') {
            iconName = focused ? 'message1' : 'message1';
          } else if (route.name === '联系人') {
            iconName = focused ? 'team' : 'team';
          } else if (route.name === '我的') {
            iconName = focused ? 'user' : 'user';
          }

          // 你可以根据需要修改图标的样式、颜色等属性
          return <IconAnt name={iconName} size={size} color={color} />;
        },
      })}>
      <Tab.Screen
        name="消息"
        options={{
          header: props => <MessagesHeader />,
        }}
        component={Messages}
      />
      <Tab.Screen
        name="联系人"
        options={{
          header: props => <AddressListHeader />,
        }}
        component={AddressList}
      />
      <Tab.Screen name="我的" component={MyAccount} />
    </Tab.Navigator>
  );
};
const styles = StyleSheet.create({});

export default TabsPage;
