import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, Image, ScrollView, ActivityIndicator, TouchableOpacity, Dimensions, Button } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import uuid from 'uuid';
import * as birdsActions from '../store/actions/birds';
import { Audio } from 'expo-av';
import { Feather } from '@expo/vector-icons';
import Card from '../components/Card';
import * as audioActions from '../store/actions/audio';
import {NavigationEvents} from 'react-navigation';
import AvatarButton from '../components/AvatarButton';
import Colors from '../constants/Colors';
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faBinoculars } from "@fortawesome/free-solid-svg-icons";

const BirdDetailsScreen = props => {
    const dispatch = useDispatch();
    const [isLoading, setIsLoading] = useState(false);
    const myLocation = useSelector((state) => state.location.myLocation); 

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            setIsLoading(true);
            const loadBird = async () => {
                const birdId = props.route.params.birdId;
                await dispatch(birdsActions.getBird(birdId));
                setIsLoading(false);
            }
            loadBird();
        }
        return () => mounted = false;
    }, [dispatch, singleBird]);

    const singleBird = useSelector(state => {
        return state.birds.singleBird;
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
        return state.audio.currentSound;
    })

    // const handleBackButtonClick = async () => {
        
    //     if (props.navigation.getParam('onComingBack')) {
    //         const goBack = props.navigation.getParam('onComingBack');
    //         goBack();
    //     }
    //     if (audio) {
    //         await audio.stopAsync();
    //         dispatch(audioActions.stopAudio);
    //     }
    //     props.navigation.goBack();
    // }

    const handleLeaving = async () => {
        if (audio) {
            await audio.stopAsync();
            dispatch(audioActions.stopAudio);
        }
        props.navigation.goBack();
    }
    
    const renderDetails = () => {
        if (singleBird.details) {
            return singleBird.details.split("!PARAGRAPH!").map(paragraph => {
                return <Text style={styles.paragraph} key={uuid()}>{paragraph}</Text>
            })
        }
    }

    const navToBirdForm = () => {
        props.navigation.navigate({
            name: 'Add Sighting', params: {
                visible: true,
                coords: myLocation,
                bird: singleBird,
            }
        });
    }

    return (
        <View style={styles.screen}>
            {/* <NavigationEvents
                onWillBlur={handleLeaving}
            /> */}
            {isLoading ? <ActivityIndicator size="large" color={Colors.linkColor} style={{ flex: 1, justifyContent: 'center', alignSelf: 'center' }} /> : 
            <ScrollView>
                <Card>
                    <ScrollView  maximumZoomScale={2} horizontal={true} contentContainerStyle={{ paddingRight: Dimensions.get('window').width * 0.2 }}>
                    <View>
                        <Image style={styles.birdImage} source={{uri: singleBird.img_url}}></Image>
                        {!!singleBird.range_map ? <Text style={styles.label}>Scroll right to view geographic range map</Text> : null}
                    </View>
                    {!!singleBird.range_map ?
                    <Image style={styles.image} source={{ uri: singleBird.range_map}}></Image> 
                    : null}
                </ScrollView>          
                <View style={styles.row}>
                    <TouchableOpacity onPress={navToBirdForm}>
                        <FontAwesomeIcon icon={faBinoculars} color={Colors.linkColor} size={30} style={styles.center} />
                    </TouchableOpacity>
                    <TouchableOpacity>
                        <Feather style={styles.center} name="volume-2" size={35} onPress={handlePlayAudio} color={Colors.linkColor} />
                    </TouchableOpacity>
                </View>
                    {renderDetails()}
                    <View style={styles.citation}>
                        <Text style={styles.heading}>Citation</Text>
                        <Text style={styles.italic}>{singleBird.citation}</Text>
                    </View>
                </Card>
            </ScrollView> }
        </View>
    )
}

export const screenOptions = (navData) => {
    const bird_name = navData.route.params.birdName;
    return {
        headerTitle: bird_name,
        headerTitleStyle: {
            fontFamily: 'Fred-Great',
            fontSize: 19,
            fontWeight: '400'
        },
        headerRight: () => (
            <AvatarButton handleClick={() => {
                navData.navigation.navigate({
                    name: 'My Account', params: {
                    }
                })
            }} />
        )
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
        flexWrap: "wrap",
        justifyContent: 'space-between',
    },
    center: {
        alignSelf: "center",
        margin: 10,
    }, 
    citation: {
        backgroundColor: "thistle",
        padding: 10,
        borderRadius: 10,
        fontFamily: 'Roboto-Condensed',
        fontSize: 16,
    },
    heading: {
        fontFamily: 'Roboto-Condensed',
        fontSize: 18,
        textAlign: 'center',
        marginBottom: 5,
    },
    italic: {
        fontStyle: 'italic',
    },
    paragraph: {
        marginBottom: 20,
        fontFamily: 'Roboto-Condensed',
        fontSize: 16,
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginRight: 10,
        alignSelf: "center",
        fontFamily: 'Roboto-Condensed',
    },
    buttonLike: {
        color: Colors.linkColor,
        fontSize: 18,
        marginBottom: 5,
    }
})

export default BirdDetailsScreen;