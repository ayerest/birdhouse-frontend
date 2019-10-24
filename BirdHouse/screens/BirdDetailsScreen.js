import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Button, Image, ScrollView, ActivityIndicator, TouchableOpacity, Platform, FlatList, Dimensions } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import uuid from 'uuid';
import * as birdsActions from '../store/actions/birds';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import Card from '../components/Card';
import * as audioActions from '../store/actions/audio';
import {NavigationEvents} from 'react-navigation';


const BirdDetailsScreen = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false)

    useEffect(() => {
        setIsLoading(true);
        const loadBird = async () => {
            const birdId = props.navigation.getParam('birdId')
            await dispatch(birdsActions.getBird(birdId));
            setIsLoading(false);
        }
        loadBird();
    }, [dispatch, singleBird]);

    const singleBird = useSelector(state => {
        return state.birds.singleBird
    })

    const handlePlayAudio = async () => {
        const soundObject = new Audio.Sound();
        try {
            await soundObject.loadAsync({uri: singleBird.birdcall});
            // handlePlayingMultiAudio(soundObject)
            await dispatch(audioActions.playAudio(soundObject))

            // Your sound is playing!
        } catch (error) {
            // An error occurred!
        }
    }

    const audio = useSelector(state => {
        return state.audio.currentSound
    })

    const handleBackButtonClick = async () => {
        
        if (props.navigation.getParam('onComingBack')) {
            const goBack = props.navigation.getParam('onComingBack');
            goBack();
        }
        if (audio) {
            await audio.stopAsync();
            dispatch(audioActions.stopAudio)
        }
        props.navigation.goBack()
    }

    const handleLeaving = async () => {
        if (audio) {
            await audio.stopAsync();
            dispatch(audioActions.stopAudio)
        }
        props.navigation.goBack()
    }
    
    const renderDetails = () => {
        if (singleBird.details) {
            return singleBird.details.split("!PARAGRAPH!").map(paragraph => {
                return <Text style={styles.paragraph} key={uuid()}>{paragraph}</Text>
            })
        }
    }

    return (
        <View style={styles.screen}>
            <NavigationEvents
                onWillBlur={handleLeaving}
            />
            <ScrollView>
                { isLoading ? <ActivityIndicator size="large" color="blue" style={{flex: 1, justifyContent: 'center', alignSelf: 'center'}}/> : 
                <Card>
                    <ScrollView  maximumZoomScale={2} horizontal={true} contentContainerStyle={{ paddingRight: Dimensions.get('window').width * 0.2 }}>
                    <View>
                    <Image style={styles.birdImage} source={{uri: singleBird.img_url}}></Image>
                    {!!singleBird.range_map ? <Text>Scroll right to view geographic range map</Text> : null}
                    </View>
                    {!!singleBird.range_map ?
                    <Image style={styles.image} source={{ uri: singleBird.range_map}}></Image> 
                    : null}
                </ScrollView>          
                <TouchableOpacity>
                    <Feather style={styles.center} name="volume-2" size={25} onPress={handlePlayAudio} />
                </TouchableOpacity>
                    {renderDetails()}
                    <View style={styles.citation}>
                        <Text style={styles.italic}>{singleBird.citation}</Text>
                    </View>
                </Card> }
                 
                       
                <Button title="Go Back" onPress={handleBackButtonClick} />
                
            </ScrollView>
        </View>
    )
}

BirdDetailsScreen.navigationOptions = (navigationData) => {
    const bird_name = navigationData.navigation.getParam('birdName')
    return {
        headerTitle: bird_name,
        headerTitleStyle: {
            fontFamily: 'Fred-Great',
            fontSize: 21,
            fontWeight: '400'
        }
    }
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        resizeMode: "cover",
        height: Dimensions.get('window').height * 0.3,
        width: Dimensions.get('window').width * 0.8,
        borderRadius: 10,
    },
    birdImage: {
        resizeMode: "contain",
        height: Dimensions.get('window').height * 0.3,
        width: Dimensions.get('window').width * 0.87,
        borderRadius: 10,
    }, 
    row: {
        flexDirection: "row",
        flexWrap: "wrap"
    },
    center: {
        alignSelf: "center"
    }, 
    citation: {
        backgroundColor: "thistle",
        padding: 5,
        borderRadius: 10,
    },
    italic: {
        fontStyle: 'italic',
    },
    paragraph: {
        margin: 2
    }
})

export default BirdDetailsScreen;