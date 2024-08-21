import React, {useState, useEffect} from 'react';
import {View, StyleSheet, Alert, TouchableOpacity} from 'react-native';
import {Input, Button, Text} from 'react-native-elements';
import AuthContext from '../context/AuthContext';
import {useContext} from 'react';
import {doRegister} from '../api/login/register';
import {getSvg} from '../api/login/login';
import {SvgXml} from 'react-native-svg';

const Register = props => {
  const {navigation} = props;
  const {state, login} = useContext(AuthContext);
  const [registerName, setRegisterName] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [yzm, setYzm] = useState('');
  const [isGetSvg, setIsGetSvg] = useState(false);
  const [svg, setSvg] = useState('');
  const _doRegister = async () => {
    if (registerName == '' || registerPassword == '') {
      Alert.alert('请输入用户名和密码');
      return;
    }
    try {
      let res = await doRegister({code: registerName, pwd: registerPassword});
      if (res.success) {
        Alert.alert('注册成功');
        navigation.goBack();
      } else {
        Alert.alert(res.message);
        setRegisterName('');
        setRegisterPassword('');
      }
    } catch (e) {
      setRegisterName('');
      setRegisterPassword('');
      Alert.alert(123, e.message);
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
  useEffect(function () {
    getSvgPic();
  }, []);
  return (
    <View style={styles.container}>
      <Input
        placeholder="输入用户名"
        label="用户名"
        value={registerName}
        onChangeText={text => setRegisterName(text)}
      />
      <Input
        placeholder="输入密码"
        label="密码"
        value={registerPassword}
        onChangeText={text => setRegisterPassword(text)}
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
        onPress={_doRegister}
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
  red: {
    backgroundColor: 'red',
  },
  flex: {display: 'flex', flexDirection: 'row'},
  right: {flexGrow: 1, flexShrink: 0, flexBasis: '100'},
});

export default Register;
