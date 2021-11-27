import 'react-native-gesture-handler';

import React, { useEffect, useState } from 'react';
import { View, StatusBar, StyleSheet, Dimensions } from 'react-native';
import moment from 'moment-timezone';

import { BarChart } from 'react-native-chart-kit';

const GRAPH_MARGIN = 20;
const colors = {
  axis: '#E4E4E4',
};

const Chart = () => {
  const API_URL = 'https://cxz3619.pythonanywhere.com/covidRecord/';
  const [record, setrecord] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  console.log('chart');

  const SVGHeight = 300;
  const SVGWidth = 300;

  useEffect(() => {
    try {
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {       
          const mapping_data =data.filter(item => moment().add(-7,'d').format('YYYY/MM/DD')<=item.enter_time&&item.enter_time<=moment().format('YYYY/MM/DD'));
          var temp_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          mapping_data.map(user => {

            if (
              parseInt(user.enter_time.substring(11, 13), 10) >= 6 &&
              parseInt(user.enter_time.substring(11, 13), 10) <= 8
            ) {
              temp_arr[parseInt(user.enter_time.substring(11, 13), 10) - 6] += 1;
            }
            if (
              parseInt(user.enter_time.substring(11, 13), 10) <= 21 &&
              parseInt(user.enter_time.substring(11, 13), 10) >= 13
            ) {
              temp_arr[parseInt(user.enter_time.substring(11, 13), 10) - 10] += 1;
            }
          });
          console.log('temp_arr:', temp_arr);
          setrecord(temp_arr);
        });
    } catch (e) {
      console.log('error: ', e);
    }
  }, []);

  return (
    <View style={{ flex: 1, padding: 5 }}>
      <BarChart
        data={{
          labels: [
            // eslint-disable-next-line prettier/prettier
            '6', '7', '8', '13', '14', '15', '16', '17', '18', '19', '20', '21',
          ],
          datasets: [
            {
              data: record,
            },
          ],
          barColors: ['blue'],
        }}
        flatColor={true}
        width={Dimensions.get('window').width - 16}
        height={Dimensions.get('window').width / 2}
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
};

export default Chart;
