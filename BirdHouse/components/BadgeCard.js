import React from 'react';
import { Text, StyleSheet, Image, ActivityIndicator } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import Colors from '../constants/Colors';

import Card from './Card'

const BadgeCard = props => {

    const user = useSelector(state => {
        return state.user.user
    })

    const fieldEntries = useSelector(state => {
        return state.entries.entries
    })

    const myBirds = useSelector(state => {
        return state.birds.myBirds
    })

    const renderMedalImage = () => {
        if (props.badge.category === "Login") {
            if (props.badge.medal === "Bronze") {
                return <Image style={styles.badge} source={require("../assets/images/loginweekly.png")} />
            } else if (props.badge.medal === "Silver") {
                return <Image style={styles.badge} source={require("../assets/images/loginsilver.png")} />
            } else if (props.badge.medal === "Gold") {
                return <Image style={styles.badge} source={require("../assets/images/logingold.png")} />
            }
        }
        else if (props.badge.category === "Birds") {
            if (props.badge.medal === "Bronze") {
                return <Image style={styles.badge} source={require("../assets/images/2birdspecies.png")} />
            } else if (props.badge.medal === "Silver") {
                return <Image style={styles.badge} source={require("../assets/images/5birdspecies.png")} />
            } else if (props.badge.medal === "Gold") {
                return <Image style={styles.badge} source={require("../assets/images/10birdspecies.png")} />
            }
        }
        else if (props.badge.category === "Steps") {
            if (props.badge.medal === "Bronze") {
                return <Image style={styles.badge} source={require("../assets/images/1000steps.png")} />
            } else if (props.badge.medal === "Silver") {
                return <Image style={styles.badge} source={require("../assets/images/5000steps.png")} />
            } else if (props.badge.medal === "Gold") {
                return <Image style={styles.badge} source={require("../assets/images/20000steps.png")} />
            }
        }
        else if (props.badge.category === "Sightings") {
            if (props.badge.medal === "Bronze") {
                return <Image style={styles.badge} source={require("../assets/images/2birdsightings.png")} />
            } else if (props.badge.medal === "Silver") {
                return <Image style={styles.badge} source={require("../assets/images/5birdsighting.png")} />
            } else if (props.badge.medal === "Gold") {
                return <Image style={styles.badge} source={require("../assets/images/10birdsightings.png")} />
            }
        }
    } 
    
    const renderBadgeText = () => {
        if (props.badge.category === "Login") {
            return <Text style={styles.center}>Great job logging in at least once a week!</Text>
        } else if (props.badge.category === "Sightings") {
            return <Text style={styles.center}>You've documented {user.field_entries.length} {props.badge.category} of birds!</Text>
        } else if (props.badge.category === "Birds") {
            return <Text style={styles.center}>Nice work! You've seen a total of {user.birds.length} bird species!!</Text>
        } else if (props.badge.category === "Steps") {
            return <Text style={styles.center}>Wow! You have taken {user.step_count} steps!</Text> 
        }
    }

    return (
        <Card style={styles.card}>
            
            {renderBadgeText()}
            {renderMedalImage()}
            <Text style={styles.center}>Earned on: {props.badge.updated_at.slice(0, 10)}</Text>
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
        fontFamily: 'Roboto-Condensed',
        fontSize: 16
    },
    card: {
        backgroundColor: Colors.myColor
    }
});

export default BadgeCard;
