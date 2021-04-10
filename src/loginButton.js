/* eslint-disable react-native/no-inline-styles */
/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {View, StyleSheet, Button} from 'react-native';

const loginButton = () => {
  return (
    <View style={styles.loginButton}>
      <Button title="Login" onPress={() => alert('Login Success!!!!')} />
    </View>
  );
};

const styles = StyleSheet.create({
  loginButton: {
    backgroundColor: '#990000',
    color: 'white',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: '50%',
    padding: 5,
    width: '30%',
  },
});

export default loginButton;
