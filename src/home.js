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
} from 'react-native';

const HomeScreen = () => {
  const API_URL = 'http://163.152.223.34:8000/liveData';

  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    try {
      fetch(API_URL)
        .then((response) => response.json())
        .then((data) => {
          setUsers(data);
          setLoading(false);
        });
    } catch (e) {
      setError(e);
    }
  }, []);

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
        {/* <Text style={styles.appTitle}>How many</Text> */}
        <View style={styles.content}>
          <Text>
            {'\n'}현재 사용자 목록{'\n'}
          </Text>
          <Text>
            {' '}
            현재 {users.length} 명 사용중 {'\n'}
          </Text>
          <ScrollView style={styles.scrollView}>
            {users.map((user) => (
              <View key={user.student_num}>
                <View style={styles.elem}>
                  <View style={styles.memberName}>
                    <Text>{user.name}</Text>
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
              title="QR Code"
              onPress={() => Alert.alert('Hello Wolrd')}
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
    marginBottom: 100,
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
