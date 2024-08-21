import {View, StyleSheet} from 'react-native';
import {Text} from 'react-native-elements';
import React, {useContext, useEffect} from 'react';
import 'react-native-gesture-handler';

//导航
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();
//上下文数据
import AuthContext from '../context/AuthContext';

//子组件
import LoginScreen from './Login';
import Register from './Register';
import TabsPage from './TabsPage';
import ChatScreen from './chat/chatScreen';
import Detail from './detail';
import ChatGroupList from './chatGroupList'; //群聊列表
import NewFriendScreen from './newFriend';
import AddFriend from './addFriend'; //添加好友页面
import CreateChatGroups from './createChatGroups';
import ChatGroupsDetail from './chatGroupsDetail';
import MySet from './mySet';
import AddFriendDetail from './addFriendDetail';
import YourComponent from './Test';
import ChatGroupChat from './chatGroupChat';

// 结构返回出来的对象
const {Navigator, Screen} = Stack;

const Home = props => {
  const {state, login} = useContext(AuthContext);
  return (
    <NavigationContainer>
      <Navigator initialRouteName={!state ? 'LoginScreen' : 'TabsPage'}>
        {!state ? (
          <>
            <Screen
              name="LoginScreen"
              options={{headerShown: false}}
              component={LoginScreen}
            />
            <Screen
              name="RegisterScreen"
              options={{title: '注册'}}
              component={Register}
            />
          </>
        ) : (
          <>
            <Screen
              name="TabsPage"
              options={{headerShown: false}}
              component={TabsPage}
            />
            <Screen name="ChatScreen" component={ChatScreen} />
            <Screen name="Detail" options={{title: ''}} component={Detail} />
            <Screen
              name="ChatGroupList"
              options={{title: '群聊'}}
              component={ChatGroupList}
            />
            <Screen
              name="AddFriend"
              options={{title: '新的好友', headerShown: false}}
              component={AddFriend}
            />
            <Screen
              name="CreateChatGroups"
              options={{title: '创建群聊'}}
              component={CreateChatGroups}
            />
            <Screen
              name="ChatGroupsDetail"
              options={{title: '群聊详细'}}
              component={ChatGroupsDetail}
            />
            <Screen
              name="MySet"
              options={{title: '个人设置'}}
              component={MySet}></Screen>
            <Screen
              name="AddFriendDetail"
              options={{title: '添加好友详细信息'}}
              component={AddFriendDetail}
            />
            <Screen
              name="NewFriendScreen"
              options={{title: '新的好友'}}
              component={NewFriendScreen}
            />
            <Screen
              name="YourComponent"
              options={{title: '测试'}}
              component={YourComponent}></Screen>
            <Screen
              name="ChatGroupChat"
              options={{title: ''}}
              component={ChatGroupChat}></Screen>
          </>
        )}
      </Navigator>
    </NavigationContainer>
  );
};
const styles = StyleSheet.create({});

export default Home;
