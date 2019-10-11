import React from 'react';
import { Text, StyleSheet } from 'react-native';
import Card from './Card'

const BadgeCard = props => {
    return (
        <Card>
            <Text>Badge goes here</Text>
        </Card>
    );
};

const styles = StyleSheet.create({
    badge: {
        
    }
});

export default BadgeCard;
