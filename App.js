import { StatusBar } from 'expo-status-bar';
import React, { Component } from 'react';
import { StyleSheet, Text, View, ActivityIndicator } from 'react-native';
import Histogram from 'react-chart-histogram';

class StockFetch extends Component {

  state = {};
  constructor(props){
    super(props);
    this.state = {isLoading : true};
  }

  componentDidMount(){
    const apiStockURL = "https://api.tiingo.com/tiingo/daily/" + this.props.ticker + "/prices?startDate=2012-1-1&endDate=2013-1-1&&token=bc636b840068de7cefebde50762aa45fb89c7743";

    fetch(apiStockURL)
    .then((response) => response.json())
    .then((data) => {
      this.setState({data, isLoading : false});
      console.log(data);
    })
    .catch((error) => console.log(error));
  }

  render() {
    const label = ['1','2','3','4'];
    const data = [100,90,120,300];
    console.log(label + data)
    const options = { fillColor: '#FFFFFF', strokeColor: '#0000FF' };
    return (
        (this.state.isLoading) ? <ActivityIndicator/> : (
          <div>
          <Text>Data gathering Successful.</Text>
          <View>
            <Histogram 
              xLabels={this.state.data.map((item) => item.date.substr(0, 10))}
              yValues={this.state.data.map((item) => item.open)}
              width='400'
              height='200'
              options={options}
            />
          </View>
          </div>
        )
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
