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

  const [record, setrecord] = useState([0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);

  console.log('chart');

  const SVGHeight = 300;
  const SVGWidth = 300;

  useEffect(() => {
    try {
      fetch(API_URL)
        .then(response => response.json())
        .then(data => {
          const mapping_data = data.map(item =>
            Object({date: item.enter_time}),
          );
          //날짜필터하는 방법 //data.filter(item => item.enter_time <= "2021/07/25");

          var temp_arr = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
          mapping_data.map(user => {
            if (parseInt(user.date.substring(11, 13), 10) <= 8) {
              temp_arr[parseInt(user.date.substring(11, 13), 10) - 6] += 1;
            } else if (parseInt(user.date.substring(11, 13), 10) >= 13) {
              temp_arr[parseInt(user.date.substring(11, 13), 10) - 10] += 1;
            }
          });
          console.log('temp_arr:', temp_arr);
          setrecord(temp_arr);
        });
    } catch (e) {
      console.log('error: ', e);
      throw e;
    }
  }, []);
  const data = {
    labels: [
      // eslint-disable-next-line prettier/prettier
      '6',
      '7',
      '8',
      '13',
      '14',
      '15',
      '16',
      '17',
      '18',
      '19',
      '20',
      '21',
    ],
    datasets: [
      {
        data: record,
      },
    ],
    barColors: ['blue'],
  };
  return (
    <View style>
      <BarChart
        data={data}
        flatColor={true}
        width={Dimensions.get('window').width - 16}
        height={220}
        // height={Dimensions.get('window').width / 2}
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
export default Chart;
