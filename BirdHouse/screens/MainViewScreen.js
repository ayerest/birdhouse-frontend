import React from 'react';
import { View, Text, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import MenuButton from '../components/MenuButton'
import Colors from '../constants/Colors'

const MainViewScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Main View Screen!</Text>
            <Text>Map should load with markers</Text>
            <Text>Tap map to add a new marker</Text>
            <Text>Adding a new marker opens an info window with a form to post a new entry</Text>
            
        </View>
    )
}

MainViewScreen.navigationOptions = navData => {
    return {
        headerTitle: "Let's go birdwatching!",
        headerStyle: {
            backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
            color: "black"
        },
        headerLeft: <HeaderButtons HeaderButtonComponent={MenuButton}>
            <Item title="Menu" iconName= {Platform.OS === "ios" ? "ios-menu" : "md-menu"}
            onPress={() => {navData.navigation.toggleDrawer()}} />
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

export default MainViewScreen;