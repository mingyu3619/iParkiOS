'use strict';

import React, {Component} from 'react';
//import QRCode from 'react-native-qrcode-generator';
import QRCode from 'react-native-qrcode-svg';
import {
  AppRegistry,
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  Image,
  Text  
} from 'react-native';

const QRCodeGenerator = ({route}) => {
 
  const userInfo = route.params;
  
    return (
      <View style={styles.container}>
        <Text>{userInfo.email}</Text>
        <Image style={{width:30 , height:30 }}  source={{uri:userInfo.photo}}  />
        <QRCode
          value={JSON.stringify(userInfo)}
          size={200}
          bgColor="black"
          fgColor="white"
        />
      </View>
    );
  
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'white',
    alignItems: 'center',
    justifyContent: 'center',
  },

  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    margin: 10,
    borderRadius: 5,
    padding: 5,
    color: 'black',
  },
});

export default QRCodeGenerator;
