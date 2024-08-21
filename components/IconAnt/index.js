import React from 'react';
import {Text} from 'react-native';
import AntDesign from 'react-native-vector-icons/AntDesign';

const IconFont = props => (
  <Text
    onPress={props.onPress}
    style={{fontFamily: 'iconfont', ...props.style}}>
    {<AntDesign name={props.name} size={props.size}></AntDesign>}
  </Text>
);
export default IconFont;
