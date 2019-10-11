import React, {useState, useEffect} from 'react';
import {ScrollView, Platform, View, Text, KeyboardAvoidingView, ActivityIndicator, StyleSheet, Button, TextInput, Alert} from 'react-native';
import Card from '../components/Card'
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/auth'

import { HeaderButtons, Item } from 'react-navigation-header-buttons'
import MenuButton from '../components/MenuButton'
import Colors from '../constants/Colors'

import MainViewScreen from './MainViewScreen';


const AuthScreen = (props) => {
    const dispatch = useDispatch();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState(false);
    const [login, setLogin] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(()=>{
        if (error) {
            Alert.alert('An error occured!', error, [{text: "Okay"}])
        }
    }, [error]);
    
    const signupHandler = async () => {
        setError(null)
        setIsLoading(true);
        try {
            await dispatch(authActions.signup(username, password, avatar))
            setAvatar(false)
            setIsLoading(false);
            props.navigation.navigate('Menu');
        } catch (err) {
            setError(err.message)
            setAvatar(false)
            setIsLoading(false);
        }
    }
    return (
        <KeyboardAvoidingView behavior="padding" 
        keyboardVerticalOffset={50}
        style={styles.screen}>
            <Card style={styles.authContainer}>
                {!login ? 
                    <ScrollView>
                        <View style={styles.screen}>
                            <Text style={styles.label}>Username</Text>
                            <TextInput  autoCapitalize="none" style={styles.input} id="username" label="username" value={username} keyboardType="default" required defaultValue="Enter username" autoCompleteType="off" errorText="Please enter a username." onChangeText={text => setUsername(text)}
                                initialValue="" />
                        </View>
                        <View style={styles.screen}>
                            <Text style={styles.label}>Password</Text>
                            <TextInput style={styles.input} id="password" autoCompleteType="off" label="password" keyboardType="default" secureTextEntry required autoCapitalize="none"
                                minLength={3}
                                 errorText="Please enter a valid password." onChangeText={text => {
                                     setPassword(text)
                                 }}
                                initialValue="" />
                        </View>
                        <View style={styles.screen}>
                            <Text style={styles.label}>Avatar</Text>
                            {/* need to change to select an image and make sure a default image can be chosen */}
                            <TextInput style={styles.input} id="avatar" label="avatar" keyboardType="default" autoCapitalize="none"
                                onChangeText={text => setAvatar(text)}
                                initialValue="" />
                        </View>
                        {isLoading ? <ActivityIndicator /> : 
                        <View>
                        <Button title="Sign Up" color="gray" onPress={signupHandler} />
                        <Button title="Already have an account?" color="gray" onPress={() => setLogin(true)} />
                        </View>
                        }
                    </ScrollView>
                : 
                <ScrollView>
                    <View style={styles.screen}>
                        <Text style={styles.label}>Username</Text>
                            <TextInput style={styles.input} id="username" label="username" value={username} keyboardType="default" required errorText="Please enter a username." autoCompleteType="off" autoCapitalize="none" onChangeText={text => setUsername(text)}
                        initialValue="" />
                    </View>
                    <View style={styles.screen}>
                        <Text style={styles.label}>Password</Text>
                            <TextInput style={styles.input} id="password" label="password" autoCapitalize="none" keyboardType="default" autoCompleteType="off" secureTextEntry required
                        minLength={3}
                         errorText="Please enter a  valid password." onChangeText={text => setPassword(text)}
                            initialValue="" />
                    </View>
                    {isLoading ? <ActivityIndicator /> :
                        <View>
                        <Button title="Login" color="gray" onPress={signupHandler}/>
                        <Button title="Create an account" color="gray" onPress={() => setLogin(false)}/>
                        </View>
                    }
                </ScrollView>
                }
            </Card>
        </KeyboardAvoidingView>
    )
}

AuthScreen.navigationOptions = navData => {
    return {
        headerTitle: "BirdHouse",
        headerStyle: {
            backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
            color: "black"
        },
        // headerLeft: <HeaderButtons HeaderButtonComponent={MenuButton}>
        //   <Item title="Menu" iconName={Platform.OS === "ios" ? "ios-menu" : "md-menu"}
        //     onPress={() => { navData.navigation.toggleDrawer() }} />
        // </HeaderButtons>
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
        flexDirection: "column",
        justifyContent: 'center',
    },
    input: {
        width: 300,
        backgroundColor: "ghostwhite",
        padding: 10
    },
    authContainer: {
    },
    label: {
        paddingTop: 10,
        textAlign: 'center'
    }
});

export default AuthScreen;