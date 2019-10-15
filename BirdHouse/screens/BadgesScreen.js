import React, {useEffect} from 'react';
import { View, Text, StyleSheet, Button, FlatList, Platform } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MenuButton from '../components/MenuButton';
import Colors from '../constants/Colors';
import * as badgesActions from '../store/actions/badges';
import BadgeCard from '../components/BadgeCard';
import uuid from 'uuid';

const BadgesScreen = props => {

    const dispatch = useDispatch();

    useEffect(() => {
        const loadMyBadges = async () => {
            dispatch(badgesActions.getMyBadges());
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

            <Text>The Badges Screen!</Text>
            {badgesList.length > 0 ? <FlatList keyExtractor={(item, index) => uuid()} data={badgesList} renderItem={renderBadgeItem} numColumns={2} />: <Text>You haven't earned any badges yet!</Text>}
            
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