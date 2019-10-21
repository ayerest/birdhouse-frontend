import React, {useState} from 'react';
import { View, Text, StyleSheet, Image, Button, TouchableOpacity } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Card from './Card';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import * as audioActions from '../store/actions/audio';
// import { TouchableOpacity } from 'react-native-gesture-handler';



const BirdCard = props => {

    const dispatch = useDispatch();

    const [audioIcon, setAudioIcon] = useState("🔊")
    // const [birdcall, setBirdcall] = useState(null)

    const myBirds = useSelector(state => {
        return state.birds.myBirds
    })

    const birdIds = myBirds.map(bird => {
        return bird.id
    })

    const handlePlayAudio = async () => {
        const soundObject = new Audio.Sound();
        
            try {
                await soundObject.loadAsync({ uri: props.bird.item.birdcall })
                await dispatch(audioActions.playAudio(soundObject))
                // props.onHandlePlayAudio(soundObject);
            } catch (error) {
                // An error occurred!
            }
        
    }
    
    return (
            <Card style={styles.card}>
                <View style={styles.center}>
                    {birdIds.indexOf(props.bird.item.id) >= 0 ? <Image style={styles.image} source={{uri: props.bird.item.img_url}}></Image>:
                    <Image style={styles.stockimage} source={require("../assets/images/birdicon.png")}></Image>}
                <TouchableOpacity onPress={handlePlayAudio}>
                        <Feather style={styles.center} name="volume-2" size={25}  />

                    </TouchableOpacity>
                </View>
                <View style={styles.center}>
                    <Text style={styles.smallFont}>{props.common_name}</Text>
                    <Text style={styles.smallFont}>{props.scientific_name}</Text>
                </View>
            </Card>
    );
};

const styles = StyleSheet.create({
    card: {
        height: 200,
        width: 170,
        alignContent: "center"
    }, 
    center: {
        alignSelf: "center"
    },
    stockimage: {
        width: 90,
        height: 90
    },
    image: {
        width: 130,
        height: 100,
        borderRadius: 10
    },
    smallFont: {
        fontSize: 12
    }
});

export default BirdCard;
