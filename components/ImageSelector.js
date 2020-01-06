import React, {useState} from 'react';
import {View, StyleSheet, Button, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';

const ImageSelector = props => {
    const [selectedImage, setSelectedImage] = useState('https://www.allaboutbirds.org/guide/assets/photo/63666541-480px.jpg');
    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.CAMERA_ROLL, Permissions.CAMERA);
        if (result.status !== 'granted') {
            Alert.alert("Please grant permissions to provide an image.");
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
        setSelectedImage(image.uri);
        props.onImageSelected(image.uri);
    }

    const handleResetAvatar = () => {
        setSelectedImage(null);
    }

    return (
        <View>
            <Button title="Select Avatar Image" onPress={selectImageHandler}/>
            
                
                    <View style={styles.imagePreview}> 
                        <Image style={styles.image} source={{ uri: selectedImage }} />
                    </View>
                    
        </View>
    )
    
}

const styles = StyleSheet.create({
    imagePreview: {
        width: 100,
        height: 100,
        justifyContent: 'center',
        alignSelf: 'center'
    },
    image: {
        width: '100%',
        height: '100%',
        borderRadius: 50
    },
    center: {
        alignSelf: 'center'
    }
})

export default ImageSelector;