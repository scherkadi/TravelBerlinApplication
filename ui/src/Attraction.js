import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Client from "./Client";
import EditAttractionShell from './EditAttractionShell'
import ReviewShell from './ReviewShell'
import ReviewDisplay from './ReviewDisplay'

class Attraction extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      reviews: {}
    };
  }

  componentDidMount() {
    if (this.props.match !== undefined) {
      //const name = this.props.match.params.name;
      //this.setState({attractionName: name})

      Client.getDataNoBody("/api/getAttractionData").then(res => {
        if (res != null) {
          const name = this.props.match.params.name;
          const spacedName = name.replace(/_/g ,' ')
          const index = Object.keys(res).indexOf(spacedName);
          const desc = Object.values(res)[index].desc;
          const url = Object.values(res)[index].url;
          this.setState({attractionName: spacedName, attractionDesc: desc, attractionURL: url});

          Client.getData("/api/getReviewData", JSON.stringify(this.state)).then(res => {
            if (res != null) {
              this.setState({reviews: res})
            }
          });
        }
      });
    }
  }

  signOut() {
    document.cookie = ""
    console.log("Cookies: " + document.cookie)
    window.location.href = "/"
  }

  createComp(email, review, attrName) {
    return React.createElement(ReviewDisplay, {
      key: email,
      emailState: email,
      reviewState: review,
      attractionName: attrName
    });
  }

  render() {
    return(
      <div>
        <div className="top-nav">
          <a href="/Homepage">Home</a>
          <a href="/Profile">Profile</a>
          <button onClick={this.signOut} className="signOut">Sign Out</button>
        </div>

        <div>
          <div className="attraction-descr">

            <h1>  {this.state.attractionName} </h1>
          <div>
            <p style={{'whiteSpace': 'pre-line'}}> {this.state.attractionDesc} </p>
          </div>
          </div>
        </div>
        <div className="review-title">
          <h1>Reviews</h1>
        </div>

        <div className="reviews">
          {Object.keys(this.state.reviews).map(
            key => (
              this.createComp(key, this.state.reviews[key].reviewDesc, this.state.attractionName))
          )}
        </div>

        {(document.cookie.split(" ")[1] === "true" ? true : null) && this.state.attractionName && this.state.attractionDesc && this.state.attractionURL &&
          <EditAttractionShell attractionName={this.state.attractionName} attractionDesc={this.state.attractionDesc} attractionURL={this.state.attractionURL}/>}

        {this.state.attractionName &&
          <ReviewShell attractionName={this.state.attractionName} reviewDesc={"sdfasd"} />
        }

      </div>
    );
  }
}

ReactDOM.render(<Attraction />, document.getElementById('root'));

export default Attraction;
