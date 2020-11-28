import React, { useState, useEffect } from 'react';
import {
  View, Text, Button, StyleSheet, ActivityIndicator,
} from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import * as birdsActions from '../store/actions/birds';
import Colors from '../constants/Colors';

// TODO: refactor stylesheet and move to another file
// TODO: remove anti pattern in useeffect

const styles = StyleSheet.create({
  row: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  label: {
    fontFamily: 'Roboto-Condensed',
    fontSize: 16,
    fontWeight: 'bold',
    backgroundColor: Colors.accentColor,
    padding: 5,
  },
});

const BirdCount = (props) => {
  const [isLoading, setIsLoading] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    let mounted = true;
    if (mounted) {
      const loadMyBirdCount = async () => {
        setIsLoading(true);
        await dispatch(birdsActions.getMyBirds());
        setIsLoading(false);
      };
      loadMyBirdCount();
    }
    return () => {
      mounted = false;
    };
  }, [dispatch]);

  const myBirds = useSelector((state) => state.birds.myBirds);

  const handleShowMyBirds = () => {
    props.onShowBirds('mine');
  };

  return (
    <View>
      {isLoading && <ActivityIndicator size="large" color={Colors.linkColor} />}
      {!isLoading && (
      <View style={styles.row}>
        <Button onPress={handleShowMyBirds} title="My Birds" />
        <Text style={styles.label}>
          Species Seen:
          {' '}
          {myBirds.length}
        </Text>
      </View>
      )}
    </View>
  );
};

BirdCount.defaultProps = {
  onShowBirds: '',
};

BirdCount.propTypes = {
  onShowBirds: PropTypes.instanceOf(Function),
};

export default BirdCount;
