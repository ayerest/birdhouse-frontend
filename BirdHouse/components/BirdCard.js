import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Card from './Card'

const BirdCard = props => {
    return (
        <Card>
            <Text>Basic bird info goes here</Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    bird: {

    }
});

export default BirdCard;
