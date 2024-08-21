import {Net} from '../../libs/request';
import axios from 'axios';
import storage from '../../libs/storage';

export const FindMyChatGroup = async () => {
  let res = await Net('post', '/api/findMyChatGroups');
  if (res.success) {
    return {
      success: true,
      message: '获取成功',
      data: res.data,
    };
  } else {
    return {
      success: false,
      message: '获取群聊失败',
    };
  }
};

export const CreateChatGroup = async (name, friend) => {
  let res = await Net('post', '/api/createChatGroup', {
    name: name,
    member: friend,
  });
  if (res.success) {
    return {
      success: true,
      message: '创建成功',
    };
  } else {
    return {
      success: false,
      message: '创建失败，请重试',
    };
  }
};

export const ChangeChatGroupName = async (chatGroupId, newName) => {
  if (!chatGroupId || !newName) return {success: false, message: '参数不整'};
  let res = await Net('post', '/api/changeChatGroupName', {
    chatGroupId: chatGroupId,
    newName: newName,
  });
  if (res.success) {
    return {
      success: true,
      message: '修改成功',
    };
  } else {
    return {
      success: false,
      message: '修改失败',
    };
  }
};

export const FindAvatar = async id => {
  let res = await Net('post', '/api/findChatGroupAvatar', {chatGroupId: id});
  console.log(res, 123);
  if (res.success) {
    return res.data;
  } else {
    return {avatar: 'public/images/s1.jpg', name: '群聊'}; //默认头像
  }
};

export const uploadAvatar = async (file, chatGroupId) => {
  const formData = new FormData();
  formData.append('file', {
    uri: file.uri,
    type: file.type,
    name: file.fileName,
  });
  formData.append('chatGroupId', chatGroupId);
  let userData = await storage.load({key: 'token'});
  let res = await axios.post(
    'http://192.168.145.16:3000/api/uploadChatGroupAvatar',
    formData,
    {
      headers: {
        'Content-Type': 'multipart/form-data',
        token: userData.token,
      },
    },
  );
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
};
