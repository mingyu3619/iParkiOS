import 'react-native-gesture-handler';

import React, {useEffect, useState} from 'react';
import {View, StatusBar, StyleSheet, Dimensions} from 'react-native';
import 'moment-timezone';

import {BarChart} from 'react-native-chart-kit';

const GRAPH_MARGIN = 20;
const colors = {
  axis: '#E4E4E4',
};

const Chart = () => {
    const API_URL = 'https://cxz3619.pythonanywhere.com/covidRecord/';
    const [loading, setLoading] = useState(true);
    
    const [record, setrecord] = useState(
        [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0])

    console.log("chart");

    const SVGHeight = 300
    const SVGWidth = 300
 

    useEffect(() => {
        try {
            fetch(API_URL)
                .then(response => response.json())
                .then(data => {
                    
                    const mapping_data = data.map(item => Object({ 'date': item.enter_time }));
                    //날짜필터하는 방법 //data.filter(item => item.enter_time <= "2021/07/25");                     
                    
                    var temp_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
                    mapping_data.map(user => {                       

                        if (6<= parseInt(user.date.substring(11, 13), 10)&& parseInt(user.date.substring(11, 13), 10)  <= 8)
                            temp_arr[parseInt(user.date.substring(11, 13), 10) - 6] += 1
                        if (21>=parseInt(user.date.substring(11, 13), 10) && parseInt(user.date.substring(11, 13), 10) >= 13) {
                            temp_arr[parseInt(user.date.substring(11, 13), 10) - 10] += 1
                        }
                    });
                    console.log("temp_arr:", temp_arr);
                    setrecord(temp_arr);


                });

        } catch (e) {

            console.log("error: ", e);
        }
    }, []);

     
    return (

        <View style={{flex:1,padding:5,justifyContent:'center',alignItems:"center"}}>
            <BarChart
                data={{
                    labels: ['6', '7', '8', '13', '14', '15', '16', '17', '18', '19', '20', '21'],
                    datasets: [
                        {
                            data: record
                        },
                    ],
                    barColors: ['blue'],
                }}
                flatColor={true}
                width={Dimensions.get('window').width - 16}
                height={Dimensions.get('window').width/2}
                
                showBarTops={false}
                fromZero={true}
                chartConfig={{
                    backgroundColor: 'black',
                    backgroundGradientFrom: '#eff3ff',
                    backgroundGradientTo: '#efefef',
                    fillShadowGradientOpacity: 1,
                    fillShadowGradient: 'blue',
                    decimalPlaces: 0,
                    barRadius: 5,
                    barPercentage: 0.3,
                    color: (opacity = 1) => `rgba(0, 0, 0, ${opacity})`,
                    style: {
                        borderRadius: 16,
                    },
                }}
            />
            
            

        </View>


    );
}

export default Chart;
