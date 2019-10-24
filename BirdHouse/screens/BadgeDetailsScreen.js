import React, {useEffect} from 'react';
import { View, Text, StyleSheet, FlatList, Image, ScrollView, Dimensions } from 'react-native';
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
            <Card style={styles.screen}>
                    <Text style={styles.label}>Bonus Bird Fact</Text>
                    {fact ? <Text style={styles.label}>{fact.fact}</Text> : null}
            </Card>
        </ScrollView>
    )
}




const styles = StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: 'thistle'
        // height: Dimensions.get('window').height * 0.3
    },
    image: {
        height: 250,
        width: 250,
        marginTop: 5,
        borderRadius: 15
    },
    label: {
        fontSize: 16,
        marginBottom: 5,
        marginRight: 10,
        alignSelf: "center",
        fontFamily: 'Roboto-Condensed',
    }
})

export default BadgeDetailsScreen;