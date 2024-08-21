import {Net} from '../../libs/request';

export const doRegister = async data => {
  const userData = {
    code: data.code,
    pwd: data.pwd,
  };
  let res = await Net('post', '/api/register', userData);
  if (res.success) {
    return {message: res.message, success: true};
  } else {
    throw {message: res.message, success: false};
  }
};
