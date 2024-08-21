import {SearchFriend} from '../../api/searchFriend';
import {useState} from 'react';
import {Alert, SafeAreaView, View, TouchableOpacity} from 'react-native';
import LightSearchBar from '../../components/lightSearchBar';
import AddressListItem from '../../components/addressListItem';
import {useNavigation} from '@react-navigation/native';
const AddFriend = props => {
  const navigation = useNavigation();
  const [search, setSearch] = useState('');
  const updateSearch = data => {
    setSearch(data);
  };
  const [searchList, setSearchList] = useState([]);
  const fetchData = () => {
    SearchFriend(search)
      .then(function (data) {
        if (data) {
          let arr = [data];
          setSearchList([]);
          setSearchList(arr);
        } else {
          Alert.alert('没有找到用户');
        }
      })
      .catch(err => {
        console.log(err);
        setSearch('');
        Alert.alert(err);
      });
  };
  const clickItem = () => {
    navigation.navigate('AddFriendDetail', {data: searchList[0]});
  };
  return (
    <SafeAreaView>
      <LightSearchBar
        goBack={navigation.goBack}
        doSearch={fetchData}
        updateSearch={updateSearch}
        search={search}></LightSearchBar>
      <View>
        {searchList.map((l, i) => (
          <AddressListItem data={l} index={i} key={i} onPress={clickItem} />
        ))}
      </View>
    </SafeAreaView>
  );
};

export default AddFriend;
