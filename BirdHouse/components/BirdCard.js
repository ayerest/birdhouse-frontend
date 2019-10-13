import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import Card from './Card'

const BirdCard = props => {
    return (
        <TouchableOpacity onPress={props.onPress} style={styles.bird}>
            <Card>
                <Text>{props.common_name}</Text>
                <Text>{props.scientific_name}</Text>
                <Image style={styles.image} source={require("../assets/images/birdicon.png")}></Image>
            </Card>
        </TouchableOpacity>
    );
};

const styles = StyleSheet.create({
    bird: {
        flex: 1
    },
    image: {
        width: 50,
        height: 50
    }
});

export default BirdCard;
