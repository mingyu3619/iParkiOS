/* eslint-disable react-native/no-inline-styles */
import React, { useState,useEffect } from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Pressable,
  Alert,
} from 'react-native';
import { FlatList, TouchableOpacity } from 'react-native-gesture-handler';

const API_URL = 'https://cxz3619.pythonanywhere.com/';

// const DATA = [
//   {
//     id: '1',
//     title: 'First Notice',
//     text: "this is ipark notice Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap into electronic typesetting, remaining essentially unchanged. It was popularised in the 1960s with the release of Letraset sheets containing Lorem Ipsum passages, and more recently with desktop publishing software like Aldus PageMaker including versions of Lorem Ipsum."
//   },
//   {
//     id: '2',
//     title: 'Second Notice',
//     text: 'this is ipark notice'
//   },
//   {
//     id: '3',
//     title: 'Third Notice',
//     text: 'this is ipark notice'
//   },
//   {
//     id: '4',
//     title: 'Forth Notice',
//     text: 'this is ipark notice'
//   },
//   {
//     id: '5',
//     title: 'Fifth Notice',
//     text: 'this is ipark notice'
//   },
//   {
//     id: '6',
//     title: 'Sixth Notice',
//   },
//   {
//     id: '7',
//     title: 'Seventh Notice',
//   },
//   {
//     id: '8',
//     title: 'Eighth Notice',
//   },
//   {
//     id: '9',
//     title: 'Ninth Notice',
//   },
//   {
//     id: '10',
//     title: 'Tenth Notice',
//   },
// ];

/* item list 바꿔주는 함수 */
const Item = ({ item, onPress, style }) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);

const NoticeBoard = ({ navigation }) => {

  const [selectedId, setSelectedId] = useState(null);
  const [data, setData] = useState([]);

  useEffect(() => {
    // GET request using fetch inside useEffect React hook
    try {
      fetch(API_URL + 'notice/')
        .then(response => response.json())
        .then(data => setData(data));
    } catch (e) {
      throw e;
    }

  }, []);

  const renderItem = ({ item }) => {
    //id가 selectedId라면 배경색상 변경
    const backgroundColor = item.id === selectedId ? '#DDDDDD' : '#FFFFFF';

    return (
      <View>
        <Item
          item={item}
          //아이템을 클릭하면 selectedId가 변경
          onPress={() => {
            setSelectedId(item.id);
            navigation.navigate('NoticeView', { id: item.id, title: item.title, paragraph: item.paragraph, image: item.image })
            // console.log(item.id)
          }}
          style={{ backgroundColor }}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        //리스트의 소스를 담는 속성
        data={data}
        //data로 받은 소스의 아이템들을 render 시켜주는 콜백함수
        renderItem={renderItem}
        //item의 고유의 키를 부여하는 속성
        keyExtractor={item => item.id}
        //selectedId가 변경되면 리렌더링 되도록 하는 속성
        extraData={selectedId}
      />
    </SafeAreaView>
  );
};

/**
 *  StyleSheet
 */
const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    padding: 20,
    marginVertical: 8,
    marginHorizontal: 16,
  },
  title: {
    fontSize: 32,
  },
  button: {
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  buttonOpen: {
    backgroundColor: '#F194FF',
  },
  buttonClose: {
    backgroundColor: '#2196F3',
  },
  textStyle: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
});

/**https://daesiker.tistory.com/30 */
export default NoticeBoard;
