import React from 'react';
import { View, Text, StyleSheet, Button, TouchableOpacity, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import MenuButton from '../components/MenuButton'
import Colors from '../constants/Colors'

const BadgesScreen = props => {
    return (
        <View style={styles.screen}>
            <Text>The Badges Screen!</Text>
        </View>
    )
}

BadgesScreen.navigationOptions = navData => {
    return {
        headerTitle: "My Badges",
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

export default BadgesScreen;