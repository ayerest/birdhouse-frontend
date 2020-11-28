import React from 'react';
import { View, StyleSheet } from 'react-native';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';

// TODO: refactor stylesheet and move to another file

const styles = StyleSheet.create({
  card: {
    shadowColor: 'black',
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 6,
    shadowOpacity: 0.26,
    elevation: 8,
    backgroundColor: Colors.myColor,
    padding: 10,
    borderRadius: 15,
    margin: 10,
  },
});

const Card = (props) => {
  const { style, children } = props;
  return (
    <View style={{ ...styles.card, ...style }}>{children}</View>
  );
};

Card.defaultProps = {
  style: '',
  children: '',
};

Card.propTypes = {
  style: PropTypes.instanceOf(Object),
  children: PropTypes.instanceOf(Object),
};

export default Card;
