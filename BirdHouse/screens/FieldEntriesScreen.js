import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import MenuButton from '../components/MenuButton'
import Colors from '../constants/Colors'


const FieldEntriesScreen = props => {

    const fieldEntriesList = useSelector(state => {
        console.log(state)
        return state.user.user
    })

    const renderGridItem = (fieldentry) => {
        return (
                <View style={styles.test}>
                    <Text>testing testing 123</Text>
                </View>
            /* <TouchableOpacity
                style={styles.gridItem}
                onPress={() => {
                    props.navigation.navigate({
                        routeName: 'FieldEntryDetails', params: {
                            entryId: fieldentry.item.id
                        }
                    })
                }}
                >
            </TouchableOpacity> */
        )
    }

    return (
            <View style={styles.screen}>
                {/* <FlatList keyExtractor={bird => bird.id} data={birdList} renderItem={renderGridItem} numColumns={2} /> */}

                <Text>The Field Entries Screen!</Text>
                <Button title="Go to Details" onPress={() => {props.navigation.navigate({routeName: 'FieldEntry'})}}/>
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