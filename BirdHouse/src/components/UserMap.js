import React from 'react';
import {View, StyleSheet} from 'react-native';
import MapView from 'react-native-maps';

const UserMap = props => {
    return (
        <View style={styles.mapContainer}> 
            <MapView 
                initialRegion={{
                    latitude: 37.78825,
                    longitude: -122.4324,
                    latitudeDelta: 0.0622,
                    longitudeDelta: 0.0321,
                }}
                region={props.userLocation}
                style={styles.map}
            /> 
        </View>
    );
};

const styles = StyleSheet.create({
    mapContainer: {
        width: '100%',
        height: 200
    },
    map: {
        width: '100%',
        height: '100%'
    }
})

export default UserMap