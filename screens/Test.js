import React, {useState} from 'react';
import {Button, Image, View} from 'react-native';
import ImagePicker from 'react-native-image-picker';
import {launchImageLibrary} from 'react-native-image-picker';
import {uploadImage} from '../api/uploadPic';

const YourComponent = () => {
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
          console.log(data);
        })
        .catch(err => console.log(2, err));
    });
  };

  return (
    <View>
      <Button title="Select Image" onPress={selectImage} />
      {image && (
        <Image source={{uri: image}} style={{width: 200, height: 200}} />
      )}
    </View>
  );
};

export default YourComponent;
