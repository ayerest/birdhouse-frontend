import React, {useState} from 'react';
import { useDispatch } from 'react-redux'
import { TextInput, StyleSheet, Text, View, Button } from 'react-native';
import * as birdActions from '../store/actions/birds'

const SearchBar = props => {
    const [searchTerm, setSearchTerm] = useState("")
    const [error, setError] = useState()
    const [isLoading, setIsLoading] = useState(false)
    dispatch = useDispatch();

    const handleSearchInput = (text) => {
        let searchInput = text
        setSearchTerm(searchInput)
        if (searchTerm.length >= 1) {
            sendUpSearch()
        }
    }

    const handleClearSearch = () => {
        setSearchTerm("")
        props.onShowBirds(false)
    }

    const sendUpSearch = async () => {
        try {
            setIsLoading(true);
            await dispatch(birdActions.searchBirds(searchTerm))
            setIsLoading(false);
            props.onShowBirds("search")
        } catch (err) {
            setError(err.message)
        }
    }

    return (
        <View>
            <View style={styles.row}>
                <Text style={styles.label}>Search Birds</Text>
                {searchTerm.length > 0 ? <Button title="Clear Search" onPress={handleClearSearch}/> : null}
            </View>
            <TextInput autoCapitalize="none" accessibilityRole="search" label="search" value={searchTerm} keyboardType="default" onChangeText={handleSearchInput}
                initialValue=""
            {...props} style={{ ...styles.input, ...props.style }} />
        </View>
    );
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        backgroundColor: 'ghostwhite',
        borderBottomColor: 'black',
        borderBottomWidth: 1,
        width: '90%',
        alignSelf: "center",
        marginBottom: 5
    },
    label: {
        alignSelf: 'center',
        fontSize: 16
    },
    row: {
        flexDirection: "row",
        justifyContent: "space-around"
    }
});

export default SearchBar;
