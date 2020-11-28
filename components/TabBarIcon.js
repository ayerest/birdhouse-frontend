import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import PropTypes from 'prop-types';

import Colors from '../constants/Colors';

// TODO: import just the needed icons

export default function TabBarIcon({ name, focused }) {
  return (
    <Ionicons
      name={name}
      size={26}
      style={{ marginBottom: -3 }}
      color={focused ? Colors.tabIconSelected : Colors.tabIconDefault}
    />
  );
}

TabBarIcon.defaultProps = {
  name: '',
  focused: '',
};

TabBarIcon.propTypes = {
  focused: PropTypes.bool,
  name: PropTypes.string,
};
