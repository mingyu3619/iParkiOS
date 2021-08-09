import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';
import {
  SafeAreaView,
  View,
  Text,
  ScrollView,
  ActivityIndicator,
  Button,
  Alert,
  StatusBar,
  StyleSheet,
  Image,
  Dimensions
} from 'react-native';
import { baseProps } from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import { GoogleSignin } from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';
import Chart from './chart';
import ProgressCircle from 'react-native-progress-circle'

const HomeScreen = ({ route, navigation }) => {
  const API_URL = 'http://cxz3619.pythonanywhere.com/liveData';

  //const userInfo = route.params; //개인정보
  const [users, setUsers] = useState([]); //현재 몇명있는지 정보
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userEmail, setUserEmail] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  AsyncStorage.getItem('Email').then(Email => {
    setUserEmail(Email);
  });
  AsyncStorage.getItem('Photo').then(Photo => {
    setUserPhoto(Photo);
  });

  useEffect(() => {
    try {
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          setUsers(data);
          setLoading(false);
          AsyncStorage.setItem('isLogin', 'true');
          //AsyncStorage.setItem('isLogin', 'false');
        });
    } catch (e) {
      setError(e);
    }
  }, []);

  async function signOut() {
    //로그아웃
    try {
      AsyncStorage.setItem('isLogin', 'false');
      navigation.reset({ routes: [{ name: 'Login' }] });
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();

    } catch (error) {
      Alert.alert('Something else went wrong... ', error.toString());
    }
  }


  const value = 0.66;

  if (loading) {
    return (
      <SafeAreaView style={styles.loading}>
        <ActivityIndicator />
      </SafeAreaView>
    );
    //REST API
  } else {

    return (
      <SafeAreaView style={styles.container}>

        <View style={{ flexDirection: "row" }}>
          <View style={styles.container}>
            <View style={styles.radiusbar}>
              <Text style={{ color: "white" }}>실시간 이용자</Text>
            </View>

            <ProgressCircle
              percent={users.length / 50 * 100}
              radius={50}
              borderWidth={8}
              color="#3399FF"
              shadowColor="#999"
              bgColor="#fff"

            >
              <Text style={{ fontSize: 18 }}>{users.length} /50</Text>
            </ProgressCircle>

          </View>

          <View style={styles.container}>
            <View style={styles.radiusbar}>
              <Text style={{ color: "white" }}>유저 프로필</Text>
            </View>
            <Image style={{ width: 100, height: 100 }} source={{ uri: userPhoto }} />
          </View>

        </View>


        <View style={styles.content}>



          {/* <Text>
            {'\n'}현재 사용자 목록:{'\n'}
          </Text> */}

          {/* <Text>
            {' '}
            현재 {users.length} 명 사용중 {'\n'}
          </Text> */}


          <View style={styles.radiusbar}>
            <Text style={{ color: "white" }}>이용시간 분포</Text>
          </View>
          <Chart />


          <View>
            <Button
              style={styles.ButtonStyle}
              color="black"
              title="QR Code"
              onPress={() =>
                //navigation.reset({routes: [{name: 'QRGenerate'}]})
                navigation.navigate('QRGenerate', {
                  email: userEmail,
                  photo: userPhoto,
                })
              }
            />
            <Button
              color="black"
              title="Logout"
              onPress={() =>
                signOut() ? Alert.alert('Logout success') : Alert.alert('error')
              }
            />
            <Button
              color="black"
              title="map"
              onPress={() =>
                navigation.navigate('Map')
              }
            />

          </View>

        </View>
        <View style={styles.footer} />
      </SafeAreaView>
    );
  }
};

const styles = StyleSheet.create({

  radiusbar: {
    width: 100,
    height: 20,
    backgroundColor: "#A33B39",
    borderRadius: 40,
    alignItems: "center",
    marginBottom: 5
  }
  ,

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: StatusBar.currentHeight,

    //height: 1000,
  },
  loading: {
    flex: 1,
    alignContent: 'center',
    justifyContent: 'center',
  },
  content: {
    flex: 1,
    alignItems: 'center',
    
  },
  footer: {
    height: 60,
    backgroundColor: '#A33B39',
    marginTop: 20,
  },
  elem: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderColor: '#eee',
    borderBottomWidth: 0.5,
    padding: 5,
  },
  memberName: {
    //flexDirection: 'row',
    alignItems: 'center',
  },
  enterTime: {
    padding: 8,
    borderRadius: 5,
  },
  scrollView: {
    width: '80%',
    flex: 1,
    flexDirection: 'column', // row
    backgroundColor: 'white',
    paddingVertical: 20,
    paddingLeft: 20,
    marginBottom: 20,
  },
  appTitle: {
    color: '#fff',
    fontSize: 36,
    marginTop: 30,
    marginBottom: 30,
    fontWeight: '300',
    textAlign: 'center',
    backgroundColor: '#A33B39',
  },

});



export default HomeScreen;
