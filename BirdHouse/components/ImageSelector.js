import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const ImageSelector = props => {
    const [selectedImage, setSelectedImage] = useState("blackandwhitewarbler.jpg");
    const verifyPermissions = async () => {
        //note to self - if I want the user to take a picture in app later on I need askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (result.status !== 'granted') {
            Alert.alert("Please grant permissions to provide an image.", [{text: "Okay"}]);
            return false;
        }
        return true;
    }

    const selectImageHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        const image = await ImagePicker.launchImageLibraryAsync();
        setSelectedImage(image.uri)
        props.onImageSelected(image.uri)
    }


    return (
    <View>
        <Button title="Select Image" onPress={selectImageHandler}/>
        <View style={styles.imagePreview}>
        { !!selectedImage ?  <Image style={styles.image} source={{uri: selectedImage}}/> : null }
        </View>
    </View>
    )
    
}

const styles = StyleSheet.create({
    imagePreview: {
        width: 100,
        height: 100,
        borderWidth: 1,
        borderRadius: 100
    },
    image: {
        width: '100%',
        height: '100%',
    }
})

export default ImageSelector;