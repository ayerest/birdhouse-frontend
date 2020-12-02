import React from 'react';
import { View, StyleSheet, Button } from 'react-native';

// TODO: refactor setLogin / setSignup since the values change together

const styles = StyleSheet.create({
  screen: {
    flex: 1,
  },
});

const SignupLoginPrompt = (props) => (
  <View style={styles.screen}>
    <Button
      title="Create an account"
      onPress={() => {
        props.setLogin(false);
        props.setSignup(true);
      }}
    />
    <Button
      title="Already have an account?"
      onPress={() => {
        props.setLogin(true);
        props.setSignup(false);
      }}
    />
  </View>
);

export default SignupLoginPrompt;
