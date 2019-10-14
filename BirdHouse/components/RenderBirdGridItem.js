// import React from 'react';
// // import { View, Text, Button, StyleSheet, FlatList, TouchableOpacity, ActivityIndicator, Platform } from 'react-native';
// import Colors from '../constants/Colors';
// // import { useSelector } from 'react-redux';
// // import uuid from 'uuid';
// import BirdCard from './BirdCard';

// const renderBirdGridItem = (bird) => {

//     return (


//         <BirdCard bird={bird} key={bird.item.id.toString()} common_name={bird.item.common_name} scientific_name={bird.item.species_name} onPress={() => {
//             props.navigation.navigate({
//                 routeName: 'BirdDetails', params: {
//                     birdName: bird.item.common_name,
//                     birdId: bird.item.id.toString(),
//                     bird: bird
//                 }
//             })
//         }} />

//     )
// }

// export default renderBirdGridItem;