import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import React, {useContext, useEffect, useState} from 'react';
import AuthContext from '../context/AuthContext';
import storage from '../libs/storage';
import {doLogin} from '../api/login/login';
import {writeChatGroupMessage, writeMessage} from '../utils/RealmUtil';
import io from 'socket.io-client';
import {socketURL} from '../config';
import {getSvg} from '../api/login/login';
import {SvgXml} from 'react-native-svg';

const Login = function (props) {
  let notice = this.notice; //拿到提醒函数
  const {
    state,
    login,
    changeIsGetMessageState,
    doSetMyAvatar,
    changeIsGetNewChatGroupMessage,
    loginOut,
  } = useContext(AuthContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [yzm, setYzm] = useState('');
  const [isGetSvg, setIsGetSvg] = useState(false);
  const [svg, setSvg] = useState('');
  const {navigation} = props;
  const doLoginOut = msg => {
    storage.load({key: 'token'}).then(function (data) {
      let roomId = data.user.code;
      storage
        .remove({key: 'token'})
        .then(function (data) {
          Alert.alert('该账号已被封禁');
          this.socket.emit('leaveRoom', roomId);
          loginOut();
        })
        .catch(err => {
          console.log(err);
        });
    });
  };
  const _doLogin = async () => {
    if (email == '' || password == '') {
      Alert.alert('请输入用户名和密码');
      return;
    }
    try {
      let res = await doLogin({code: email, pwd: password});
      if (res.success) {
        doSetMyAvatar(res.data.user.avatar);
        console.log('res.data.user', res.data.user);
        await storage.save({
          key: 'token',
          data: {
            user: res.data.user,
            token: res.data.token,
          },
        });
        this.socket = io(socketURL); //连接socket服务器
        this.socket.emit('joinRoom', res.data.user.code);
        this.socket.on('message', function (data) {
          //监听自己房间的消息
          if (!data.chatGroupId) data.chatGroupId = '';
          writeMessage(data)
            .then(data => {
              notice({
                title: data.senderName,
                body: data.content,
              });
              changeIsGetMessageState(data);
            })
            .catch(err => {
              console.log(err);
            });
        });
        this.socket.on('chatGroupMessage', data => {
          writeChatGroupMessage(data).then(data => {
            notice({
              title: data.name,
              body: data.content,
            });
            changeIsGetNewChatGroupMessage(data);
          });
        });
        this.socket.on('forbidden', data => {
          doLoginOut();
        });
        return login();
        // console.log(res.data.user.code);
      } else {
        return Alert.alert('用户名或者密码错误');
      }
    } catch (e) {
      setPassword('');
      console.log(e);
      return Alert.alert('用户名或者密码错误');
    }
  };
  const getSvgPic = () => {
    getSvg().then(function (data) {
      if (data) {
        setSvg(data);
        setIsGetSvg(true);
      }
    });
  };

  useEffect(() => {
    getSvgPic();
    storage
      .load({
        key: 'token',
      })
      .then(data => {
        if (data.token) {
          doSetMyAvatar(data.user.avatar); //拿到头像路由
          this.socket.emit('joinRoom', data.user.code);
          this.socket.on('message', function (data) {
            //监听自己房间的消息
            if (!data.chatGroupId) data.chatGroupId = '';
            writeMessage(data)
              .then(data => {
                notice({
                  title: data.senderName,
                  body: data.content,
                });
                changeIsGetMessageState(data);
              })
              .catch(err => {
                console.log(2, err);
              });
          });
          this.socket.on('chatGroupMessage', function (data) {
            writeChatGroupMessage(data).then(data => {
              notice({
                title: data.name,
                body: data.content,
              });
              changeIsGetNewChatGroupMessage(data);
            });
          });
          this.socket.on('forbidden', data => {
            doLoginOut(data);
          });
          login();
        }
      })
      .catch(err => {
        console.log('未找到Token，不能自动登录', err);
      });
  }, []);

  return (
    <View style={styles.container}>
      <Text h4>INY</Text>
      <Input
        placeholder="输入用户名"
        label="用户名"
        value={email}
        onChangeText={text => setEmail(text)}
      />
      <Input
        placeholder="输入密码"
        label="密码"
        value={password}
        onChangeText={text => setPassword(text)}
        secureTextEntry
      />
      {isGetSvg ? (
        <View style={styles.flex}>
          <View style={{width: '50%'}}>
            <Input
              placeholder="输入验证码"
              label="验证码"
              value={yzm}
              onChangeText={text => setYzm(text)}
            />
          </View>
          <TouchableOpacity style={styles.right} onPress={() => getSvgPic()}>
            <SvgXml xml={svg} />
          </TouchableOpacity>
        </View>
      ) : null}
      <Button
        buttonStyle={{height: 50, width: 200}}
        onPress={_doLogin}
        title="登录"
      />
      <Button
        buttonStyle={{height: 50, width: 200, marginTop: 10}}
        onPress={() => navigation.navigate('RegisterScreen')}
        title="注册"
      />
    </View>
  );
};
const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: 10,
    marginTop: 100,
  },
  h1: {
    padding: 10,
  },
  flex: {display: 'flex', flexDirection: 'row'},
  right: {flexGrow: 1, flexShrink: 0, flexBasis: '100'},
});

export default Login;
