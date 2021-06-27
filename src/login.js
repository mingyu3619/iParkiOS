import React, {Component, useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Alert} from 'react-native';
import SnsGoogleLogin from "./GoogleLogin"

import AsyncStorage from '@react-native-async-storage/async-storage';
const LoginScreen = ({navigation}) => {
  const [userEmail, setUserEmail] = useState(null);
  const [userPassword, setUserPassword] = useState(null);
  //const [loading, setLoading] = useState(false);
  //const [error, setError] = useState('');
  useEffect(() => {
    logincheck();
  }, []);
  
  function logincheck(){
    AsyncStorage.getItem('isLogin').then((result)=>{
      if(result !== 'false') {
        navigation.reset({routes: [{name: "Home"}]})
      }
    })
    }
  return (
    <View style={styles.mainView}>
      <Text style={styles.title}>IPARK QRCheckIn</Text>
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
        secureTextEntry={true}
      />
      <View style={styles.buttonContainer}>
        <Button
          color="#000"
          title="Login"
          style={styles.LoginButton}
          onPress={() =>
            userEmail === 'user@user.com' && userPassword === '1234'
              ? navigation.reset({routes: [{name: "Home"}]})
              : Alert.alert('잘못된 입력입니다.')
          }
        />
        <Button
          color="#000"
          title="Admin Login"
          style={styles.LoginButton}
          onPress={() => navigation.navigate('admin')}
        />
        
    
      <SnsGoogleLogin/>
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
