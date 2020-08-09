import React from 'react';
import { Platform } from 'react-native';
import { HeaderButton } from 'react-navigation-header-buttons';
import { Ionicons } from '@expo/vector-icons';

const MenuButton = (props) => (
  <HeaderButton
    {...props}
    IconComponent={Ionicons}
    iconSize={25}
    color={Platform.OS === 'android' ? 'white' : 'black'}
  />
);

export default MenuButton;
