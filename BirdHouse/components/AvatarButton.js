import React, {useState, useEffect} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity, Platform, FlatList, ActivityIndicator } from 'react-native';

import { Ionicons } from '@expo/vector-icons';

import Colors from '../constants/Colors';

const AvatarButton = props => {
    console.log(props, "props in avatar button")
    const user = useSelector(state => {
        return state.user.user
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
