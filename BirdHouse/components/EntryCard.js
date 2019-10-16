import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import Card from './Card'

const EntryCard = props => {
    return (
        <Card>
            <Text>{props.fieldentry.date.slice(0, 10)}</Text>
            {props.fieldentry.birds.length > 0 ? 
            <Text>{props.fieldentry.birds.map(bird => bird.common_name).join(", ")}</Text> : null
            }
            <Text>{props.notes}</Text>
            { props.fieldentry.images.length > 0 ?
            <Image source={{uri: props.fieldentry.images[0].img_url}}></Image> : null
            }
        </Card>
    );
};

const styles = StyleSheet.create({
    entry: {

    }
});

export default EntryCard;
