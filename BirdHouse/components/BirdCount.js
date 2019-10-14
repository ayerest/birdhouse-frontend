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
        // setShowMyBirds(true)
        props.onShowBirds("mine")
    }

    return (
        <View>
            <Text>
                Bird Count: {!!myBirds ? myBirds.length : null}
            </Text>
            <Button title="Show My Birds" onPress={handleShowMyBirds}/>
            {/* {showMyBirds && (props.myBirds && props.myBirds.length > 0) ? <BirdsList birdList={myBirds} /> : <Text>You have not seen any birds yet!</Text>} */}
        </View>
    )
}

const styles = StyleSheet.create({
    button: {

    }
})

export default BirdCount;