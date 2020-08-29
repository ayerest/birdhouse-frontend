import React from 'react';
import { useSelector } from 'react-redux';
import {
  View, StyleSheet, Image, TouchableOpacity,
} from 'react-native';
import PropTypes from 'prop-types';

const styles = StyleSheet.create({
  avatar: {
    flex: 1,
  },
});

const AvatarButton = (props) => {
  const { handleClick } = props;
  const user = useSelector((state) => state.user.user);

  return (
    <TouchableOpacity onPress={handleClick}>
      <View style={styles.avatar}>
        {user
          ? <Image style={{ width: 50, height: 50, resizeMode: 'contain' }} source={{ uri: user.avatar }} /> : <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={require('../assets/images/birdicon.png')} />}
      </View>
    </TouchableOpacity>
  );
};

AvatarButton.defaultProps = {
  handleClick: '',
};

AvatarButton.propTypes = {
  handleClick: PropTypes.instanceOf(Object),
};

export default AvatarButton;
