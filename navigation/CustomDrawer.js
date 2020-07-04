// import React, { useEffect } from 'react';
// import { View, Text, StyleSheet, Image, SafeAreaView, Dimensions } from 'react-native';
// // import { useSelector, useDispatch } from 'react-redux';
// // import { DrawerItems } from 'react-navigation'
// import { DrawerItemList } from "@react-navigation/drawer";

// import { TouchableOpacity } from 'react-native-gesture-handler';
// import * as authActions from '../store/actions/auth';


// const CustomDrawer = props => {

//     return <View >
//         <SafeAreaView forceInset={{  top: 'always', horizontal: 'never', alignContent: 'flex-start', alignItems: 'flex-start' }}>
//             <Image style={{ height: 80, width: 80 }} source={require("../assets/images/birdhouse_logo_drawn.png")} />
//             <DrawerItemList {...props} user={props.user} style={{ flex: 1, width: '100%' }} />
//             <TouchableOpacity onPress={() => {
//                 dispatch(authActions.logout());
//                 {/* props.navigation.navigate("Auth") */}
//             }} >
//                 <View style={styles.button}>
//                     <Text style={styles.buttonText}>Logout</Text>
//                 </View>
//             </TouchableOpacity>
//         </SafeAreaView>
//     </View>
// }

// const styles = StyleSheet.create({
//     screen: {
//         flex: 1,
//         justifyContent: 'center',
//         alignItems: 'center'
//     },
//     label: {
//         fontSize: 16,
//         marginBottom: 5,
//         marginRight: 10,
//         alignSelf: "center",
//         fontFamily: 'Roboto-Condensed',
//     },
//     button: {
//         padding: 10,
//     },
//     buttonText: {
//         fontFamily: 'Roboto-Condensed',
//         fontSize: Dimensions.get('window').width > 350 ? 20 : 18,
//         paddingLeft: 8,
//         opacity: 0.8 
//     }
// })

// export default CustomDrawer;