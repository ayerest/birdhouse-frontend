import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Card from './Card'

const BirdCard = props => {
    console.log(props)
    return (
        <Card>
            <Text>{props.common_name}</Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    bird: {

    }
});

export default BirdCard;
