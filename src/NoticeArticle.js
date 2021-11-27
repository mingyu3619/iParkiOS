
import React, { useState } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    StatusBar,
    SafeAreaView,
    Pressable,
    Alert,
} from 'react-native';
import { ScrollView } from 'react-native-gesture-handler';

const NoticeView = ({ route }) => {

    const img = route.params.image
    console.log(img)
    return (
        <View style={styles.container}>
            {/* <Text>{route.params.id}</Text> */}
            <Text style={styles.title}>{route.params.title}</Text>
            <ScrollView style={styles.text}>
                <Image style={styles.img} source={{ uri: img }} />
                <Text>{'\n'}{route.params.paragraph}{'\n'}</Text>
            </ScrollView>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontWeight: 'bold',
        fontSize: 30,
        marginTop: 30
    },
    text: {
        marginVertical: 50,
        padding: 20,
    },
    img: {
        width: 200,
        height: 200,
        resizeMode: "contain"
    }
})

export default NoticeView;