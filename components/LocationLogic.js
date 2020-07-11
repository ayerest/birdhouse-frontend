import React, { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Alert } from 'react-native';
import * as Location from 'expo-location';
import * as Permissions from 'expo-permissions';
import { setMyLocation } from '../store/actions/location';

const LocationLogic = (props) => {
    const dispatch = useDispatch();

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            getLocationHandler();
        }
        return () => mounted = false;
    }, [getLocationHandler]);

    const verifyPermissions = async () => {
        const result = await Permissions.askAsync(Permissions.LOCATION);
        if (result.status !== 'granted') {
            Alert.alert("Please grant location permissions to use the map feature.");
            return false;
        }
        return true;
    }

    const getLocationHandler = async () => {
        const hasPermission = await verifyPermissions();
        if (!hasPermission) {
            return;
        }
        try {
            const location = await Location.getCurrentPositionAsync({ timeout: 10000 });
            dispatch(setMyLocation({
                lat: location.coords.latitude,
                lng: location.coords.longitude
            }))
        } catch (err) {
            Alert.alert("Unable to access current location.", "Please try again later.")
        }
        props.stillLoading();
    } 
    return (null);
}

export default LocationLogic;
