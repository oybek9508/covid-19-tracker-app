import React, { Component } from "react";
import Cards from "./components/Cards/Card";
import Chart from "./components/Charts/Chart";
import CountryPicker from "./components/CountryPicker/CountryPicker";
import styles from "./App.module.css";
import { fetchData, fetchDailyData } from "./api/index";
import coronaImage from "./images/corona.png";

export class App extends Component {
  state = {
    data: {},
    country: "",
  };
  async componentDidMount() {
    const fetchedData = await fetchData();
    this.setState({
      data: fetchedData,
    });
  }
  handleCountryChange = async (country) => {
    const fetchedData = await fetchData(country);
    // console.log(fetchedData);
    this.setState({
      data: fetchedData,
      country: country,
    });
  };
  render() {
    const { data, country } = this.state;
    return (
      <div className={styles.container}>
        <img className={styles.image} src={coronaImage} alt="Covid-19" />
        <Cards data={data} />
        <CountryPicker handleCountryChange={this.handleCountryChange} />
        <Chart data={data} country={country} />
      </div>
    );
  }
}

export default App;
