import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, ActivityIndicator, } from 'react-native';
import { useSelector, useDispatch } from 'react-redux';
import * as birdsActions from '../store/actions/birds'
import Colors from '../constants/Colors';

const BirdCount = (props) => {

    const [isLoading, setIsLoading] = useState(false);
    const dispatch = useDispatch();
    
    useEffect(() => {
        const loadMyBirdCount = async () => {
            setIsLoading(true);
            await dispatch(birdsActions.getMyBirds());  
            setIsLoading(false);
        }
        loadMyBirdCount();
    }, [dispatch]);

    const myBirds = useSelector(state => {
        return state.birds.myBirds;
    })
    
    const handleShowMyBirds = () => {
        props.onShowBirds("mine");
    }

    return (
        <View>
            {isLoading ? <ActivityIndicator size="large" color={Colors.linkColor} /> :
                <View style={styles.row}>
                        <Button onPress={handleShowMyBirds} title="My Birds"/>
                        <Text style={styles.label}>Count: {myBirds.length}</Text>
                </View>
            }
        </View>
    )
}

const styles = StyleSheet.create({
    row: {
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    label: {
        fontFamily: 'Roboto-Condensed',
        fontSize: 16
    }
})

export default BirdCount;