import React, {Component} from 'react';
import {
  BrowserRouter as Router,
  Route,
} from 'react-router-dom';

import Client from "./Client";
import Login from "./login";
import Profile from "./Profile";
import Homepage from "./Homepage";
import Attraction from "./Attraction"

import './App.css';

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {title: ''};
  }

  async componentDidMount() {
    Client.getSummary(summary => {
      this.setState({
        title: summary.content
      });
    });
  }

  render() {
    return (
      <Router>
        <div className="App">
          <Route path="/" exact render={(props) => <Login {...props} data={this.state.data} />} />
          <Route path="/Profile" exact render={(props) => <Profile {...props} data={this.state.data} />} />
          <Route path="/Homepage" exact render={(props) => <Homepage {...props} data={this.state.data} />} />
          <Route path="/Attraction/:name" exact render={(props) => <Attraction {...props} data={this.state.data} />} />
        </div>
      </Router>
    );
  }
}
export default App;
