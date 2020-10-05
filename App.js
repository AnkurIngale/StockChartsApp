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

  componentDidUpdate(prevProps){
    const apiStockURL = "https://api.tiingo.com/tiingo/daily/" + this.props.ticker + "/prices?startDate=" + this.props.startDate 
    + "&endDate=" + this.props.endDate + "&&token=bc636b840068de7cefebde50762aa45fb89c7743";

    fetch(apiStockURL)
    .then((response) => response.json())
    .then((data) => {
      this.setState({data, isLoading : false});
      console.log(data);
    })
    .catch((error) => console.log(error));
  }

  componentDidMount(){
    const apiStockURL = "https://api.tiingo.com/tiingo/daily/" + this.props.ticker + "/prices?startDate=" + this.props.startDate 
    + "&endDate=" + this.props.endDate + "&&token=bc636b840068de7cefebde50762aa45fb89c7743";

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
              width='1000'
              height='700'
              options={options}
            />
          </View>
          </div>
        )
    );
  }
}

class StockForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stockName: 'AAPL',
      startDate: '2012-1-1',
      endDate: '2013-1-1'
    };
  }

  mySubmitHandler = (event) => {
    event.preventDefault();
  }

  myChangeHandler = (event) => {
    let nam = event.target.name;
    let val = event.target.value;
    this.setState({[nam]: val});
  }

  render() {
    return (
      <>
      <div className="container">
        <form onSubmit={this.mySubmitHandler}>
        <h1>Hello</h1>
        <p>Enter stock name:</p>
        <input
          type='text'
          name='stockName'
          onChange={this.myChangeHandler}
        />
        <p>Enter start date:</p>
        <input
          type='text'
          name='startDate'
          onChange={this.myChangeHandler}
        />
        <p>Enter end date:</p>
        <input
          type='text'
          name='endDate'
          onChange={this.myChangeHandler}
        />
        <br/>
        <br/>
        <input type='submit' />
        </form>
      </div>
      
      <StockFetch ticker={this.state.stockName} startDate={this.state.startDate} endDate={this.state.endDate}/>
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
            <StockForm/>
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
