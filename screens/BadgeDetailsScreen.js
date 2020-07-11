import React, { useEffect } from 'react';
import { Text, StyleSheet, ScrollView } from 'react-native';
import Card from '../components/Card';
import { useSelector, useDispatch } from 'react-redux';
import * as factoidActions from '../store/actions/factoids'

const BadgeDetailsScreen = props => {

    const dispatch = useDispatch();
    
    useEffect(() => {
        let mounted = true;
        if (mounted) {
            const getRandomFact = async () => {
                await dispatch(factoidActions.getFact())
            }
            getRandomFact();
        }
        return () => mounted = false;
    }, [dispatch])

    const fact = useSelector(state => {
        return state.factoids.fact
    })

    return (
        <ScrollView>
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