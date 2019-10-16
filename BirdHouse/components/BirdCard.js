import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, Button } from 'react-native';
import { useSelector } from 'react-redux';
import Card from './Card';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';


const BirdCard = props => {
    const [audioIcon, setAudioIcon] = useState("🔊")

    const myBirds = useSelector(state => {
        return state.birds.myBirds
    })

    const birdIds = myBirds.map(bird => {
        return bird.id
    })

    // console.log(birdIds)
    // console.log(props.bird.item.id)

    const handlePlayAudio = async () => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync({ uri: props.bird.item.birdcall });
            await soundObject.playAsync();
            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    }
    
    return (
            <Card>
                <View>
                    {birdIds.indexOf(props.bird.item.id) >= 0 ? <Image style={styles.image} source={{uri: props.bird.item.img_url}}></Image>:
                    <Image style={styles.stockimage} source={require("../assets/images/birdicon.png")}></Image>}
                    <Feather name="volume-2" size={25} onPress={handlePlayAudio} />
                </View>
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
