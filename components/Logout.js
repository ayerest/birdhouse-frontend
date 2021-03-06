import React from 'react';
import { Button, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import * as authActions from '../store/actions/auth';

// TODO: refactor stylesheet and move to another file

const Logout = (props) => {
  const dispatch = useDispatch();
  const currentUser = useSelector((state) => state.user);

  const logoutHandler = () => {
    dispatch(authActions.logout(currentUser));
  };
  return <Button title="Logout" onPress={logoutHandler} {...props} style={{ ...styles.input, ...props.style }} />;
};

const styles = StyleSheet.create({
  input: {
    height: 30,
    borderBottomColor: 'grey',
    borderBottomWidth: 1,
    marginVertical: 10,
  },
});

export default Logout;
