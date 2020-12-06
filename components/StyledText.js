import React from 'react';
import { Text } from 'react-native';
import PropTypes from 'prop-types';

// TODO: should be using this custom text component throughout app
// TODO: re-write to use the Roboto-Condensed font with most common font styles

export default function MonoText(props) {
  const { style } = props;
  return (
    <Text {...props} style={[style]} />
  );
}

MonoText.defaultProps = {
  style: '',
};

MonoText.propTypes = {
  style: PropTypes.instanceOf(Object),
};
