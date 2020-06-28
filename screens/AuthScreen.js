import React, {useState, useEffect} from 'react';
import {ScrollView, Platform, View, Text, KeyboardAvoidingView,  Keyboard, TouchableWithoutFeedback, SafeAreaView, ActivityIndicator, StyleSheet, Button, TextInput, Alert, Image} from 'react-native';
import {useDispatch, useSelector} from 'react-redux';
import { createAccount, userLogin } from '../store/actions/auth';
import Colors from '../constants/Colors';
import ImageSelector from '../components/ImageSelector';

const AuthScreen = (props) => {
    const dispatch = useDispatch();
    
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [avatar, setAvatar] = useState('https://www.allaboutbirds.org/guide/assets/photo/63666541-480px.jpg');
    const [login, setLogin] = useState(false);
    const [signup, setSignup] = useState(false);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState();

    useEffect(()=>{
        if (error) {
            Alert.alert('An error occured!', error);
        }
    }, [error]);

    const imageSelectedHandler = (image) => {
        setAvatar(image);
    }

    const user = useSelector(state => {
        return state.user.user;
    })
    
    const signupHandler = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(createAccount(username, password, avatar))
            setAvatar(false)
            setIsLoading(false);
            props.navigation.navigate({
                name:'Main', params: {
                    user: user
                }
            });
        } catch (err) {
            setError(err.message);
            setAvatar(false);
            setIsLoading(false);
        }
    }

    const loginHandler = async () => {
        setError(null);
        setIsLoading(true);
        try {
            await dispatch(userLogin(username, password));
            setAvatar(false);
            setIsLoading(false);
            props.navigation.navigate({
              name: "Main",
              params: {
                user: user
              }
            });
        } catch (err) {
            setError(err.message);
            setAvatar(false);
            setIsLoading(false);
        }
    }

    return (
        
        <KeyboardAvoidingView behavior="padding" keyboardVerticalOffset={15} 
        style={styles.screen}>
            <SafeAreaView style={{flex: 1}}>

                <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
                    <View style={styles.inner}>
                        
                        <View style={styles.authContainer}>
                        
                            <Image style={styles.logo} source={require('../assets/images/birdhouse_logo_drawn.png')}></Image>

                        {!login && !signup ? 
                            <View style={styles.screen}>
                                <Button title="Create an account" onPress={() => {
                                    setLogin(false)
                                    setSignup(true)
                                    }}/>
                                <Button title="Already have an account?" onPress={() => {
                                    setLogin(true);
                                    setSignup(false);
                                    }} />
                            </View> : null
                        }
                        {!login && signup ? 
                                <ScrollView>
                                    <View style={styles.screen}>
                                        {/* need to change to select an image and make sure a default image can be chosen */}
                                        <ImageSelector onImageSelected={imageSelectedHandler} />
                                    </View>
                                    <View style={styles.screen}>
                                        <Text style={styles.label}>Username</Text>
                                        <TextInput autoCapitalize="none" accessibilityRole="text" style={styles.input} id="username" label="username" value={username} keyboardType="default" required defaultValue="Enter username" autoCompleteType="off" errorText="Please enter a username." onChangeText={text => setUsername(text)}
                                            initialValue="" />
                                    </View>
                                    <View style={styles.screen}>
                                        <Text style={styles.label}>Password</Text>
                                        <TextInput style={styles.input} id="password" autoCompleteType="off" label="password" keyboardType="default" secureTextEntry required autoCapitalize="none" accessibilityRole="text"
                                            minLength={3}
                                            errorText="Please enter a valid password." onChangeText={text => {
                                                setPassword(text)
                                            }}
                                            initialValue="" />
                                    </View>
                                    {isLoading ? <ActivityIndicator size="large" color={Colors.linkColor}/> :
                                        <View>
                                            <Button title="Sign Up" onPress={signupHandler} />
                                            <Button title="Already have an account?" onPress={() => {
                                                setSignup(false);
                                                setLogin(true);
                                                }} />
                                        </View>
                                    }
                                </ScrollView>
                        : null
                        }
                        {!signup && login ? 
                            <ScrollView>
                                <View style={styles.screen}>
                                    <Text style={styles.label}>Username</Text>
                                        <TextInput style={styles.input} id="username" label="username" value={username} keyboardType="default" required errorText="Please enter a username." autoCompleteType="off" accessibilityRole="text" autoCapitalize="none" onChangeText={text => setUsername(text)}
                                    initialValue="" />
                                </View>
                                <View style={styles.screen}>
                                    <Text style={styles.label}>Password</Text>
                                        <TextInput style={styles.input} id="password" label="password" autoCapitalize="none" keyboardType="default" autoCompleteType="off" secureTextEntry required accessibilityRole="text"
                                    minLength={3}
                                    errorText="Please enter a  valid password." onChangeText={text => setPassword(text)}
                                        initialValue="" />
                                </View>
                                {isLoading ? <ActivityIndicator size="large" color={Colors.linkColor} /> :
                                    <View>
                                    <Button title="Login" onPress={loginHandler}/>
                                    <Button title="Create a new account?" onPress={() => {
                                        setSignup(true);
                                        setLogin(false);
                                        }}/>
                                    </View>
                                }
                            </ScrollView> : null
                            }
                        </View>
                    </View>
                </TouchableWithoutFeedback>
            </SafeAreaView>
        </KeyboardAvoidingView>
    )
}

export const screenOptions = navData => {
    return {
        headerTitle: "BirdHouse",
        headerStyle: {
            backgroundColor: Platform.OS === "ios" ? Colors.myColor : "thistle",
            color: "black",
            fontFamily: 'Fred-Great',
            fontSize: 18,
        },
    }
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    },
    input: {
        width: '90%',
        backgroundColor: Colors.myColor,
        padding: 10,
        alignSelf: 'center'
    },
    authContainer: {
        backgroundColor: 'white',
        height: '95%'
    },
    label: {
        paddingTop: 10,
        textAlign: 'center',
        fontFamily: 'Roboto-Condensed',
        fontSize: 18,
    },
    logo: {
        alignSelf: "center",
        flex: 1,
        resizeMode: 'contain'
    },
    inner: {
        padding: 5,
        flex: 1,
        justifyContent: 'flex-end'
    },

});

export default AuthScreen;