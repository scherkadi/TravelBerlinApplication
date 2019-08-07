import React from "react";

class AttractionBox extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      attractionName: "", attractionURL: props.attractionURL, attractionImage: props.imageURL
    }
  };

  render() {
    return (
      <div className="attraction-container">
        <div className="attrimage">
          <img src= {this.state.attractionImage} alt="Berlin Attraction"/>
        </div>
        <div>
          <a href={this.state.attractionURL}>{this.props.attractionName}</a>
        </div>
      </div>
    )
  }
}
export default AttractionBox
