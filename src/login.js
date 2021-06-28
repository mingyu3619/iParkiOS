import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Alert} from 'react-native';
import SnsGoogleLogin from './GoogleLogin';
const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState('');

  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>IPARK QRCheckIn</Text>
      <Text style={styles.text}>교내 이메일로 로그인해주세요</Text>
      <Text style={styles.text}>Please sign in using korea univ email</Text>
      <View style={styles.buttonContainer}>
        <SnsGoogleLogin />
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
  text: {
    color: 'white',
    fontSize: 16,
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
    margin: 30,
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
