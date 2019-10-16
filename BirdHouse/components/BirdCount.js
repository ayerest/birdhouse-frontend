import React, {useState, useEffect} from 'react';
import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
import Colors from '../constants/Colors';
import { useSelector, useDispatch } from 'react-redux';
// import uuid from 'uuid';
// import renderBirdGridItem from './RenderBirdGridItem';
import * as birdsActions from '../store/actions/birds'
import BirdsList from './BirdsList';

const BirdCount = (props) => {

    const [showMyBirds, setShowMyBirds] = useState("Show My Birds");
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
        if (showMyBirds === "Hide My Birds") {
            setShowMyBirds("Show My Birds")
            props.onShowBirds(false)
        } else {
            setShowMyBirds("Hide My Birds")
            props.onShowBirds("mine")
        }
    }

    return (
        <View>
            {isLoading ? <ActivityIndicator color="blue" /> :
                <View style={styles.row}>
                    <Text>
                        My Bird Count: {myBirds.length }
                    </Text>
                    <Button title={showMyBirds} onPress={handleShowMyBirds}/>
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
    }
})

export default BirdCount;