import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import Card from './Card'

const BadgeCard = props => {
    console.log(props.badge, "in the badge card")
    let image = "../assets/images/" + props.badge.medal + "-medal.png"
    console.log(image)

    const renderMedalImage = () => {
        if (props.badge.medal === "Gold") {
            return <Image style={styles.badge} source={require("../assets/images/Gold-medal.png")} />
        }
        else if (props.badge.medal === "Silver") {
            return <Image style={styles.badge} source={require("../assets/images/Silver-medal.png")} />
        }
        else if (props.badge.medal === "Bronze") {
            return <Image style={styles.badge} source={require("../assets/images/Bronze-medal.png")} />
        }
    }
    

    return (
        <Card>
            <Text>{props.badge.category} : {props.badge.medal} Medal</Text>
            {renderMedalImage()}
            <Text>Earned on: {props.badge.updated_at.slice(0, 10)}</Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    badge: {
        resizeMode: "contain",
        height: 100,
        width: 100,
        alignSelf: "center"
    }
});

export default BadgeCard;
