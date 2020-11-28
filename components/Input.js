import React from 'react';
import { TextInput, StyleSheet } from 'react-native';

// TODO: refactor stylesheet and move to another file
// TODO: not currently using this component...need to switch out in other files

const Input = props => {
    return <TextInput {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
    input: {
        height: 30,
        borderBottomColor: 'grey',
        borderBottomWidth: 1,
        marginVertical: 10
    }
});

export default Input;
