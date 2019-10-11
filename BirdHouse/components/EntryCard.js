import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Card from './Card'

const EntryCard = props => {
    return (
        <Card>
            <Text>Field Entry goes here</Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    entry: {

    }
});

export default EntryCard;
