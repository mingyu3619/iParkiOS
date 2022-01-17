# iPark
Korea University IPark Health Center App

기존의 코로나 출입 수기 작성, 회원여부 확인, 백신 접종 여부 확인 3가지 절차를 QR코드 스캔 하나로 줄인 
교내 헬스장 출입 어플입니다.

본 프로젝트는 react native App과 django 관리자 페이지로 이루져있습니다.

## Apple App Store & Google Play Store Release

Android : https://play.google.com/store/apps/details?id=com.ipark_ku

iOS : https://apps.apple.com/kr/app/%EA%B3%A0%EB%A0%A4%EB%8C%80%ED%95%99%EA%B5%90-ipark/id1584807737

## 설치


'''C

  git clone https://github.com/mingyu3619/iParkiOS.git
  npm install
  //gradle.properties 내의 java 버전 수정

'''


## 기능

+ 주요 기능
![image](https://user-images.githubusercontent.com/86222639/149765931-9b31945d-f95a-461f-9a69-19acc04fcd3d.png)

+ 로그인 페이지
  + Google Login 
    +Google 계정을 통하여 로그인 가능(+로그인 되어있으면 바로 Home으로 이동)
  + admin Login
    +관리자 QR 스캔 페이지로 이동
<img src="https://user-images.githubusercontent.com/86222639/149765967-e97ff3f0-02bc-42de-9ce8-4074c23e6048.png" width= "250" height="550">

+ Home 화면
  + 실시간 이용자, 이용시간 분포
    + react-native-chart-kit , react-native-progress-circle 
  + QR 코드 생성 페이지로 이동
  + 유저 프로필
    + 서버내의 image get 
  
<img src="https://user-images.githubusercontent.com/86222639/149771000-e4e67fea-f5a7-448c-81eb-f455f53a3978.png" width="250" height = "550">

+ QR 코드 생성 화면
  + 고유 QR코드 생성
    + react-native-qrcode-scanner 사용 
<img src="https://user-images.githubusercontent.com/86222639/149769914-ef47a15e-136f-4a9b-ba1d-4084eee863ae.png" width="250" height="550">

+ 공지사항 페이지
  + django 서버의 공지사항들 get
<img src="https://user-images.githubusercontent.com/86222639/149771193-d30787e2-cc24-4607-87f7-aa028c643a37.png" width="250" height="550">


+ 관리자 QR 인식 페이지
  + 회원 여부 판별
  + 입장 기록 생성
  + 백신 접종 여부 확인
    + 근로장학생의 확인으로 django 서버에 기록
    
|QR 인식 전 | QR 인식 후|
|:-:|:-:|
|<img src="https://user-images.githubusercontent.com/86222639/149775060-2c52c5da-b626-4a57-ac48-2ffcc9b7ea56.jpg" width="200" height="400">|<img src="https://user-images.githubusercontent.com/86222639/149774718-3dca34ff-3774-4bb3-a557-738333446d5b.png" width="200" height="400"> |


## Tech Stack 
- React Natvie, Django, SQLite, Django Restframework

