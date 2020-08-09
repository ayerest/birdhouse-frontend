import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, Platform, ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import uuid from 'uuid';
import { ScrollView } from 'react-native-gesture-handler';
import MenuButton from '../components/MenuButton';
import Colors from '../constants/Colors';
import * as badgesActions from '../store/actions/badges';
import BadgeCard from '../components/BadgeCard';
import AvatarButton from '../components/AvatarButton';

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginRight: 10,
    alignSelf: 'center',
    fontFamily: 'Roboto-Condensed',
  },
});

const BadgesScreen = (props) => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  useEffect(() => {
    const loadMyBadges = async () => {
      setIsLoading(true);
      await dispatch(badgesActions.getMyBadges());
      setIsLoading(false);
    };
    loadMyBadges();
  }, [dispatch]);
  const badgesList = useSelector((state) => state.badges.myBadges);

  const renderBadgeItem = (badge) => (
    <BadgeCard badge={badge.item} {...props} />
  );

  return (
    <View style={styles.screen}>
      {isLoading ? <ActivityIndicator size="large" color={Colors.linkColor} />
        : (
          <ScrollView>
            <FlatList
              keyExtractor={() => uuid()}
              data={badgesList}
              renderItem={renderBadgeItem}
              numColumns={1}
            />
            {!isLoading && badgesList.length === 0
              ? <Text style={styles.label}>You haven`&apos;`t earned any badges yet!</Text>
              : null}
          </ScrollView>
        )}
    </View>
  );
};

export const screenOptions = (navData) => ({
  headerTitle: 'My Badges',
  headerLeft: () => (
    <HeaderButtons HeaderButtonComponent={MenuButton}>
      <Item
        title="Menu"
        iconName={Platform.OS === 'ios' ? 'ios-menu' : 'md-menu'}
        onPress={() => { navData.navigation.toggleDrawer(); }}
      />
    </HeaderButtons>
  ),
  headerRight: () => (
    <AvatarButton handleClick={() => {
      navData.navigation.navigate({
        name: 'My Account',
        params: {
        },
      });
    }}
    />
  ),
});

export default BadgesScreen;
