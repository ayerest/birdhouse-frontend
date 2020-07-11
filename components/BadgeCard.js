import React, { useState, useEffect } from 'react';
import { Text, StyleSheet, Image, TouchableOpacity, View, ActivityIndicator } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import Colors from '../constants/Colors';
import { Feather } from '@expo/vector-icons';
import Card from './Card';
import { getMyEntries } from '../store/actions/entries';
import { getMyBirds } from '../store/actions/birds';
import BadgesInfo from './BadgesInfo';

const BadgeCard = props => {
    const [isLoading, setIsLoading] = useState(true);
    const [showInfo, setShowInfo] = useState(false);
    const { badge } = props;
    const dispatch = useDispatch();
    const user = useSelector(state => {
        return state.user.user;
    });

    const myBirds = useSelector(state => {
        return state.birds.myBirds;
    });

    const myEntries = useSelector(state => {
        return state.entries.entries;
    });

    useEffect(() => {
        let mounted = true;
        if (mounted) {
            loadBirdsAndSightings();
        }
        return () => mounted = false;
    }, [loadBirdsAndSightings]);

    const loadBirdsAndSightings = async () => {
        await Promise.all(dispatch(getMyEntries()),
            dispatch(getMyBirds()));
        setIsLoading(false);
    }

    const renderMedalImage = () => {
        if (badge.category === "Login") {
            if (badge.medal === "Bronze") {
                return <Image style={styles.badge} source={require("../assets/images/loginweekly.png")} />
            } else if (badge.medal === "Silver") {
                return <Image style={styles.badge} source={require("../assets/images/loginsilver.png")} />
            } else if (badge.medal === "Gold") {
                return <Image style={styles.badge} source={require("../assets/images/logingold.png")} />
            }
        }
        else if (badge.category === "Birds") {
            if (badge.medal === "Bronze") {
                return <Image style={styles.badge} source={require("../assets/images/2birdspecies.png")} />
            } else if (badge.medal === "Silver") {
                return <Image style={styles.badge} source={require("../assets/images/5birdspecies.png")} />
            } else if (badge.medal === "Gold") {
                return <Image style={styles.badge} source={require("../assets/images/10birdspecies.png")} />
            }
        }
        else if (badge.category === "Steps") {
            if (badge.medal === "Bronze") {
                return <Image style={styles.badge} source={require("../assets/images/1000steps.png")} />
            } else if (badge.medal === "Silver") {
                return <Image style={styles.badge} source={require("../assets/images/5000steps.png")} />
            } else if (badge.medal === "Gold") {
                return <Image style={styles.badge} source={require("../assets/images/20000steps.png")} />
            }
        }
        else if (badge.category === "Sightings") {
            if (badge.medal === "Bronze") {
                return <Image style={styles.badge} source={require("../assets/images/2birdsightings.png")} />
            } else if (badge.medal === "Silver") {
                return <Image style={styles.badge} source={require("../assets/images/5birdsighting.png")} />
            } else if (badge.medal === "Gold") {
                return <Image style={styles.badge} source={require("../assets/images/10birdsightings.png")} />
            }
        }
    } 
    
    const renderBadgeText = () => {
        if (badge.category === "Login") {
            return <Text style={styles.center}>Great job logging in at least once a week!</Text>
        } else if (badge.category === "Sightings") {
            return <Text style={styles.center}>You've documented {myEntries.length} {badge.category} of birds!</Text>
        } else if (badge.category === "Birds") {
            return <Text style={styles.center}>Nice work! You've seen a total of {myBirds.length} bird species!!</Text>
        } else if (badge.category === "Steps") {
            return <Text style={styles.center}>Wow! You have taken {user.step_count} steps!</Text> 
        }
    }

    return (
        <Card style={styles.card}>
            <View>
                {renderBadgeText()}
                <TouchableOpacity onPress={() => {
                    props.navigation.navigate({
                        name: 'Badge Details',
                    })
                }}>
                    {renderMedalImage()}
                </TouchableOpacity>
                <Text style={styles.center}>Earned on: {badge.updated_at.slice(0, 10)}</Text>
                {showInfo ? <BadgesInfo category={badge.category} /> : null}
                <View>
                    <TouchableOpacity onPress={() => {
                        setShowInfo(!showInfo);
                    }}>
                        <Feather style={styles.info} name="info" size={40} color={"cornflowerblue"} />
                    </TouchableOpacity>
                </View>
            </View>
        </Card>
    );
};

const styles = StyleSheet.create({
    badge: {
        resizeMode: "contain",
        height: 100,
        width: 100,
        alignSelf: "center"
    },
    center: {
        alignSelf: 'center',
        marginBottom: 5,
        marginTop: 5,
        fontFamily: 'Roboto-Condensed',
        fontSize: 16
    },
    card: {
        backgroundColor: Colors.myColor
    },
    info: {
        alignSelf: 'flex-end',
    }
});

export default BadgeCard;
