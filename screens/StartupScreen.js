import React, {useEffect} from 'react';
import {View, ActivityIndicator, StyleSheet, AsyncStorage} from 'react-native';
import {useDispatch} from 'react-redux';
import * as authActions from '../store/actions/auth';
import Colors from '../constants/Colors';

const StartupScreen = props => {
    const dispatch = useDispatch();
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const tryLogin = async () => {
                const userData = await AsyncStorage.getItem("userData")
                if (!userData) {
                    await dispatch(authActions.setAutologin());
                    return () => mounted = false;
                } 
                const transformedData = JSON.parse(userData);
                const {token, userId, expiryDate} = transformedData;
                const expirationDate = new Date(expiryDate)
            
                if (expirationDate <= new Date() || !token || !userId ) {
                    await dispatch(authActions.setAutologin());
                    return () => mounted = false;
                }
                await dispatch(authActions.authenticate(userId, token))
                return () => mounted = false;
            };
            tryLogin();
        }
        return () => mounted = false;
    }, [dispatch])

    return (
        <View style={styles.screen}>
            <ActivityIndicator size='large' color={Colors.linkColor}/>
        </View>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center"
    }
})

export default StartupScreen;