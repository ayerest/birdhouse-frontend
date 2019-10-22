import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import uuid from 'uuid';
import Card from '../components/Card';
// import { ScrollView } from 'react-native-gesture-handler';

const BadgeDetailsScreen = props => {

    return (
        <ScrollView>
            <Card>
                <View style={styles.screen}>
                    {/* <Text>{props.navigation.state.params.entryName.slice(0, 10)}</Text>
                    <Text>{props.navigation.state.params.entry.bird.common_name}</Text>
                    <Text>{props.navigation.state.params.entry.notes}</Text> */}
                </View>
            </Card>
        </ScrollView>
    )
}

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    image: {
        height: 250,
        width: 250,
        marginTop: 5,
        borderRadius: 15
    }
})

export default BadgeDetailsScreen;