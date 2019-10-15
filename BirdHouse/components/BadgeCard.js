import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import Card from './Card'

const BadgeCard = props => {
    console.log(props.badge, "in the badge card")
    let image = "../assets/images/" + props.badge.medal + "-medal.png"
    console.log(image)
    return (
        <Card>
            <Text>{props.badge.category}</Text>
            {/* <Image style={styles.badge} source={require({image})}/> */}
        </Card>
    );
};

const styles = StyleSheet.create({
    badge: {
        width: 200,
        height: 200
    }
});

export default BadgeCard;
