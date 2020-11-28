import React from 'react';
import { View, ScrollView, Text, StyleSheet, Button, TextInput, ActivityIndicator } from 'react-native';
import Colors from '../constants/Colors';

// TODO: refactor stylesheet and move to another file
// TODO: use custom input component instead of textinput
// TODO: remove ternary statements from jsx

const LoginPrompt = props => {
  return (
    <ScrollView>
      <View style={styles.screen}>
        <Text style={styles.label}>Username</Text>
        <TextInput style={styles.input} id="username" label="username" value={props.username} keyboardType="default" required errorText="Please enter a username." autoCompleteType="off" accessibilityRole="text" autoCapitalize="none" onChangeText={text => props.setUsername(text)}
          initialValue="" />
      </View>
      <View style={styles.screen}>
        <Text style={styles.label}>Password</Text>
        <TextInput style={styles.input} id="password" label="password" autoCapitalize="none" keyboardType="default" autoCompleteType="off" secureTextEntry required accessibilityRole="text"
          minLength={3}
          errorText="Please enter a  valid password." onChangeText={text => props.setPassword(text)}
          initialValue="" />
      </View>
      {props.isLoading ? <ActivityIndicator size="large" color={Colors.linkColor} /> :
        <View>
          <Button title="Login" onPress={props.loginHandler} />
          <Button title="Create a new account?" onPress={() => {
            props.setSignup(true);
            props.setLogin(false);
          }} />
        </View>
      }
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
  label: {
    paddingTop: 10,
    textAlign: 'center',
    fontFamily: 'Roboto-Condensed',
    fontSize: 18,
  },
  input: {
    width: '90%',
    backgroundColor: Colors.myColor,
    padding: 10,
    alignSelf: 'center'
  },
});

export default LoginPrompt;