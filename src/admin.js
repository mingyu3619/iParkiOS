import 'react-native-gesture-handler';

import React, {useState} from 'react';
import {View, Text, StyleSheet, Button, TextInput, Alert} from 'react-native';

const AdminScreen = ({navigation}) => {
  const [code, setCode] = useState(null);
  const [loading, setLoading] = useState(true);
  return (
    <View>
      <Text>관리자 인증 코드를 입력해주세요</Text>
      <TextInput value={code} onChangeText={text => setCode(text)} />
      {/* if(code === "sample"){setLoading(true)}else{setLoading(false)} */}
      <Button
        title="Login"
        onPress={() => {
          if (loading) navigation.navigate('Home');
          else {
            Alert('Wrong..!');
          }
        }}
      />
    </View>
  );
};

export default AdminScreen;
