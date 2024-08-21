import {Net} from '../../libs/request';

export const GetMyFriend = async data => {
  let res = await Net('get', '/api/findMyFriend');
  if (res.success) {
    return res.data.map(item => {
      item.id.remark = item.remark;
      return item.id;
    });
  } else {
    return '未找到联系人';
  }
};
