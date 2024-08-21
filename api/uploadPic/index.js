import {Net} from '../../libs/request';
import storage from '../../libs/storage';
import axios from 'axios';

export async function uploadImage(params) {
  const formData = new FormData();
  formData.append('file', {
    uri: params.uri,
    type: params.type,
    name: params.fileName,
  });
  let userData = await storage.load({key: 'token'});
  // return await Net('post', `/api/upload`, {
  //   body: formData,
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //   },
  // })
  //   .then(response => {
  //     return response.json();
  //   })
  //   .catch(err => console.log(1, err));
  // fetch('http://192.168.145.16:3000/api/upload', {
  //   method: 'POST',
  //   body: formData,
  //   headers: {
  //     'Content-Type': 'multipart/form-data',
  //     token: userData.token,
  //   },
  // })
  //   .then(response => response.json())
  //   .then(data => {
  //     console.log('上传成功：', data);
  //   })
  //   .catch(error => {
  //     console.error('上传失败：', error);
  //   });
  let res = await axios.post(
    'http://192.168.145.16:3000/api/upload',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        token: userData.token,
      },
    },
  );
  // .then(response => {
  //   console.log('上传成功：', response.data);
  //   return {
  //     success: true,
  //     message: '上传成功',
  //     data: response.data,
  //   };
  // })
  // .catch(error => {
  //   console.error('上传失败：', error);
  //   return {
  //     success: false,
  //     message: '上传失败',
  //   };
  // });
  console.log('res', res.data);
  if (res.data.success) {
    return {
      success: true,
      data: res.data,
      message: '修改成功',
    };
  } else {
    return {
      success: false,
      message: '修改失败',
    };
  }
}
