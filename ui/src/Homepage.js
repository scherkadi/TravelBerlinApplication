import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import AttractionBox from './AttractionBox'
import AttractionForm from './AttractionForm'
import Client from "./Client";

class Homepage extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {attractions: {}, attArr: []};
  }

  async componentDidMount() {
    this._isMounted = true;

    Client.getDataNoBody("/api/getAttractionData").then(res => {
      if (this._isMounted) {
        this.setState({attractions: res})
      }
    });
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  createComp(att, url) {

    return React.createElement(AttractionBox, {
      key: att,
      attractionName: att,
      imageURL: url,
      attractionURL: "/Attraction/" + att.replace(/\s+/g, '_')
    });
  }

  signOut() {
    document.cookie = ""
    window.location.href = "/"
  }

  render() {

    return (
      <div>
        <div className="top-nav">
          <a href="/Homepage">Home</a>
          <a href="/Profile">Profile</a>
          <button onClick={this.signOut} className="signOut">Sign Out</button>
        </div>
        <br/>
        <h2>Welcome to Travel Berlin!</h2>

        <div className="attractions">
          {Object.keys(this.state.attractions).map(
            key => (
              this.createComp(key, this.state.attractions[key].url))
            )}

          <div className="box-container">
            {(document.cookie.split(" ")[1] === "true" ? true : null) && <AttractionForm />}
          </div>

        </div>
      </div>

    );
  }
}


ReactDOM.render(<Homepage />, document.getElementById('root'));

export default Homepage;

