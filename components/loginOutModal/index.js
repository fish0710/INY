import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';

import {Button, Text} from 'react-native-elements';

const LoginOutModal = props => {
  const [modalVisible, setModalVisible] = useState(true);
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={modalVisible}
      onRequestClose={() => {
        setModalVisible(!modalVisible);
      }}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Button
            type="clear"
            title="确认退出"
            titleStyle={{
              color: 'red', // 文字颜色
            }}></Button>
          <Button type="clear" title="取消"></Button>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 25,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
});

export default LoginOutModal;
