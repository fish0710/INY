import {Net} from '../../libs/request';

export const DeleteFriend = async friend => {
  if (!friend) return '';
  let res = await Net('post', '/api/deleteFriend', {friend: friend});
  if (res.success) {
    return '删除成功';
  } else {
    return '';
  }
};

export const DeleteChatGroup = async (chatGroupId, member) => {
  if (!chatGroupId || !member) return '';
  let res = await Net('post', '/api/deleteChatGroup', {
    chatGroupId: chatGroupId,
    member: member,
  });
  if (res.success) {
    return '删除成功';
  } else {
    return '';
  }
};
