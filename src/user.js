import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {View, Text, Button} from 'react-native';

class UserScreen extends Component {
  headerStyle = () => {
    this.props.navigation.setOptions({
      title: 'User',
      headerTintColor: 'white',
      headerTintStyle: {
        fontWeight: 'bold',
        color: 'white',
      },
      headerBackTitle: 'Home',
    });
  };

  render() {
    this.headerStyle();
    const {params} = this.props.route; //루트값 할당
    const userIdx = params ? params.userIdx : null;
    const userName = params ? params.userName : null;
    const userLastName = params ? params.userLastName : null;
    return (
      <View
        // eslint-disable-next-line react-native/no-inline-styles
        style={{
          flex: 1,
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text>User Screen</Text>
        <Button
          title="To Home Screen"
          onPress={() => {
            this.props.navigation.navigate('Home');
          }}
        />

        <Text>User Idx : {JSON.stringify(userIdx)}</Text>
        <Text>User Name : {JSON.stringify(userName)}</Text>
        <Text>User Last Name : {JSON.stringify(userLastName)}</Text>
      </View>
    );
  }
}

export default UserScreen;
