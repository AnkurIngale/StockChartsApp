import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, TextInput, View, ActivityIndicator } from 'react-native';
import { LineChart } from 'react-native-chart-kit';
import { Avatar } from 'react-native-elements';

class StockFetch extends Component {

  state = {};
  constructor(props){
    super(props);
    this.state = {ticker : props.ticker, isLoading : true};
  }

  componentDidMount(){
    const apiStockURL = "https://api.tiingo.com/tiingo/daily/" + this.state.ticker + "/prices?startDate=2012-1-1&endDate=2016-1-1&&token=bc636b840068de7cefebde50762aa45fb89c7743";

    fetch(apiStockURL)
    .then((response) => response.json())
    .then((data) => {
      this.setState({stockdata : data, isLoading : false});
      console.log(data);
    })
    .catch((error) => console.log(error));
  }

  render() {
    const stockdata = this.state.stockdata;
    return (
      <>
      {
        (this.state.isLoading) ? <ActivityIndicator/> : (
          <>
          <Text>Data gathering Successful.</Text>
          {
          /* <LineChart
            data={stockdata}
            width={500} // from react-native
            height={220}
            yAxisLabel={'$'}
            chartConfig={{
              backgroundColor: '#e26a00',
              backgroundGradientFrom: '#fb8c00',
              backgroundGradientTo: '#ffa726',
              decimalPlaces: 2, // optional, defaults to 2dp
              color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
              style: {
                borderRadius: 16
              }
            }}
            bezier
            style={{
              marginVertical: 8,
              borderRadius: 16
            }}
          /> */
          }
          </>
        )
      }
      </>
    );
  }
}

export default class App extends Component {
  render() {
    return (
      <View style={styles.container}>
        <Text>Welcome to StockCharts App.</Text>
        <React.Fragment>
          <View>
            <StockFetch ticker='AAPL'/>
          </View>
        </React.Fragment>
        <StatusBar style="auto" />
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
