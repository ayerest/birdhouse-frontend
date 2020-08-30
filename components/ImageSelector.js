import React, { useState } from 'react';
import {
  View, StyleSheet, Button, Image, Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import PropTypes from 'prop-types';
import Colors from '../constants/Colors';

const styles = StyleSheet.create({
  imagePreview: {
    width: 100,
    height: 100,
    justifyContent: 'center',
    alignSelf: 'center',
  },
  image: {
    width: '100%',
    height: '100%',
    borderRadius: 50,
    borderColor: Colors.accentColor,
    borderWidth: 3,
    backgroundColor: Colors.myColor,
  },
  center: {
    alignSelf: 'center',
  },
});

const ImageSelector = (props) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    if (result.status !== 'granted') {
      Alert.alert('Please grant permissions to provide an image.');
      return false;
    }
    return true;
  };

  const selectImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchImageLibraryAsync();
    setSelectedImage(image.uri);
    props.onImageSelected(image.uri);
  };

  const handleResetAvatar = () => {
    setSelectedImage(null);
  };

  return (
    <View>
      <Button
        title={selectedImage ? 'Clear Avatar Image' : 'Select Avatar Image'}
        onPress={selectedImage ? handleResetAvatar : selectImageHandler}
      />
      <View style={styles.imagePreview}>
        <Image style={styles.image} source={{ uri: selectedImage }} />
      </View>

    </View>
  );
};

ImageSelector.defaultProps = {
  onImageSelected: '',
};

ImageSelector.propTypes = {
  onImageSelected: PropTypes.instanceOf(Function),
};

export default ImageSelector;
