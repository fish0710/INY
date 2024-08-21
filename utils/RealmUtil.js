import Realm from 'realm';
import storage from '../libs/storage';
import {resolve} from '@babel/core/lib/vendor/import-meta-resolve';
import {FindMyChatGroup} from '../api/chatGroup';

/**表定义区**/
export const HistoryTableName = 'History';
export const CityTableName = 'City';
export const SaveMessageTableName = 'Message';
export const SaveChatGroupMessageTableName = 'ChatGroupMessages';

const SaveMessageSchema = {
  name: SaveMessageTableName,
  primaryKey: 'id',
  properties: {
    id: 'int',
    content: 'string',
    sender: 'string',
    senderCode: 'string',
    senderName: 'string',
    isChatGroup: 'bool',
    date: 'date',
    receiver: 'string',
    receiverCode: 'string',
    receiverName: 'string',
    chatGroupId: {type: 'string', default: ''},
  },
};
const SaveChatGroupMessageSchema = {
  name: SaveChatGroupMessageTableName,
  primaryKey: 'id',
  properties: {
    id: 'int',
    content: 'string',
    sender: 'string',
    senderCode: 'string',
    senderName: 'string',
    date: 'date',
    chatGroupId: 'string',
    avatar: 'string',
    name: 'string',
    senderAvatar: 'string',
  },
};

const HistorySchema = {
  name: HistoryTableName,
  primaryKey: 'id',
  properties: {
    id: 'int',
    name: 'string',
  },
};

const CitySchema = {
  name: CityTableName,
  primaryKey: 'city_id',
  properties: {
    city_id: {type: 'int', indexed: true},
    city_name: 'string',
  },
};

const instance = new Realm({
  schema: [
    HistorySchema,
    CitySchema,
    SaveMessageSchema,
    SaveChatGroupMessageSchema,
  ],
  deleteRealmIfMigrationNeeded: true,
  inMemory: false,
});

/**表使用区**/
export function writeChatGroupMessage(obj) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      let list = instance.objects('ChatGroupMessages');
      let number = list.length + 1;
      obj.id = number;
      let res = instance.create('ChatGroupMessages', obj, true);
      resolve(res);
    });
  });
}

export function writeMessage(obj) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      let list = instance.objects('Message');
      let number = list.length + 1;
      obj.id = number;
      let res = instance.create('Message', obj, true);
      resolve(res);
    });
  });
}
export function getMessageItem() {
  //在获取消息栏数据
  return new Promise((resolve, reject) => {
    instance.write(() => {
      storage
        .load({
          key: 'token',
        })
        .then(data => {
          //查到数据就做对比，是自己的消息
          let result = [];
          let itemList = [];
          let userList = new Set();
          let userId = data.user._id;
          let messageList = instance
            .objects('Message')
            .filtered(
              "sender == '" + userId + "' OR receiver == '" + userId + "'",
            );
          //先把显示人找出来
          messageList.map(item => {
            if (item.sender !== userId) {
              userList.add(item.sender);
            } else userList.add(item.receiver);
          });
          userList.forEach(value => {
            let theMessage = messageList.map(item => {
              if (item.sender === value || item.receiver === value) return item;
            });
            let newMessage = theMessage.sort((a, b) => {
              return b.date - a.date;
            })[0];
            newMessage.theShow = value;
            itemList.push(newMessage);
          });
          result = itemList.sort((a, b) => {
            return b.date - a.date;
          });
          resolve(result);
          // console.log(userList)
          // console.log(messageList);
        })
        .catch(err => {
          console.log('load token fail', err);
        });
    });
  });
}
export function getChatGroupMessageItem() {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      FindMyChatGroup().then(data => {
        if (data.success) {
          let arr = [];
          [...data.data].map(async item => {
            let list = await instance
              .objects('ChatGroupMessages')
              .filtered("chatGroupId == '" + item._id + "'")
              .sorted('date', true);

            // let list = instance
            //   .objects('ChatGroupMessages')
            //   .filtered('chatGroupId IN $0', item._id)
            //   .sorted('date', true);
            // if (list && list.length > 0) {
            //   return list[0];
            // }

            if (list && list.length > 0) {
              arr.push(list[0]);
            }
          });
          resolve(arr);
        } else {
          resolve([]);
        }
      });
    });
  });
}

export function getChatGroupMessageWithId(id) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      let list = instance
        .objects('ChatGroupMessages')
        .filtered("chatGroupId == '" + id + "'")
        .sorted('date', true);
      resolve(list);
    });
  });
}

export function getMessageWithOne(other) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      storage.load({key: 'token'}).then(token => {
        let list = instance
          .objects('Message')
          .filtered(
            "sender == '" +
              other +
              "' AND receiver == '" +
              token.user._id +
              "'" +
              ' OR ' +
              "sender == '" +
              token.user._id +
              "' AND receiver == '" +
              other +
              "'",
          )
          .sorted('date', true);
        resolve(list);
      });
    });
  });
}

export function writeToRealm(obj, tabName) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      instance.create(tabName, obj, true);
      resolve(true);
    });
  });
}

export function queryAllFromRealm(tabName) {
  return new Promise((resolve, reject) => {
    let obj = instance.objects(tabName);
    let objStr = JSON.stringify(obj);
    resolve(JSON.parse(objStr));
  });
}

export function clearAllFromRealm(tabName) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      let arrays = instance.objects(tabName);
      instance.delete(arrays);
      resolve(true);
    });
  });
}

export function clearRowFromRealm(id, tabName) {
  return new Promise((resolve, reject) => {
    instance.write(() => {
      let arrays = instance.objects(tabName);
      let row = arrays.filtered('city_id==' + id);
      instance.delete(row);
      resolve(true);
    });
  });
}
