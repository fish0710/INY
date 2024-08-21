import {Net} from '../../libs/request';

export const test = async data => {
  return Net('get', '/api/test');
};
