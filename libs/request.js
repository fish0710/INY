import axios from 'axios';
import storage from './storage';

const instance = axios.create({
  baseURL: 'http://192.168.181.16:3000',
  timeout: 3000,
  headers: {'X-Custom-Header': 'foobar'},
});

//请求拦截处理
instance.interceptors.request.use(
  async function (config) {
    let userData;
    try {
      userData = await storage.load({key: 'token'});
      if (userData.token) {
        config.headers['token'] = userData.token;
      }
    } catch (e) {
      // console.log(e);
    }
    // 在发送请求之前做些什么
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  },
);

//返回拦截处理
instance.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  function (error) {
    // 对响应错误做点什么
    return Promise.reject(error);
  },
);

export const Net = async (methods, api, params) => {
  return new Promise((resolve, reject) => {
    instance({method: methods, url: api, data: params})
      .then(res => {
        resolve(res.data);
      })
      .catch(error => {
        reject(error);
      });
  });
};
