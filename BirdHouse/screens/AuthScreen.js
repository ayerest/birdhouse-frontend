import React, {useState} from 'react';
import {ScrollView, View, Text, KeyboardAvoidingView, StyleSheet, Button, TextInput} from 'react-native';
import Card from '../components/Card'
import {useDispatch} from 'react-redux'
import * as authActions from '../store/actions/auth'


const AuthScreen = (props) => {
    const dispatch = useDispatch();
    
    const [username, setUsername] = useState("")
    const [password, setPassword] = useState("")
    const [avatar, setAvatar] = useState(false)
    const [login, setLogin] = useState(false)
    
    const signupHandler = () => {
            dispatch(authActions.signup(username, password, avatar))
            setAvatar(false)
    }
    return (
        <KeyboardAvoidingView behavior="padding" 
        keyboardVerticalOffset={50}
        style={styles.screen}>
            <Card style={styles.authContainer}>
                {!login ? 
                    <ScrollView>
                        <View style={styles.screen}>
                            <Text>Username</Text>
                            <TextInput  autoCapitalize="none" style={styles.input} id="username" label="username" value={username} keyboardType="default" required defaultValue="Enter username" autoCompleteType="off" errorText="Please enter a username." onChangeText={text => setUsername(text)}
                                initialValue="" />
                        </View>
                        <View style={styles.screen}>
                            <Text>Password</Text>
                            <TextInput style={styles.input} id="password" autoCompleteType="off" label="password" keyboardType="default" secureTextEntry required autoCapitalize="none"
                                minLength={3}
                                 errorText="Please enter a valid password." onChangeText={text => {
                                     setPassword(text)
                                 }}
                                initialValue="" />
                        </View>
                        <View style={styles.screen}>
                            <Text>Avatar</Text>
                            {/* need to change to select an image and make sure a default image can be chosen */}
                            <TextInput style={styles.input} id="avatar" label="avatar" keyboardType="default" autoCapitalize="none"
                                onChangeText={text => setAvatar(text)}
                                initialValue="" />
                        </View>
                        <Button title="Sign Up" color="gray" onPress={signupHandler} />
                        <Button title="Already have an account?" color="gray" onPress={() => setLogin(true)} />
                    </ScrollView>
                : 
                <ScrollView>
                    <View style={styles.screen}>
                        <Text>Username</Text>
                            <TextInput style={styles.input} id="username" label="username" value={username} keyboardType="default" required errorText="Please enter a username." autoCompleteType="off" autoCapitalize="none" onChangeText={text => setUsername(text)}
                        initialValue="" />
                    </View>
                    <View style={styles.screen}>
                        <Text>Password</Text>
                            <TextInput style={styles.input} id="password" label="password" autoCapitalize="none" keyboardType="default" autoCompleteType="off" secureTextEntry required
                        minLength={3}
                         errorText="Please enter a  valid password." onChangeText={text => setPassword(text)}
                            initialValue="" />
                    </View>
                    <Button title="Login" color="gray" onPress={signupHandler}/>
                    <Button title="Create an account" color="gray" onPress={() => setLogin(false)}/>
                </ScrollView>
                }
            </Card>
        </KeyboardAvoidingView>
    )
}

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
    authContainer: {}
});

export default AuthScreen;