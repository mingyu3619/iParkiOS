import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput} from 'react-native';

const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState(null);
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState('');

  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>How Many</Text>
      <Text>Hello Please Login First....!</Text>
      <TextInput
        style={styles.input}
        value={userEmail}
        onChangeText={userEmail => setUserEmail(userEmail)}
        placeholder="Email"
        autoCapitalize="none"
        keyboardType={'email-address'}
      />
      <TextInput
        style={styles.input}
        value={userPassword}
        onChangeText={userPassword => setUserPassword(userPassword)}
        placeholder="Password"
        secureTextEntry="True"
      />
      <View style={styles.buttonContainer}>
        <Button
          color="white"
          title="Login"
          style={styles.LoginButton}
          onPress={() => navigation.navigate('Home')}
        />
        <Button
          color="white"
          title="Admin Login"
          style={styles.LoginButton}
          onPress={() => navigation.navigate('admin')}
        />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  mainView: {
    flex: 1,
    backgroundColor: '#A33B39',
    alignItems: 'center',
    justifyContent: 'center',
  },
  title: {
    fontSize: 50,
    fontWeight: 'bold',
    color: 'white',
    marginBottom: 50,
    marginTop: -100,
  },
  input: {
    backgroundColor: '#e8e8e8',
    fontSize: 20,
    width: '80%',
    marginVertical: 8,
    padding: 15,
    color: '#A33B39',
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'space-between',
  },
  LoginButton: {
    backgroundColor: 'white',
    borderRadius: 8,
    width: 300,
    height: 40,
    marginTop: 10,
  },
});

export default LoginScreen;
