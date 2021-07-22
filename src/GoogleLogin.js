/* eslint-disable no-shadow */
/* eslint-disable no-catch-shadow */
import 'react-native-gesture-handler';
import React, {useEffect, useState, Component, Fragment} from 'react';
//import { createStackNavigator } from 'react-navigation';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button,
  unstable_enableLogBox,
  Alert,
  TouchableHighlightBase,
  TouchableOpacity
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
} from 'react-native/Libraries/NewAppScreen';
import HomeScreen from './home';
import {
  GoogleSignin,
  GoogleSigninButton,
  statusCodes,
} from '@react-native-community/google-signin';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';

const SnsGoogleLogin = () => {
  const WEB_CLIENT_ID ='948413181622-md1rtcisch7fbo7423gveaa5rrr6dag8.apps.googleusercontent.com'; //로그인 안도면 한번 보기
  //"948413181622-33plq5for4rkds86utafp7av9sf4848c.apps.googleusercontent.com";
  //"948413181622-fuaso7trouk8t1qs3239oc7diqgs6h1o.apps.googleusercontent.com";
  const [userInfo, setUserInfo] = useState(null);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [error, setError] = useState(null);
  const navigation = useNavigation(); //이거 있어야 부모 컴포넌트한테 navigation 할 수 있댔음
  useEffect(() => {
    configureGoogleSign();
  }, []);

  function configureGoogleSign() {
    //로그인할때 초기화 하는 부분인듯
    GoogleSignin.configure({
      webClientId: WEB_CLIENT_ID,
      iosClientId:
        '948413181622-86e8aoemlu6t8trlmcpk6mjnib0rehao.apps.googleusercontent.com',
      offlineAccess: false,
    });
  }
  async function signIn() {
    //로그인 함수
    try {
      await GoogleSignin.hasPlayServices();
      const userInfo = await GoogleSignin.signIn();
      setUserInfo(userInfo);
      setError(null);
      setIsLoggedIn(true);
      console.log(userInfo);
      console.log(isLoggedIn);
      console.log(error);
      console.log(userInfo.user); // userInfo 이용해서 정보 사용해야함

      await AsyncStorage.setItem('Email', userInfo.user.email);
      await AsyncStorage.setItem('Photo', userInfo.user.photo);
      //await AsyncStorage.setItem('PhotoURL', userInfo.user.photoURL);

      userInfo.user.email.split('@')[1] == 'korea.ac.kr'
        ? navigation.reset({
            routes: [
              {
                name: 'Home',
                /*, params: {
        email: userInfo.user.email,
        photo: userInfo.user.photo,
        photoURL: userInfo.user.photoURL
      }*/
              },
            ],
          })
        : Alert.alert(
            '로그아웃 후,학교 이메일로 재로그인하세요!(포털id@korea.ac.kr)',
          ); // korea.ac.kr 꼴만 출입가능

      //밑에는 로그인 실패시 오류 메시지
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_CANCELLED) {
        // when user cancels sign in process,
        Alert.alert('Process Cancelled');
      } else if (error.code === statusCodes.IN_PROGRESS) {
        // when in progress already
        Alert.alert('Process in progress');
      } else if (error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
        // when play services not available
        Alert.alert('Play services are not available');
      } else {
        // some other error
        Alert.alert('Something else went wrong... ', error.toString());
        setError(error);
      }
    }
  }

  async function signOut() {
    //로그아웃
    try {
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      setIsLoggedIn(false);
      Alert.alert('Logout success');
    } catch (error) {
      Alert.alert('Something else went wrong... ', error.toString());
    }
  }

  async function getCurrentUserInfo() {
    //현재 유저 정보 가져오는 함수,일단은 안씀
    try {
      const userInfo = await GoogleSignin.signInSilently();
      setUserInfo(userInfo);
    } catch (error) {
      if (error.code === statusCodes.SIGN_IN_REQUIRED) {
        // when user hasn't signed in yet
        Alert.alert('Please Sign in');
        setIsLoggedIn(false);
      } else {
        Alert.alert('Something else went wrong... ', error.toString());
        setIsLoggedIn(false);
      }
    }
  }
  return (
    <View>
      <GoogleSigninButton        
        size={GoogleSigninButton.Size.Wide}
        color={GoogleSigninButton.Color.Light}
        onPress={() => signIn()} //구글 로그인 버튼 누르면 signIn 함수 실행하고 UserInfo를 Home화면으로  보내야 함
      />
      {/* <Button      
      
      title="Logout" onPress={() => signOut()}>
         <Text style={{color: 'red'}}>Logout</Text>
      </Button> */}
      <TouchableOpacity
          style={styles.button}
          onPress={() => signOut()}
        >
          <Text style={styles.text}>Logout</Text>
        </TouchableOpacity>
   
          <TouchableOpacity
          style={styles.button}
          onPress={() => navigation.navigate('admin')}
        >
          <Text style={styles.text}>Admin Login</Text>
        </TouchableOpacity>
        
    </View>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    paddingHorizontal: 10
  },
  button: {
    alignItems: "center",
    backgroundColor: "white",
    padding: 8,
    marginBottom:4,
    marginHorizontal:5,
    borderRadius:2,
    height:37,  
    elevation:5
  
  },
  countContainer: {
    alignItems: "center",
    padding: 10
  },
  text:{
  color:"#787878",
  fontWeight:"700"
  }
  
});

export default SnsGoogleLogin;
