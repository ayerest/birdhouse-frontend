import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';


const ImageSelector = props => {
    const [selectedImage, setSelectedImage] = useState();
    const verifyPermissions = async () => {
        //note to self - if I want the user to take a picture in app later on I need askAsync(Permissions.CAMERA, Permissions.CAMERA_ROLL)
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL);
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
        // console.log(image)
        setSelectedImage(image.uri)
        props.onImageSelected(image.uri)
    }
    return (
    <View>
        <View style={styles.imagePreview}>
        { !!selectedImage ?  <Image style={styles.image} source={{uri: selectedImage}}/> : null }
        </View>
        <Button title="Select Image" onPress={selectImageHandler}/>
    </View>
    )
    
}

const styles = StyleSheet.create({
    imagePreview: {
        width: '100%',
        height: 200,
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 100
    }
})

export default ImageSelector;