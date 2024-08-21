import React from 'react';
import {Text} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const IconFont = props => (
  <Text
    onPress={props.onPress}
    style={{fontFamily: 'iconfont', ...props.style}}>
    {<FontAwesome name={props.name} size={props.size}></FontAwesome>}
  </Text>
);
export default IconFont;
