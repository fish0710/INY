import {Net} from '../../libs/request';

export const FindAvatar = async id => {
  if (!id) return '';
  let res = await Net('post', '/api/findOneAvatar', {theId: id});
  if (res.success) {
    return res.data.avatar;
  } else {
    return '';
  }
};
