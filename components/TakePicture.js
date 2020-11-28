import React, { useState } from 'react';
import {
  View, StyleSheet, Button, Image, Alert,
} from 'react-native';
import PropTypes from 'prop-types';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

// TODO: refactor stylesheet and move to another file
// TODO: re-write component so that this can also be used on the create an account form
// TODO: remove ternary statement from jsx

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
    resizeMode: 'cover',
  },
  center: {
    alignSelf: 'center',
  },
  imageTaker: {
    justifyContent: 'center',
    alignItems: 'center',
  },
});

const TakePicture = (props) => {
  const [selectedImage, setSelectedImage] = useState();
  const verifyPermissions = async () => {
    const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
    if (result.status !== 'granted') {
      Alert.alert('Please grant permissions to provide an image.');
      return false;
    }
    return true;
  };

  const takeImageHandler = async () => {
    const hasPermission = await verifyPermissions();
    if (!hasPermission) {
      return;
    }
    const image = await ImagePicker.launchCameraAsync();
    setSelectedImage(image.uri);
    props.onImageSelected(image.uri);
  };

  return (
    <View style={styles.imageTaker}>
      <Button style={styles.center} title="Take a Picture!" onPress={takeImageHandler} />
      {selectedImage ? (
        <View style={styles.imagePreview}>
          <Image style={styles.image} source={{ uri: selectedImage }} />
        </View>
      ) : null }
    </View>
  );
};

TakePicture.defaultProps = {
  onImageSelected: '',
};

TakePicture.propTypes = {
  onImageSelected: PropTypes.instanceOf(Object),
};

export default TakePicture;
