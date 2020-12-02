import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  TextInput, StyleSheet, Text, View, Button,
} from 'react-native';
import * as birdActions from '../store/actions/birds';
import Colors from '../constants/Colors';

// TODO: refactor stylesheet and move to another file
// TODO: use custom input instead of textinput
// TODO: add clear search to state so can pass down as a prop
// TODO: show the search results with this component? or create a custom component for them?
// TODO: remove ternary statement from jsx

const styles = StyleSheet.create({
  input: {
    height: 30,
    backgroundColor: Colors.myColor,
    borderBottomColor: 'black',
    borderBottomWidth: 1,
    width: '90%',
    alignSelf: 'center',
    marginBottom: 5,
  },
  label: {
    alignSelf: 'center',
    fontSize: 16,
    fontFamily: 'Roboto-Condensed',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginHorizontal: '4%',
    marginVertical: '2%',
  },
});

const SearchBar = (props) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [error, setError] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  const sendUpSearch = async () => {
    try {
      setIsLoading(true);
      await dispatch(birdActions.searchBirds(searchTerm));
      setIsLoading(false);
      props.onShowBirds('search');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleSearchInput = (text) => {
    const searchInput = text;
    setSearchTerm(searchInput);
    if (searchTerm.length >= 1) {
      sendUpSearch();
    }
  };

  const handleClearSearch = () => {
    setSearchTerm('');
    props.onShowBirds(false);
  };

  return (
    <View>
      <View style={styles.row}>
        <Text style={styles.label}>Search Birds</Text>
        {searchTerm.length > 0 && <Button title="Clear Search" onPress={handleClearSearch} />}
      </View>
      <TextInput
        autoCompleteType="off"
        autoCapitalize="none"
        accessibilityRole="search"
        label="search"
        value={searchTerm}
        keyboardType="default"
        onChangeText={handleSearchInput}
        initialValue=""
        placeholder="Enter bird name or keyword"
        {...props}
        style={{ ...styles.input, ...props.style }}
      />
    </View>
  );
};

export default SearchBar;
