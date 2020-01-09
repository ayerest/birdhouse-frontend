import React from 'react';
import { Text, StyleSheet, Image, Dimensions } from 'react-native';
import Card from './Card';
import moment from 'moment';

const EntryCard = props => {
    const { fieldentry, notes } = props;
    const entryDate = moment(fieldentry.date).format('MMMM Do YYYY, h:mm:ss a');
  
    return (
        <Card style={styles.entry}>
            <Text style={styles.label}>{entryDate}</Text>
            {!!fieldentry.bird ? 
            <Text style={styles.label}>{fieldentry.bird.common_name}</Text> : null
            }
            {fieldentry.images.length > 0 ?
                <Image style={styles.picture} source={{ uri: fieldentry.images[0].img_url }}></Image> : <Image style={styles.picture} source={require('../assets/images/birdicon.png')}></Image>
            }
            <Text style={styles.label}>{notes}</Text>
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
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginRight: 10,
        alignSelf: "center",
        fontFamily: 'Roboto-Condensed',
    }
});

export default EntryCard;
