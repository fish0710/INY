import {Net} from '../../libs/request';
export const ChangeFriendRemark = async (friend, remark) => {
  if (!friend || !remark)
    return {
      success: false,
      message: '不存在参数',
    };
  let res = await Net('post', '/api/changeFriendRemark', {
    friend: friend,
    remark: remark,
  });

  if (res.success) {
    return {
      success: true,
      message: res.message,
    };
  } else {
    return {
      success: false,
      message: res.message,
    };
  }
};
