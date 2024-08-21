import React, {useState} from 'react';
import {Modal, StyleSheet, View} from 'react-native';

import {Button, Text, Input} from 'react-native-elements';

const SendAddReqModal = props => {
  return (
    <Modal
      animationType="fade"
      transparent={true}
      visible={props.modalVisible}
      onRequestClose={props.closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Input
            placeholder="请求信息"
            value={props.value}
            onChangeText={data => {
              console.log(data);
              props.changeValue(data);
            }}
          />

          <Button
            onPress={props.doSubmit}
            type="clear"
            title="提交请求信息"></Button>
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
    width: 250,
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

export default SendAddReqModal;
