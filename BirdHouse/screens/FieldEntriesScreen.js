import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Platform, FlatList } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MenuButton from '../components/MenuButton';
import Colors from '../constants/Colors';
import uuid from 'uuid';
import * as entriesActions from '../store/actions/entries';
import EntryCard from '../components/EntryCard';



const FieldEntriesScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        const loadMyFieldEntries = async () => {
            dispatch(entriesActions.getMyEntries());
        }
        loadMyFieldEntries();
    }, [dispatch, fieldEntriesList]);

    const fieldEntriesList = useSelector(state => {
        // console.log(state)
        return state.entries.entries
    })

    const renderFieldEntryItem = (fieldentry) => {
        return (
            
            <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'FieldEntry', params: {
                            entryId: fieldentry.item.id,
                            entryName: `Field Entry: ${fieldentry.item.date}`,
                            entry: fieldentry.item
                        }
                    })
                }}
                >
                <EntryCard notes={fieldentry.item.notes} fieldentry={fieldentry.item}/>
            </TouchableOpacity> 
        )
    }

    return (
            <View style={styles.screen}>

                <Text>The Field Entries Screen!</Text>
                <FlatList keyExtractor={(item, index) => uuid()} data={fieldEntriesList} renderItem={renderFieldEntryItem} numColumns={1} />
                {/* <Button title="Go to Details" onPress={() => {props.navigation.navigate({routeName: 'FieldEntry'})}}/> */}
            </View>
    )
}

FieldEntriesScreen.navigationOptions = navData => {
    return {
        headerTitle: "My Field Entries",
        headerStyle: {
            backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
            color: "black"
        },
        headerLeft: <HeaderButtons HeaderButtonComponent={MenuButton}>
            <Item title="Menu" iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
                onPress={() => { navData.navigation.toggleDrawer() }} />
        </HeaderButtons>
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    }
})

export default FieldEntriesScreen;