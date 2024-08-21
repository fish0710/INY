import {Net} from '../../libs/request';

export const SendAddReq = async (userId, remark) => {
  let res = await Net('post', '/api/sendAddReq', {
    userId: userId,
    remark: remark,
  });
  if (res.success) {
    return '请求成功';
  } else {
    return '请求失败';
  }
};

export const GetAddReqList = async () => {
  let res = await Net('get', '/api/FindAddReqList');
  if (res.success) {
    return res.data;
  } else {
    return '未找到数据';
  }
};

export const AgreeAddReq = async reqId => {
  let res = await Net('post', '/api/agreeAddReq', {reqId: reqId});
  if (res.success) {
    return '确认同意成功';
  } else {
    return '确认同意失败';
  }
};

export const RejectAddReq = async reqId => {
  let res = await Net('post', '/api/rejectAddReq', {reqId: reqId});
  if (res.success) {
    return '拒绝成功';
  } else {
    return '拒绝失败';
  }
};
