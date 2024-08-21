import {Net} from '../../libs/request';

export const ChangeMyName = async newName => {
  if (!newName)
    return {
      success: false,
      message: '名称为空',
    };

  let res = await Net('post', '/api/changeMyName', {newName: newName});
  if (res.success) {
    return {
      success: true,
      message: '修改成功',
      newName: newName,
    };
  } else {
    return {
      success: false,
      message: '修改失败',
    };
  }
};
