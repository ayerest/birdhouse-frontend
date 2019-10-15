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

    const dispatch = useDispatch();
    
    useEffect(() => {
        const loadMyBirdCount = async () => {
            dispatch(birdsActions.getMyBirds());                
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
            <Text>
                My Bird Count: {!!myBirds ? myBirds.length : null}
            </Text>
            <Button title={showMyBirds} onPress={handleShowMyBirds}/>
            {/* {showMyBirds && (props.myBirds && props.myBirds.length > 0) ? <BirdsList birdList={myBirds} /> : <Text>You have not seen any birds yet!</Text>} */}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {

    }
})

export default BirdCount;