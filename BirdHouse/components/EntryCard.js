import React from 'react';
import { Text, StyleSheet, Image, Dimensions } from 'react-native';
import Card from './Card'

const EntryCard = props => {
    console.log(props.fieldentry)
    console.log("------------------------")
  
    return (
        <Card style={styles.entry}>
            <Text>{props.fieldentry.date.slice(0, 10)}</Text>
            {!!props.fieldentry.bird ? 
            <Text>{props.fieldentry.bird.common_name}</Text> : null
            }
            { props.fieldentry.images.length > 0 ?
                <Image style={styles.picture} source={{ uri: props.fieldentry.images[0].img_url }}></Image> : <Image style={styles.picture} source={require('../assets/images/birdicon.png')}></Image>
            }
            <Text>{props.notes}</Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    entry: {
        justifyContent: 'center',
        alignItems: 'center',
        width: Dimensions.get('window').width * 0.9,
        height: Dimensions.get('window').height * 0.4
    },
    picture: {
        flex: 1,
        height: '100%',
        width: '70%',
        borderRadius: 15,
        resizeMode: 'cover'
    }
});

export default EntryCard;
