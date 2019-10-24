import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
// import uuid from 'uuid';
// import renderBirdGridItem from './RenderBirdGridItem';
import * as birdsActions from '../store/actions/birds'
import BirdsList from './BirdsList';

const BirdCount = (props) => {

    const [showMyBirds, setShowMyBirds] = useState(false);
    const [isLoading, setIsLoading] = useState(false)
    const dispatch = useDispatch();
    
    useEffect(() => {
        const loadMyBirdCount = async () => {
            setIsLoading(true)
            await dispatch(birdsActions.getMyBirds());  
            setIsLoading(false)          
        }
        loadMyBirdCount();
    }, [dispatch]);

    const myBirds = useSelector(state => {
        return state.birds.myBirds
    })
    

    const handleShowMyBirds = () => {
            setShowMyBirds(true)
            props.onShowBirds("mine")
    }

    return (
        <View>
            {isLoading ? <ActivityIndicator color="blue" /> :
                <View style={styles.row}>
                    {/* <TouchableOpacity onPress={handleShowMyBirds}> */}

                        <Button onPress={handleShowMyBirds} title="My Birds"/>
                        <Text style={styles.label}>Count: {myBirds.length}</Text>
                    {/* </TouchableOpacity> */}
                    {/* <Button title={showMyBirds} onPress={handleShowMyBirds}/> */}
                </View>
            }
            {/* {showMyBirds && (props.myBirds && props.myBirds.length > 0) ? <BirdsList birdList={myBirds} /> : <Text>You have not seen any birds yet!</Text>} */}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {

    }, 
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