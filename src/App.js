import React from 'react';
import './App.css';
import {Cards, Chart, Countries} from './components'
import {getAllData} from './Api'

class App extends React.Component {
  state = {
    data: {},
    country: '',
  }  

  async componentDidMount() {
    const data = await getAllData();
    console.log(data)
    this.setState({ data });
  }

  handleCountryChange = async (country) => {
    const data = await getAllData(country);

    this.setState({ data, country: country });
  }
  render(){
    const { data, country } = this.state;
  return (
    <div className="App">
      <h1>Covid App</h1>
      <Countries handleCountryChange={this.handleCountryChange} />
      <Cards data={data} />
      <Chart data={data} country={country} />
      
      </div>
  );
  }//render
}

export default App;
