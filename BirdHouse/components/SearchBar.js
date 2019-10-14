import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import { TextInput, StyleSheet, Text, View } from 'react-native';
import * as birdActions from '../store/actions/birds'

const SearchBar = props => {
    const [searchTerm, setSearchTerm] = useState("")
    const [error, setError] = useState()
    dispatch = useDispatch();

    const handleSearchInput = (text) => {
        searchInput = text
        setSearchTerm(searchInput)
        if (searchTerm.length >= 2) {
            sendUpSearch()
        }
    }

    const sendUpSearch = async () => {
        try {
            await dispatch(birdActions.searchBirds(searchTerm))
            props.onShowBirds("search")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <View>
            <Text>Search Birds</Text>
            <TextInput autoCapitalize="none" accessibilityRole="search" label="search" value={searchTerm} keyboardType="default" onChangeText={handleSearchInput}
                initialValue=""
            {...props} style={{ ...styles.input, ...props.style }} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default SearchBar;
