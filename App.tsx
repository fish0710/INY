/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import React, {useState, useContext, useEffect} from 'react';
import type {PropsWithChildren} from 'react';
import {StyleSheet, View, Button} from 'react-native';
import {Text} from 'react-native-elements';
//导航

import 'react-native-gesture-handler';
import io from 'socket.io-client';
// 结构返回出来的对象

import AuthProvider from './context/AuthProvider';
import Home from './screens/Home';
import {socketURL} from './config';

import notifee, {EventType} from '@notifee/react-native';

this.socket = undefined;

function App(): React.JSX.Element {
  async function onDisplayNotification(data) {
    // 请求权限（iOS 需要）
    await notifee.requestPermission();

    // 创建一个频道（Android 需要）
    const channelId = await notifee.createChannel({
      id: data.id ? data.id : 'default',
      name: data.name ? data.name : '默认频道',
    });

    // 显示一个通知
    await notifee.displayNotification({
      title: data.title ? data.title : '通知标题',
      body: data.body ? data.body : '通知的主体内容',
      android: {
        channelId,
        // 如果你想要通知被按下时打开应用，需要 pressAction
        pressAction: {
          id: 'default',
        },
      },
    });
    await notifee.onBackgroundEvent(async ({type, detail}) => {
      // 处理后台事件
      const {notification, pressAction} = detail;
      // 记录通知数据
      console.log('类型 ', type);
      console.log('通知数据 ', detail);

      // 检查用户是否已按下通知
      // if (type === EventType.PRESS && pressAction.id === 'default') {
      //   // 进行一些处理..
      //   console.log('默认按钮被按下');
      //   // 在事件被注册后移除通知。
      //   await notifee.cancelNotification(notification.id);
      // }
    });
  }
  this.notice = onDisplayNotification;
  this.socket = io(socketURL); //连接socket服务器
  return (
    <AuthProvider>
      <Home></Home>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({});

export default App;
