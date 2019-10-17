import React from 'react';
import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MenuButton from '../components/MenuButton';
import GeoMap from '../components/GeoMap'
import Colors from '../constants/Colors';
import Stepometer from '../components/Stepometer';

const MainViewScreen = props => {
    return (
        <View style={styles.screen}>
            <Stepometer />
            <GeoMap />
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

export default MainViewScreen;