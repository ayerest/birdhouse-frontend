import React from 'react';
import { Text, StyleSheet, Image } from 'react-native';
import Card from './Card'

const EntryCard = props => {
  
    return (
        <Card style={styles.entry}>
            <Text>{props.fieldentry.date.slice(0, 10)}</Text>
            {!!props.fieldentry.bird ? 
            <Text>{props.fieldentry.bird.common_name}</Text> : null
            }
            { props.fieldentry.images.length > 0 ?
            <Image style={styles.picture}source={{uri: props.fieldentry.images[0].img_url}}></Image> : null
            }
            <Text>{props.notes}</Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    entry: {
        justifyContent: 'center',
        alignItems: 'center'
    },
    picture: {
        height: 100,
        width: 100,
        borderRadius: 15
    }
});

export default EntryCard;
