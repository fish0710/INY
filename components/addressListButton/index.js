import {View, StyleSheet, TouchableOpacity} from 'react-native';
import {Text, Badge} from 'react-native-elements';
import IconAnt from '../IconAnt';
import {useState} from 'react';
const AddressListButton = props => {
  const [label, setLabel] = useState(props.data.label);
  const [icon, setIcon] = useState(props.data.icon);
  const [messageNum, setMessageNum] = useState(props.data.message);
  return (
    <TouchableOpacity onPress={props.onPress}>
      <View style={styles.row}>
        {icon ? (
          <View style={styles.avatar}>
            <Text>
              <IconAnt name={icon} size={25}></IconAnt>
            </Text>
          </View>
        ) : (
          ''
        )}
        <View style={styles.nameAndMessage}>
          <Text style={{fontSize: 20}}>{label}</Text>
        </View>
        <View style={styles.date}>
          {messageNum > 0 ? <Badge value={messageNum} status="error" /> : ''}
        </View>
      </View>
    </TouchableOpacity>
  );
};
const styles = StyleSheet.create({
  row: {
    flex: 1,
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    backgroundColor: '#ffffff',
    padding: 15,
    marginVertical: 0.5,
  },
  avatar: {
    flexBasis: 'auto',
    flexShrink: 1,
    flexGrow: 0,
    width: 50,
  },
  nameAndMessage: {
    paddingLeft: 5,
    flexBasis: 'auto',
    flexShrink: 1,
    flexGrow: 1,
    width: 100,
  },
  date: {
    flexBasis: 'auto',
    flexShrink: 1,
    flexGrow: 0,
    width: 50,
  },
});

export default AddressListButton;
