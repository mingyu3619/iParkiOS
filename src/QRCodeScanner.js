/* eslint-disable react-native/no-inline-styles */
'use strict';
import 'react-native-gesture-handler';
import React, { useEffect, useState } from 'react';

import {
  AppRegistry,
  StyleSheet,
  Text,
  Dimensions,
  Image,
  View, Alert
} from 'react-native';
import SoundPlayer from 'react-native-sound-player';
import QRCodeScanner from 'react-native-qrcode-scanner';
import moment from 'moment-timezone';

import Icon from 'react-native-vector-icons/Ionicons';
import * as Animatable from 'react-native-animatable';

const SCREEN_HEIGHT = Dimensions.get('window').height;
const SCREEN_WIDTH = Dimensions.get('window').width;

const ScanScreen = () => {
  const [email, setEmail] = useState(''); //email 담아서 fetch(post)때 쓸라고
  const [users, setUsers] = useState([]); //memberData 에서 user정보 받기 위함
  const [photoURL, setphotoURL] = useState(null); //google 이미지
  const [vaccine, setVaccine] = useState(false);
  const [error, setError] = useState(null);
  const [scanned, setScanned] = useState(false);
  const [state, setState] = useState('');
  const API_URL = 'https://cxz3619.pythonanywhere.com/';
  const onSuccess = e => {
    setUsers([]);
    setEmail('');
    setState('');
    console.log("onsucess.e:",e);
    if (e.data.substring(0, 8) === '{"email"') {
      if (e.data.indexOf('korea.ac.kr') != -1) {
        const userInfo = JSON.parse(e.data);
        setEmail(userInfo.email.replace('.ac.kr', '').toString());
        //ac.kr 꼴 삭제 --> 장고에서 @korea.ac.kr 꼴 인식 못함(http://163.152.223.34:8000/MemberData/cxz3619@korea일떄나 개인 페이지 인식가능 )
        setphotoURL(userInfo.photo); //구글 프로필 이미지
      }
      if (e.data.indexOf('gmail.com') != -1) {
        const userInfo = JSON.parse(e.data);
        setEmail(userInfo.email.replace('.com', '').toString());
        //gmail.com 에서 .com 삭제 
        setphotoURL(userInfo.photo); //구글 프로필 이미지
      }
      scanned ? setScanned(false) : setScanned(true); //큐알 인식시 state 바꿔주기
    }
  };
  // 스캐너 초기화  부분
  let scanner;

  // 스캐너 초기화  부분
  useEffect(() => {
    try {
      console.log(API_URL + 'memberData/' + email.replace('"', ''));
      fetch(API_URL + 'memberData/' + email.replace(/\"/gi, '')) //qr 인식시 큰따옴표 삭제 , 전체 MeberData에 get(정보있는지,없을때도 예외처리 해줘야 함)
        .then(response => response.json())
        .then(data => {
          console.log('data.phnoe_num:', data.phone_num);
          console.log('user info:', data);
          setUsers(data);
          try {
            //백신 확인
            if (data.covid_vaccine !== true) {
              console.log('test covid ' + data.covid_vaccine)
              setVaccine(data.covid_vaccine)
              SoundPlayer.playSoundFile('error', 'mp3'); //잘못된 입장 요청
              throw new Error('covid test result missing');
            }
            fetch(API_URL + 'liveData/', {
              // MemberData에 있는 정보로 liveData(실시간인원 post)
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                phone_num: data.phone_num,
                name: data.name,
                major: data.major,
                student_num: data.student_num,
                enter_time: moment().format('YYYY/MM/DD HH:mm:ss'),
                reserve_product: data.reserve_product,
              }),
            })
              .then(response => response.json())
              .then(data_live => {
                console.log(
                  "API_URL+'liveData/'+phone_num:",
                  API_URL + 'liveData/' + data.phone_num,
                );
                console.log('****liveData_data_live', data_live);
                console.log('****liveData_data_live_type', typeof data_live);

                /// live Data에 전화번호 보내고 있으면 지우고(if문) , 아예 없는 데이터면 error 음내고(else if), 있으면 그대로 넣음(else문)
                if (
                  Object.entries(data_live).toString() ===
                  'phone_num,live data with this phone num already exists.'
                ) {
                  // 이미 있는 정보면 저런식으로 반환값이 옴
                  fetch(API_URL + 'liveData/' + data.phone_num + '/', {
                    method: 'DELETE',
                  })
                    .then(response => response.json())
                    .then(data_live_then =>
                      console.log('Delete_livdData_data:', data_live_then),
                    )
                    .catch(error => {
                      console.log('Delete_livdData_error:', error); //문제되는 부분[SyntaxError: JSON Parse error: Unexpected EOF]
                      throw error;
                    });
                  SoundPlayer.playSoundFile('out', 'mp3'); //퇴장 시 소리 남
                  setState('퇴장');
                } else if (
                  Object.entries(data_live).toString() ===
                  'student_num,This field is required.'
                ) {
                  SoundPlayer.playSoundFile('error', 'mp3'); //데이터 베이스에 없는 사람 출입 시
                } else {

                  console.log(API_URL + 'covidRecord/');
                  // 코로나 기록
                  fetch(API_URL + 'covidRecord/', {
                    method: 'POST',
                    headers: {
                      Accept: 'application/json',
                      'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                      phone_num: data.phone_num,
                      name: data.name,
                      major: data.major,
                      student_num: data.student_num,
                      enter_time: moment().format('YYYY/MM/DD HH:mm:ss'),
                    }),
                  })
                    .then(response => response.json())
                    .then(data => console.log('covid_data:', data))
                    .catch(error => {
                      console.log('covid_error:', error);
                      throw error;
                    });
                  SoundPlayer.playSoundFile('in', 'mp3'); // 정상적인 입장
                  setState('입장');
                }
              })
              .catch(error => {
                console.log('liveData_data_Input_error:', error);
                throw error;
              });
          } catch (e) {
            setError(e);
            console.log('liveData 접속 error:', e.message);
            throw error;
          }
        });
    } catch (e) {
      setError(e);
      // throw e;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scanned]);

  /**
   * function for QRC Scanner slide animation
   */
  const makeSlideOutTranslation = (translationType, fromValue) => {
    return {
      from: {
        [translationType]: SCREEN_WIDTH * -0.05,
      },
      to: {
        [translationType]: fromValue * 0.9,
      },
    };
  };

  return (
    <View>
      <QRCodeScanner
        ref={camera => (scanner = camera)} // qr스캐너 초기화
        onRead={e => onSuccess(e)} //QR코드 읽으면 어떤 함수 실행할지
        showMarker={true} //리더기에 초록색 사각형
        reactivate={true} //카메라 재 반응
        reactivateTimeout={3000} //한번 반응하면 5초후 반응
        cameraStyle={{ height: SCREEN_HEIGHT }}
        customMarker={
          <View style={styles.rectangleContainer}>
            <View style={styles.topOverlay}>
              <Image
                resizeMode="cover"
                style={{ width: 100, height: 100, alignItems: 'flex-end' }}
                source={{ uri: photoURL }}
              />
              <View>
                {console.log(typeof users.email)}
                {users.email ? (
                  <View>
                    <Text style={styles.resultMsg}>
                      이름 : {JSON.stringify(users.name).slice(1, -1)}{'\n'}
                      회원권 : {JSON.stringify(users.reserve_product).slice(1, -1)}{'\n'}
                      학번 : {JSON.stringify(users.student_num).slice(1, -1)}{'\n'}
                      백신 접종 : {users.covid_vaccine ? '2차 접종 확인' : '2차 접종 미확인'}
                    </Text>
                    <Text style={styles.stateMsg}>
                      {state}
                    </Text>
                  </View>
                ) : (
                  <View>
                    <Text style={styles.resultMsg}> QR CODE를 인식 시켜주세요.! </Text>
                  </View>
                )}
              </View>
            </View>

            <View style={{ flexDirection: 'row' }}>
              <View style={styles.leftAndRightOverlay} />

              <View style={styles.rectangle}>
                <Icon
                  name="scan-outline"
                  size={SCREEN_WIDTH * 0.5}
                  color={iconScanColor}
                />
                <Animatable.View
                  style={styles.scanBar}
                  direction="alternate-reverse"
                  iterationCount="infinite"
                  duration={1700}
                  easing="linear"
                  animation={makeSlideOutTranslation(
                    'translateY',
                    SCREEN_WIDTH * -0.54,
                  )}
                />
              </View>

              <View style={styles.leftAndRightOverlay} />
            </View>

            <View style={styles.bottomOverlay} />
          </View>
        }
      />
    </View>
  );
};

const overlayColor = 'rgba(0,0,0,0.5)'; // this gives us a black color with a 50% transparency

const rectDimensions = SCREEN_WIDTH * 0.65; // this is equivalent to 255 from a 393 device width
const rectBorderWidth = SCREEN_WIDTH * 0.005; // this is equivalent to 2 from a 393 device width
const rectBorderColor = 'white';

const scanBarWidth = SCREEN_WIDTH * 0.46; // this is equivalent to 180 from a 393 device width
const scanBarHeight = SCREEN_WIDTH * 0.0025; //this is equivalent to 1 from a 393 device width
const scanBarColor = '#22ff00';

const iconScanColor = 'white';

const styles = StyleSheet.create({
  centerText: {
    flex: 1,
    fontSize: 12,
    padding: 1,
    color: '#777',
  },
  textBold: {
    fontWeight: '500',
    color: '#000',
  },
  rectangleContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  rectangle: {
    height: rectDimensions,
    width: rectDimensions,
    borderWidth: rectBorderWidth,
    borderColor: rectBorderColor,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'transparent',
  },

  topOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    justifyContent: 'center',
    alignItems: 'center',
  },

  bottomOverlay: {
    flex: 1,
    height: SCREEN_WIDTH,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
    paddingBottom: SCREEN_WIDTH * 0.25,
  },

  leftAndRightOverlay: {
    height: SCREEN_WIDTH * 0.65,
    width: SCREEN_WIDTH,
    backgroundColor: overlayColor,
  },

  scanBar: {
    width: scanBarWidth,
    height: scanBarHeight,
    backgroundColor: scanBarColor,
  },

  resultMsg: {
    fontSize: 17,
    color: 'white',
    textAlign: 'center',
  },

  stateMsg: {
    fontSize: 20,
    color: 'pink',
    fontWeight: 'bold',
    textAlign: 'center',
  }
});

AppRegistry.registerComponent('default', () => ScanScreen);

export default ScanScreen;