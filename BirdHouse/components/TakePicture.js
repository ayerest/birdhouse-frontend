import React, { useState } from 'react';
import { View, Text, StyleSheet, Button, Image, Alert, Dimensions } from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const TakePicture = props => {
    const [selectedImage, setSelectedImage] = useState();
    const verifyPermissions = async () => {
        //note to self - if I want the user to take a picture in app later on I need askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (result.status !== 'granted') {
            Alert.alert("Please grant permissions to provide an image.");
            return false;
        }
        return true;
    }


    const takeImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchCameraAsync();
        setSelectedImage(image.uri)
        props.onImageSelected(image.uri)
    }

    return (
        <View style={styles.imageTaker}>
            <Button style={styles.center} title="Take a Picture!" onPress={takeImageHandler} />
            {!!selectedImage ?
            <View style={styles.imagePreview}>
                <Image style={styles.image} source={{ uri: selectedImage }} /> 
            </View> : null }
        </View>
    )

}

const styles = StyleSheet.create({
    imagePreview: {
        width: '80%',
        height: '40%',
        borderWidth: 1,
        flex: 1,
        justifyContent: "center",
        backgroundColor: "ghostwhite"
    },
    imageTaker: {
        justifyContent: 'center',
        alignItems: "center",
        flex: 1,
        width: Dimensions.get('window').width / 2,
        height: Dimensions.get('window').height / 3
    },
    image: {
        width: '100%',
        height: '100%',
        resizeMode: 'contain'
    },
    center: {
        justifyContent: "center"
    }
})

export default TakePicture;