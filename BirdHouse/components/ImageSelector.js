import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, Image, Alert} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import * as Permissions from 'expo-permissions';
import { Feather } from '@expo/vector-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';


const ImageSelector = props => {
    const [selectedImage, setSelectedImage] = useState(null);
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

    const handleResetAvatar = () => {
        setSelectedImage(null)
    }


    return (
    <View>
        <Button title="Select Avatar Image" onPress={selectImageHandler}/>
        
            {!!selectedImage ? 
            <View>
                <View style={styles.imagePreview}> 
                    <Image style={styles.image} source={{ uri: selectedImage }} />
                </View>
                {/* <TouchableOpacity style={styles.center}>
                    <Feather name="x-square" color={"red"} size={25} onPress={handleResetAvatar} />
                </TouchableOpacity> */}
            </View>
            : null }
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