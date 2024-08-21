import {SearchBar, Button} from 'react-native-elements';
import {useState} from 'react';
import {View, StyleSheet} from 'react-native';

const LightSearchBar = props => {
  const [search, setSearch] = useState('');
  const updateSearch = data => {
    setSearch(data);
  };
  return (
    <View style={styles.searchP}>
      <View style={styles.searchBar}>
        <SearchBar
          lightTheme
          onSubmitEditing={props.doSearch}
          round
          placeholder=""
          onChangeText={props.updateSearch}
          value={props.search}></SearchBar>
      </View>
      <View style={styles.centerButton}>
        <Button title="取消" type="clear" onPress={props.goBack} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  searchP: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  searchBar: {
    flex: 1,
  },
  centerButton: {
    backgroundColor: 'rgb(225,231,237)',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default LightSearchBar;
