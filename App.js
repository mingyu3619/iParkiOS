import 'react-native-gesture-handler';
import React, {Component} from 'react';
import {StyleSheet, Button, Alert} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
// 네비게이션 구조 & 상태 관리 (모든 네비게이션 구조는 이 태크 아래 들어가야한다.)
import {createStackNavigator} from '@react-navigation/stack'; //
import HomeScreen from './src/home';
import UserScreen from './src/user';
//import LoginButton from './src/loginButton';
import LogoTitle from './src/logo';
import LoginScreen from './src/login';
import AdminScreen from './src/admin';
// import QrCodeScanner from './src/QRCodeScanner';

const Stack = createStackNavigator();
// Screen이라는 프로퍼티를 리턴할때 스크린 컴포넌트를 명시해주는데 네비게이션 props을 각각의 스크린 컴포넌트에 넘겨주게 된다.
// 따라서 this.props.navigation을 사용가능하게 해준다.

// 스크린에서 스크린으로 데이터를 보내는 것 : 파라미터를 루트로 패싱한다.
const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="Login"
        screenOptions={{
          headerStyle: {
            backgroundColor: '#A33B39',
          },
          headerTintColor: 'white',
          headerTitleStyle: {
            fontWeight: 'bold',
            color: 'white',
          },
        }}>
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="admin" component={AdminScreen} />
        {/* <Stack.Screen name="QrCode" component={QrCodeScanner} /> */}
        <Stack.Screen
          name="Home"
          component={HomeScreen}
          options={{
            title: 'Home',
            headerTitle: <LogoTitle />,
            headerRight: () => (
              <Button
                title="QR"
                onPress={() => Alert('QR Code Checked...!')}
                color="white"
              />
            ),
          }}
        />
        <Stack.Screen
          name="User"
          component={UserScreen}
          initialParams={{
            userIdx: 50,
            userName: 'Jay',
            userLastName: 'Lee',
          }}
          options={{title: 'User'}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

// const styles = StyleSheet.create({
//   mainView: {
//     backgroundColor: 'pink',
//     height: '100%',
//     alignItems: 'center',
//   },
//   titleView: {
//     paddingTop: '50%',
//   },
// });

export default App;
