import {View, StyleSheet, TouchableOpacity, Alert} from 'react-native';
import {Text, ListItem, Icon} from 'react-native-elements';
import React, {useState, useContext} from 'react';
import ChangeMyNameModal from '../../components/changeMyNameModal';
import AuthContext from '../../context/AuthContext';
import {ChangeMyName} from '../../api/changeMyName';
import storage from '../../libs/storage';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImage} from '../../api/uploadPic';
import {defaultUrl} from '../../config';

const MySet = props => {
  const {myName, doSetMyName, doSetMyAvatar} = useContext(AuthContext);
  const [modalVisible, setModalVisible] = useState(false);
  const [newName, setNewName] = useState(myName);
  const closeModal = () => {
    setModalVisible(false);
  };
  const doChangeName = () => {
    ChangeMyName(newName).then(function (data) {
      if (data.success) {
        let theNewName = data.newName;
        doSetMyName(data.newName);
        Alert.alert(data.message);
        try {
          storage.load({key: 'token'}).then(data => {
            let newUserData = data;
            newUserData.user.name = theNewName;
            storage.save({key: 'token', data: newUserData}).then(data => {
              console.log('新名称存入token成功');
            });
          });
        } catch (e) {}
      } else {
        Alert.alert(data.message);
      }
    });

    closeModal();
  };

  const [image, setImage] = useState(null);
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
      setImage(r.assets[0].uri);
      uploadImage(r.assets[0])
        .then(function (data) {
          if (data.success) {
            let newUrl =
              data.data.file.destination + '/' + data.data.file.filename;
            doSetMyAvatar(newUrl);
            Alert.alert(data.message);
            try {
              storage.load({key: 'token'}).then(data => {
                let newUserData = data;
                newUserData.user.avatar = newUrl;
                storage.save({key: 'token', data: newUserData}).then(data => {
                  console.log('新头像存入token成功');
                });
              });
            } catch (e) {
              Alert.alert(e);
            }
          } else {
            Alert.alert('修改失败，请重新上传');
          }
        })
        .catch(err => console.log(2, err));
    });
  };

  const list = [
    {
      title: '修改头像',
      icon: 'av-timer',
      onPress: () => selectImage(),
    },
    {
      title: '修改名称',
      icon: 'flight-takeoff',
      onPress: () => setModalVisible(true),
    },
    {
      title: '修改密码',
      icon: 'rowing',
      onPress: () => console.log(),
    },
  ];

  return (
    <View>
      <View>
        {list.map((item, i) => (
          <TouchableOpacity key={i} onPress={item.onPress}>
            <ListItem key={i} bottomDivider>
              <Icon name={item.icon} />
              <ListItem.Content>
                <ListItem.Title>{item.title}</ListItem.Title>
              </ListItem.Content>
              <ListItem.Chevron />
            </ListItem>
          </TouchableOpacity>
        ))}
      </View>
      <ChangeMyNameModal
        modalVisible={modalVisible}
        value={newName}
        changeValue={setNewName}
        doSubmit={() => doChangeName()}
        closeModal={closeModal}></ChangeMyNameModal>
    </View>
  );
};
const styles = StyleSheet.create({});

export default MySet;
