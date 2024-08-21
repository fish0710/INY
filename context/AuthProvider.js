// ThemeProvider.js
import React, {useEffect, useState} from 'react';
import AuthContext from './AuthContext';
import storage from '../libs/storage';

function AuthProvider({children}) {
  const [state, setState] = useState(false);
  const [isGetMessage, setIsGetMessage] = useState(Date()); //用时间来判断是否更新
  const [myId, setMyId] = useState('');
  const [myCode, setMyCode] = useState('');
  const [myName, setMyName] = useState('');
  const [newMessageData, setNewMessageData] = useState({});
  const [refreshAddress, setRefreshAddress] = useState(false);
  const [myAvatar, setMyAvatar] = useState('');
  const [myFriend, setMyFriend] = useState([]);
  const [newChatGroupMessage, setNewChatGroupMessage] = useState('');
  const [newChatGroupMessageData, setNewChatGroupMessageData] = useState({});
  const [hmdSwitch, setHMDSwitch] = useState(false);
  useEffect(() => {
    storage
      .load({key: 'token'})
      .then(data => {
        setMyId(data.user._id);
        setMyCode(data.user.code);
        setMyName(data.user.name);
        setMyFriend(data.user.friend);
      })
      .catch(err => console.log(2, err));
  }, [state]);

  const login = () => {
    setState(true);
  };
  const loginOut = () => {
    setState(false);
    this.socket = null;
  };
  const changeIsGetMessageState = data => {
    setIsGetMessage(Date());
    if (data) setNewMessageData(data);
  };
  const changeIsGetNewChatGroupMessage = data => {
    setNewChatGroupMessage(Date());
    if (data) setNewChatGroupMessageData(data);
  };

  const doSetMyAvatar = url => {
    setMyAvatar(url);
  };
  const doSetMyName = data => {
    setMyName(data);
  };

  const doRefreshAdd = () => {
    setRefreshAddress(!refreshAddress);
  };

  const doSetHMDSwitch = () => {
    setHMDSwitch(!hmdSwitch);
  };
  return (
    // 将当前主题存储在上下文中
    <AuthContext.Provider
      value={{
        state,
        login,
        loginOut,
        isGetMessage,
        changeIsGetMessageState,
        myId,
        newMessageData,
        myName,
        myCode,
        myAvatar,
        doSetMyAvatar,
        doSetMyName,
        doRefreshAdd,
        refreshAddress,
        myFriend,
        newChatGroupMessage,
        changeIsGetNewChatGroupMessage,
        newChatGroupMessageData,
        hmdSwitch,
        doSetHMDSwitch,
      }}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
