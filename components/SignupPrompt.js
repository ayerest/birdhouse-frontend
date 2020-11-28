import React from 'react';
import {
  View, ScrollView, Text, StyleSheet, Button, TextInput, ActivityIndicator,
} from 'react-native';
import ImageSelector from './ImageSelector';
import Colors from '../constants/Colors';

// TODO: refactor stylesheet and move to another file

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
    alignSelf: 'center',
  },
});

const SignupPrompt = (props) => (
  <ScrollView>
    <View style={styles.screen}>
      {/* need to change to select an image and make sure a default image can be chosen */}
      <ImageSelector onImageSelected={props.imageSelectedHandler} />
    </View>
    <View style={styles.screen}>
      <Text style={styles.label}>Username</Text>
      <TextInput
        autoCapitalize="none"
        accessibilityRole="text"
        style={styles.input}
        id="username"
        label="username"
        value={props.username}
        keyboardType="default"
        required
        defaultValue="Enter username"
        autoCompleteType="off"
        errorText="Please enter a username."
        onChangeText={(text) => props.setUsername(text)}
        initialValue=""
      />
    </View>
    <View style={styles.screen}>
      <Text style={styles.label}>Password</Text>
      <TextInput
        style={styles.input}
        id="password"
        autoCompleteType="off"
        label="password"
        keyboardType="default"
        secureTextEntry
        required
        autoCapitalize="none"
        accessibilityRole="text"
        minLength={3}
        errorText="Please enter a valid password."
        onChangeText={(text) => {
          props.setPassword(text);
        }}
        initialValue=""
      />
    </View>
    {props.isLoading ? <ActivityIndicator size="large" color={Colors.linkColor} />
      : (
        <View>
          <Button title="Sign Up" onPress={props.signupHandler} />
          <Button
            title="Already have an account?"
            onPress={() => {
              props.setSignup(false);
              props.setLogin(true);
            }}
          />
        </View>
      )}
  </ScrollView>
);

export default SignupPrompt;
