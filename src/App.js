import React, { Component } from "react";
import { BrowserRouter as Router, Switch, Route, Link } from 'react-router-dom';
import Table from "./components/Table";
import Questionnaire from "./components/Questionnaire";

class App extends Component {

  render() {
    return (
      <Router>
        <>
          <nav>
            <div style={{display: "flex", flexDirection: "row", margin: "1rem"}}>
              <span style={{marginRight: "1rem"}}><Link to={'/'}>Basic</Link></span>
              <span><Link to={'/intermediate'}>Intermediate</Link></span>
            </div>
          </nav>
          <hr />
          <Switch>
              <Route exact path='/' component={Table} />
              <Route path='/intermediate' component={Questionnaire} />
              <Route path='*' component={Table} />
          </Switch>
        </>
      </Router>
    )
}
}

export default App;
