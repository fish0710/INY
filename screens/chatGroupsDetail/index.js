import {
  View,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import React, {useEffect, useState, useContext} from 'react';
import ChatGroupAvatar from '../../components/chatGroupAvatar';
import AddressListButton from '../../components/addressListButton';
import {useNavigation} from '@react-navigation/native';
import ChangeChatGroupNameModal from '../../components/changeChatGroupNameModal';
import {ChangeChatGroupName, uploadAvatar} from '../../api/chatGroup';
import {launchImageLibrary} from 'react-native-image-picker';
import DeleteModal from '../../components/deleteModal';
import {DeleteChatGroup} from '../../api/delete';
import AuthContext from '../../context/AuthContext';

const ChatGroupsDetail = props => {
  const navigation = useNavigation();
  const {myId} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const {params} = props.route;
  const [newName, setNewName] = useState(params.chatGroupData.name);
  const closeModal = () => {
    setModalVisible(false);
  };
  const doChangeName = () => {
    ChangeChatGroupName(params.chatGroupData._id, newName).then(function (
      data,
    ) {
      Alert.alert(data.message);
      if (data.success) closeModal();
    });
  };
  const selectImage = () => {
    launchImageLibrary(
      {
        mediaType: 'photo',
        maxWidth: 1000, // 设置选择照片的大小，设置小的话会相应的进行压缩
        maxHeight: 1000,
        quality: 0.8,
        // videoQuality: 'low',
        // includeBase64: true
      },
      res => {
        if (res.didCancel) {
          console.log('取消');
          return false;
        }
        console.log('没取消');
        // 对获取的图片进行处理
      },
    ).then(r => {
      uploadAvatar(r.assets[0], params.chatGroupData._id)
        .then(data => {
          if (data.success) {
            Alert.alert(data.message);
          } else {
            Alert.alert('修改失败，请重新上传');
          }
        })
        .catch(err => {
          console.log('上传群头像失败', err);
        });
    });
  };
  const buttonConfig = [
    {
      title: '按钮',
      data: [
        {
          label: '修改群名称',
          message: 0,
          path: 'ChatGroupList',
          onPress: () => setModalVisible(true),
        },
        {
          label: '修改群头像',
          message: 0,
          path: 'ChatGroupList',
          onPress: () => selectImage(),
        },
      ],
    },
  ];

  const [deleteModalVisible, setDeleteModalVisible] = useState(false);
  const deDelete = () => {
    console.log(params.chatGroupData._id);
    DeleteChatGroup(params.chatGroupData._id, myId).then(data => {
      if (data) {
        Alert.alert('删除成功');
        setDeleteModalVisible(false);
        navigation.navigate('TabsPage');
      } else {
        Alert.alert('删除失败');
        setDeleteModalVisible(false);
      }
    });
  };
  const closeDeleteModal = () => {
    setDeleteModalVisible(false);
  };
  return (
    <View>
      <ChatGroupAvatar
        memberList={params.chatGroupData.member}></ChatGroupAvatar>
      <View style={{marginVertical: 10}}>
        <SectionList
          sections={buttonConfig}
          keyExtractor={(item, index) => item + index}
          renderItem={({item}) => (
            <AddressListButton data={item} onPress={() => item.onPress()} />
          )}
        />
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.navigate('ChatGroupChat', {
            chatGroupId: params.chatGroupData._id,
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
          }}>
          <Text style={{fontSize: 17, color: 'red'}}>退出群聊</Text>
        </ListItem>
      </TouchableOpacity>
      <ChangeChatGroupNameModal
        modalVisible={modalVisible}
        value={newName}
        changeValue={setNewName}
        doSubmit={() => doChangeName()}
        closeModal={closeModal}></ChangeChatGroupNameModal>
      <DeleteModal
        modalVisible={deleteModalVisible}
        changeValue={setDeleteModalVisible}
        doSubmit={() => deDelete()}
        closeModal={closeDeleteModal}></DeleteModal>
    </View>
  );
};
const styles = StyleSheet.create({});

export default ChatGroupsDetail;
