import {
  View,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ListItem, Text, Switch} from 'react-native-elements';
import React, {useEffect, useState, useContext} from 'react';
import PersonItem from '../../components/personButton';
import AddressListButton from '../../components/addressListButton';
import {useNavigation} from '@react-navigation/native';
import ChangeFriendRemarkModal from '../../components/changeFriendRemarkModal';
import {ChangeFriendRemark} from '../../api/changeFriendRemark';
import AuthContext from '../../context/AuthContext';
import DeleteModal from '../../components/deleteModal';
import {DeleteFriend} from '../../api/delete';

const Detail = props => {
  const {refreshAddress, doRefreshAdd, myId, hmdSwitch, doSetHMDSwitch} =
    useContext(AuthContext);
  useEffect(() => {
    setNewRemark(params.theMan.remark);
  }, []);
  const [newRemark, setNewRemark] = useState('');
  const [modalVisible, setModalVisible] = useState(false);
  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const closeModal = () => {
    setModalVisible(false);
  };
  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };
  const doChangeRemark = () => {
    ChangeFriendRemark(params.theMan._id, newRemark).then(data => {
      if (data.success) {
        Alert.alert('修改成功');
        params.theMan.remark = newRemark;
        doRefreshAdd();
        closeModal();
      } else {
        Alert.alert('修改失败，请重试');
      }
    });
  };
  const deDelete = () => {
    DeleteFriend(params.theMan._id).then(data => {
      if (data) {
        Alert.alert('删除成功');
        doRefreshAdd();
        setDeleteModalVisible(false);
        navigation.goBack();
      } else {
        Alert.alert('删除失败');
        setDeleteModalVisible(false);
      }
    });
  };
  const navigation = useNavigation();
  const {params} = props.route;
  const buttonConfig = [
    {
      title: '按钮',
      data: [
        {
          label: '设置备注',
          icon: '',
          message: 0,
          onPress: () => setModalVisible(true),
        },
      ],
    },
  ];
  const doSetSwitch = () => {
    doSetHMDSwitch();
  };
  return (
    <View>
      <PersonItem
        userData={params.theMan}
        remark={params.theMan.remark}
        avatar={params.theMan.avatar}></PersonItem>
      <View style={{marginVertical: 10}}>
        <SectionList
          sections={buttonConfig}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <AddressListButton data={item} onPress={item.onPress} />
          )}
        />
        <ListItem
          containerStyle={{
            marginVertical: 5,
            display: 'flex',
            flexDirection: 'row',
            flexWrap: 'wrap',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <Text
            style={{
              fontSize: 20,
            }}>
            加入黑名单
          </Text>
          <View
            style={{flexBasis: 'auto', flexShrink: 1, flexGrow: 0, width: 50}}>
            <Switch value={hmdSwitch} onValueChange={() => doSetSwitch()} />
          </View>
        </ListItem>
      </View>

      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChatScreen', {
            data: params.theMan._id,
            theMan: {
              receiver: params.theMan._id,
              receiverCode: params.theMan.code,
              receiverName: params.theMan.name,
            },
          });
        }}>
        <ListItem
          containerStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 17, color: '#4682B4'}}>发送消息</Text>
        </ListItem>
      </TouchableOpacity>
      <TouchableOpacity onPress={() => setDeleteModalVisible(true)}>
        <ListItem
          containerStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            marginVertical: 10,
          }}>
          <Text style={{fontSize: 17, color: 'red'}}>删除联系人</Text>
        </ListItem>
      </TouchableOpacity>
      <ChangeFriendRemarkModal
        modalVisible={modalVisible}
        value={newRemark}
        changeValue={setNewRemark}
        doSubmit={() => doChangeRemark()}
        closeModal={closeModal}></ChangeFriendRemarkModal>
      <DeleteModal
        modalVisible={deleteModalVisible}
        changeValue={setDeleteModalVisible}
        doSubmit={() => deDelete()}
        closeModal={closeDeleteModal}></DeleteModal>
    </View>
  );
};
const styles = StyleSheet.create({});

export default Detail;
