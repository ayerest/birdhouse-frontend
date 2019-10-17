import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Platform, FlatList, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MenuButton from '../components/MenuButton';
import Colors from '../constants/Colors';
import uuid from 'uuid';
import * as entriesActions from '../store/actions/entries';
import EntryCard from '../components/EntryCard';



const FieldEntriesScreen = props => {
    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();

    useEffect(() => {
        const loadMyFieldEntries = async () => {
            setIsLoading(true);
            await dispatch(entriesActions.getMyEntries());
            setIsLoading(false);
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

                {!isLoading && fieldEntriesList.length == 0 ? <Text>You haven't earned any badges yet!</Text> : null}
                {isLoading ? <ActivityIndicator size="large" /> : <FlatList keyExtractor={(item, index) => uuid()} data={fieldEntriesList} renderItem={renderFieldEntryItem} numColumns={1} />}

            
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
        </HeaderButtons>,
        headerRight: (<Image style={{ width: 25, height: 25 }} source={require("../assets/images/birdicon.png")} />)
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