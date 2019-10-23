import React, {useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView } from 'react-native';
import uuid from 'uuid';
import Card from '../components/Card';
import { NavigationEvents } from 'react-navigation';
import { useSelector, useDispatch } from 'react-redux';
import * as factoidActions from '../store/actions/factoids'



const BadgeDetailsScreen = props => {

    const dispatch = useDispatch();
    

    useEffect(() => {
        getRandomFact();
    }, [dispatch])

    const fact = useSelector(state => {
        return state.factoids.fact
    })

    const getRandomFact = async () => {
        await dispatch(factoidActions.getFact())
    }

    return (
        <ScrollView>
            {/* <NavigationEvents
                onWillFocus={getRandomFact()}
            /> */}
            <Card>
                <View style={styles.screen}>
                    <Text>Bonus Bird Fact</Text>
                    {fact ? <Text>{fact.fact}</Text> : null}
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