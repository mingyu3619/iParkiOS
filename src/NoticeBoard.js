/* eslint-disable react-native/no-inline-styles */
import React, {useState} from 'react';
import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  SafeAreaView,
  Pressable,
  Modal,
  Alert,
} from 'react-native';
import {FlatList, TouchableOpacity} from 'react-native-gesture-handler';

const DATA = [
  {
    id: '1',
    title: 'First Notice',
  },
  {
    id: '2',
    title: 'Second Notice',
  },
  {
    id: '3',
    title: 'Third Notice',
  },
  {
    id: '4',
    title: 'Forth Notice',
  },
  {
    id: '5',
    title: 'Fifth Notice',
  },
  {
    id: '6',
    title: 'Sixth Notice',
  },
  {
    id: '7',
    title: 'Seventh Notice',
  },
  {
    id: '8',
    title: 'Eighth Notice',
  },
  {
    id: '9',
    title: 'Ninth Notice',
  },
  {
    id: '10',
    title: 'Tenth Notice',
  },
];

const Item = ({item, onPress, style}) => (
  <TouchableOpacity onPress={onPress} style={[styles.item, style]}>
    <Text style={styles.title}>{item.title}</Text>
  </TouchableOpacity>
);
const Notice = () => {
  const [selectedId, setSelectedId] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const renderItem = ({item}) => {
    //id가 selectedId라면 배경색상 변경
    const backgroundColor = item.id === selectedId ? '#DDDDDD' : '#FFFFFF';

    return (
      <View>
        <Modal
          animationType="slide"
          transparent={true}
          visible={modalVisible}
          onRequestClose={() => {
            Alert.alert('Modal has been closed.');
            setModalVisible(!modalVisible);
          }}>
          <View style={styles.centeredView}>
            <View style={styles.modalView}>
              <Text style={styles.modalText}>
                Hello World!{'\n'}아이파크 공지는 어쩌구 저쩌구 {'\n'}이번달
                운영은 어쩌구 저쩌구 {'\n'}공지는 이거다 저거다 {'\n'}앞으로
                운동 열심히해라{'\n'}
                깔끔하게 써라 쓰레기 버리지마라 등등
              </Text>
              <Pressable
                style={[styles.button, styles.buttonClose]}
                onPress={() => setModalVisible(!modalVisible)}>
                <Text style={styles.textStyle}>close</Text>
              </Pressable>
            </View>
          </View>
        </Modal>
        <Item
          item={item}
          //아이템을 클릭하면 selectedId가 변경
          onPress={() => {
            setSelectedId(item.id);
            setModalVisible(true);
          }}
          style={{backgroundColor}}
        />
      </View>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <FlatList
        //리스트의 소스를 담는 속성
        data={DATA}
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
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22,
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
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
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
  },
});

/**https://daesiker.tistory.com/30 */
export default Notice;
