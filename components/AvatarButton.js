import React from 'react';
import { useSelector } from 'react-redux';
import { View, StyleSheet, Image, TouchableOpacity } from 'react-native';

const AvatarButton = props => {
    const user = useSelector(state => {
        return state.user.user;
    })

    return (
        <TouchableOpacity onPress={props.handleClick}>
            <View style={styles.avatar}>
                {user ?
                    <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={{ uri: user.avatar }} /> : <Image style={{ width: 40, height: 40, resizeMode: 'contain' }} source={require('../assets/images/birdicon.png')} />}
            </View>
        </TouchableOpacity>
    );
};


const styles = StyleSheet.create({
    avatar: {
        flex: 1,
    },
    mapContainer: {
        height: '92%',
        width: '100%',
    },
})

export default AvatarButton;
