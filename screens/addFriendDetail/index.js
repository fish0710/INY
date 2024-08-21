import {
  View,
  StyleSheet,
  SectionList,
  TouchableOpacity,
  Alert,
} from 'react-native';
import {ListItem, Text} from 'react-native-elements';
import React, {useState} from 'react';
import PersonItem from '../../components/personButton';
import AddressListButton from '../../components/addressListButton';
import {SendAddReq} from '../../api/sendAddReq';
import SendAddReqModal from '../../components/sendAddReqModal';

const AddFriendDetail = props => {
  const {params} = props.route;
  console.log(params);
  const [userData, settUserData] = useState(params.data);
  const doSendReq = () => {
    // console.log(userData._id);
    SendAddReq(userData._id, remarkInfo).then(function (data) {
      Alert.alert(data);
    });
  };
  const closeModal = () => {
    setModalVisible(false);
  };
  const [modalVisible, setModalVisible] = useState(false);
  const [remarkInfo, setRemarkInfo] = useState('');
  return (
    <View>
      <PersonItem
        userData={userData}
        avatar={params.data.avatar}
        chevron={false}></PersonItem>
      <TouchableOpacity
        onPress={() => {
          setModalVisible(true);
        }}>
        <ListItem
          containerStyle={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}>
          <Text style={{fontSize: 17, color: '#4682B4'}}>发送添加请求</Text>
        </ListItem>
      </TouchableOpacity>
      <SendAddReqModal
        value={remarkInfo}
        changeValue={setRemarkInfo}
        modalVisible={modalVisible}
        doSubmit={doSendReq}
        closeModal={closeModal}></SendAddReqModal>
    </View>
  );
};
const styles = StyleSheet.create({});

export default AddFriendDetail;
