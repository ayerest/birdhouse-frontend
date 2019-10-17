import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, Image, FlatList, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MenuButton from '../components/MenuButton';
import Colors from '../constants/Colors';
import * as badgesActions from '../store/actions/badges';
import BadgeCard from '../components/BadgeCard';
import uuid from 'uuid';

const BadgesScreen = props => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)
    useEffect(() => {
        const loadMyBadges = async () => {
            setIsLoading(true);
            await dispatch(badgesActions.getMyBadges());
            setIsLoading(false);
        }
        loadMyBadges();
    }, [dispatch, badgesList]);

    const badgesList = useSelector(state => {
        return state.badges.myBadges
    })

    const renderBadgeItem = (badge) => {
        return (

        
                <BadgeCard badge={badge.item}  />
        )
    }
    //note to self: it would be nice to have an info link here to explain what you can get badges for --- really nice if users could see how close they were to earning a badge
    return (
        <View style={styles.screen}>

            {!isLoading && badgesList.length == 0 ? <Text>You haven't earned any badges yet!</Text> : null}
            {isLoading ? <ActivityIndicator size="large"/> : <FlatList keyExtractor={(item, index) => uuid()} data={badgesList} renderItem={renderBadgeItem} numColumns={2} />}
            
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
        </HeaderButtons>,
        headerRight: (<Image style={{width: 25, height: 25}}source={require("../assets/images/birdicon.png")} />)
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