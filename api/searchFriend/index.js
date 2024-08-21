import {Net} from '../../libs/request';

export const SearchFriend = async code => {
  let res = await Net('post', '/api/findFriend', {code: code});
  if (res.success) {
    return res.data;
  } else {
    throw '不存在用户';
  }
};
