import 'react-native-gesture-handler';
import React, {useEffect, useState} from 'react';
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
} from 'react-native';
import {baseProps} from 'react-native-gesture-handler/lib/typescript/handlers/gestureHandlers';
import {GoogleSignin} from '@react-native-community/google-signin';
import AsyncStorage from '@react-native-async-storage/async-storage';

const HomeScreen = ({route, navigation}) => {
  const API_URL = 'http://163.152.223.34:8000/liveData';

  //const userInfo = route.params; //개인정보
  const [users, setUsers] = useState([]); //현재 몇명있는지 정보
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [userEmail, setUserEmail] = useState(null);
  const [userPhoto, setUserPhoto] = useState(null);
  AsyncStorage.getItem('Email').then((Email)=>{
    setUserEmail(Email);
  })
  AsyncStorage.getItem('Photo').then((Photo)=>{
    setUserPhoto(Photo);
  })

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
      await GoogleSignin.revokeAccess();
      await GoogleSignin.signOut();
      AsyncStorage.setItem('isLogin', 'false');
      navigation.reset({routes: [{name: "Login"}]})
    } catch (error) {
      Alert.alert('Something else went wrong... ', error.toString());
    }
  }

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
        <View style={styles.content}>
          <Text>
            {'\n'}email:{JSON.stringify(userEmail)}
            {'\n'}
          </Text>
          <Image
            style={{width: 30, height: 30}}
            source={{uri: userPhoto}}
          />
          <Text>
            {'\n'}현재 사용자 목록:{'\n'}
          </Text>
         
          <Text>
            {' '}
            현재 {users.length} 명 사용중 {'\n'}
          </Text>
          <ScrollView style={styles.scrollView}>
            {users.map(user => (
              <View key={user.student_num}>
                <View style={styles.elem}>
                  <View style={styles.memberName}>
                    <Text>
                      {user.name[0] + '**'} / {user.major}
                    </Text>
                  </View>
                </View>
                <View style={styles.elem}>
                  <View style={styles.enterTime}>
                    <Text>{user.enter_time}</Text>
                  </View>
                </View>
              </View>
            ))}
          </ScrollView>
          <View>
            <Button
              style={styles.ButtonStyle}
              color="black"
              title="QR Code"
              onPress={() =>
                navigation.navigate('QRGenerate', {
                  email: userEmail,
                  photo: userPhoto,
                })
              }
            />
            <Button
             title="Logout"
              onPress={() =>
                signOut() ? Alert.alert('Logout success') : Alert.alert('error')
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
  container: {
    flex: 1,
    //justifyContent: 'center',
    //alignItems: 'center',
    paddingTop: StatusBar.currentHeight,
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
