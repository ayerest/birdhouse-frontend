import React, { useEffect, useState } from 'react';
import {
  View, Text, StyleSheet, FlatList, ActivityIndicator, SafeAreaView,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import * as badgesActions from '../store/actions/badges';
import BadgeCard from '../components/BadgeCard';

// TODO: refactor stylesheet and move to another file

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.myColor,
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
    setIsLoading(true);
    const loadMyBadges = async () => {
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
      {isLoading && <ActivityIndicator size="large" color={Colors.linkColor} />}
      {!isLoading && badgesList.length > 0
       && (
       <SafeAreaView>
         <FlatList
           keyExtractor={item => item.id.toString()}
           data={badgesList}
           renderItem={renderBadgeItem}
           numColumns={1}
         />
       </SafeAreaView>
       )}
      {!isLoading && badgesList.length === 0
          && <Text style={styles.label}>You haven&apos;t earned any badges yet!</Text>}
    </View>
  );
};

export default BadgesScreen;
