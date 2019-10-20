import React from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
// import { FlatList } from 'react-native-gesture-handler';
import uuid from 'uuid';
import Card from '../components/Card';
// import { ScrollView } from 'react-native-gesture-handler';

const FieldEntryDetailsScreen = props => {


    const renderFieldEntryImage = (image) => {
        return (<View>
      
            <Image style={styles.image} source={{uri: image.item.img_url}}/>
        </View>)
    }

    return (
        <ScrollView>
            <Card>
                <View style={styles.screen}>
                    <Text>{props.navigation.state.params.entryName}</Text>
                    {props.navigation.state.params.entry.images.length > 0 ? 
                        <FlatList keyExtractor={(item, index) => uuid()} data={props.navigation.state.params.entry.images} renderItem={renderFieldEntryImage} numColumns={1} /> : null
                    }
                    <Text>{props.navigation.state.params.entry.notes}</Text>
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
        marginTop: 20
    }
})

export default FieldEntryDetailsScreen;