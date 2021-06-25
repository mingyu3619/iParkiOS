'use strict';

import React, {Component} from 'react';
import QRCode from 'react-native-qrcode-generator';

import {
  AppRegistry,
  StyleSheet,
  View,
  TextInput,
  Button,
  Alert,
  Text,
} from 'react-native';

class QRCodeGenerator extends Component {
  state = {
    text: JSON.stringify(this.props.route.params.user.user), //가끔 큐알 코드 만들떄 팅기기도 함...;;
  };

  render() {
    return (
      <View style={styles.container}>
        <Text>{this.state.text}</Text>
        <QRCode
          value={this.state.text}
          size={200}
          bgColor="black"
          fgColor="white"
        />
      </View>
    );
  }
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
