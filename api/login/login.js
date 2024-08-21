import {Net} from '../../libs/request';

export const doLogin = async data => {
  const userData = {
    code: data.code,
    pwd: data.pwd,
  };
  let res = await Net('post', '/api/login', userData);
  if (res.success) {
    return {data: res.data, success: true, message: '登录成功'};
  } else {
    throw {message: res.message, success: false};
  }
};

export const getSvg = async () => {
  let res = await Net('get', '/api/captcha');
  return res;
};
