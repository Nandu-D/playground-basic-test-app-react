import React, { Component } from "react";
import { getPatients } from "./services";

class App extends Component {
  componentDidMount() {
    getPatients().then((res) => {
      console.log(res);
    });
  }
  render() {
    return <p>Check the console!</p>;
  }
}

export default App;
