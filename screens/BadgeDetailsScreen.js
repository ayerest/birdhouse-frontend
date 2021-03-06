import React, { useEffect } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Card from '../components/Card';
import * as factoidActions from '../store/actions/factoids';

// TODO: refactor stylesheet and move to a separate file

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'thistle',
  },
  image: {
    height: 250,
    width: 250,
    marginTop: 5,
    borderRadius: 15,
  },
  label: {
    fontSize: 16,
    marginBottom: 5,
    marginRight: 10,
    alignSelf: 'center',
    fontFamily: 'Roboto-Condensed',
  },
});

const BadgeDetailsScreen = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const getRandomFact = async () => {
      await dispatch(factoidActions.getFact());
    };
    getRandomFact();
  }, [dispatch]);

  const fact = useSelector((state) => state.factoids.fact);

  return (
    <ScrollView>
      <Card style={styles.screen}>
        <Text style={styles.label}>Bonus Bird Fact</Text>
        {fact ? <Text style={styles.label}>{fact.fact}</Text> : null}
      </Card>
    </ScrollView>
  );
};

export default BadgeDetailsScreen;
