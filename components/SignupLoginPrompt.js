import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

// TODO: refactor setLogin / setSignup so I don't have to send up both everytime since the values change together

const SignupLoginPrompt = props => {
    return (
        <View style={styles.screen}>
            <Button title="Create an account" onPress={() => {
                props.setLogin(false)
                props.setSignup(true)
            }} />
            <Button title="Already have an account?" onPress={() => {
                props.setLogin(true);
                props.setSignup(false);
            }} />
        </View>
    );
};

const styles = StyleSheet.create({
    screen: {
        flex: 1,
    }
});

export default SignupLoginPrompt;
