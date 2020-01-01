import React, {useEffect, useState} from 'react';
import { View, Text, StyleSheet, FlatList, Platform, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import MenuButton from '../components/MenuButton';
import Colors from '../constants/Colors';
import * as badgesActions from '../store/actions/badges';
import BadgeCard from '../components/BadgeCard';
import uuid from 'uuid';
import { TouchableOpacity, ScrollView } from 'react-native-gesture-handler';
import AvatarButton from '../components/AvatarButton';

const BadgesScreen = props => {

    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    useEffect(() => {
        const loadMyBadges = async () => {
            setIsLoading(true);
            await dispatch(badgesActions.getMyBadges());
            setIsLoading(false);
        }
        loadMyBadges();
    }, [dispatch, badgesList]);

    const badgesList = useSelector(state => {
        return state.badges.myBadges;
    })

    const user = useSelector(state => {
        return state.user.user;
    })

    const newSteps = useSelector(state => {
        return state.steps.myNewSteps;
    })

    const renderBadgeItem = (badge) => {
        return (
            <TouchableOpacity onPress={() => {
                props.navigation.navigate({
                routeName: 'BadgeDetails', params: {
                    entryId: badge.item.id,
                    entryName: `${badge.item.category}`,
                    entry: badge.item
                }
            })}}>
                <BadgeCard badge={badge.item}  />
            </TouchableOpacity>
        )
    }
    //note to self: it would be nice to have an info link here to explain what you can get badges for --- really nice if users could see how close they were to earning a badge
    return (
        <View style={styles.screen}>
            <ScrollView>
                {!isLoading && badgesList.length == 0 ? <Text style={styles.label}>You haven't earned any badges yet!</Text> : null}
                {isLoading ? <ActivityIndicator size="large"/> : <FlatList keyExtractor={(item, index) => uuid()} data={badgesList} renderItem={renderBadgeItem} numColumns={1} />}

            </ScrollView>

            
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
        headerRight: (
            <AvatarButton handleClick={() => {
                navData.navigation.navigate({
                    routeName: 'MyAccount', params: {
                    }
                })
            }} />
        )
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginRight: 10,
        alignSelf: "center",
        fontFamily: 'Roboto-Condensed',
    }
})

export default BadgesScreen;