import React from 'react';
import { Text, StyleSheet, Image, TouchableOpacity } from 'react-native';
import { useSelector } from 'react-redux';
import Card from './Card'

const BirdCard = props => {
    const myBirds = useSelector(state => {
        return state.birds.myBirds
    })

    const birdIds = myBirds.map(bird => {
        return bird.id
    })

    // console.log(birdIds)
    // console.log(props.bird.item.id)
    
    return (
            <Card>
                {birdIds.indexOf(props.bird.item.id) >= 0 ? <Image style={styles.image} source={{uri: props.bird.item.img_url}}></Image>:
                <Image style={styles.stockimage} source={require("../assets/images/birdicon.png")}></Image>}
                <Text>{props.common_name}</Text>
                <Text>{props.scientific_name}</Text>
            </Card>
    );
};

const styles = StyleSheet.create({
    bird: {
        flex: 1
    },
    stockimage: {
        width: 50,
        height: 50
    },
    image: {
        width: 150,
        height: 150
    }
});

export default BirdCard;
