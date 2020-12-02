import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

// TODO: refactor stylesheet and move to another file
// TODO: not currently using this component...need to switch out in other files
const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

const Input = (props) => <TextInput {...props} style={{ ...styles.input, ...props.style }} />;

export default Input;
