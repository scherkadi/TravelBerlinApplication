import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Client from "./Client";

class ReviewDisplay extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      emailState: this.props.emailState, reviewState: this.props.reviewState, attractionName: this.props.attractionName
    };
  }

  delete = e => {
    e.preventDefault();
    Client.sendForm("/api/deleteReview", this.state)
      .then(window.location.reload()).catch(err => "Error from fetch: " + err)
  }

  render() {
    return(
      <div className="review-container">
        <div className="review-email">
          <h2>{this.state.emailState}</h2>
        </div>
        <div className="review-description">
          <p>{this.state.reviewState}</p>
        </div>
        <div className="delete-button">
          {(document.cookie.split(" ")[1] === "true" ? true : null) && <button onClick={this.delete}>Delete Review</button>}
        </div>
      </div>
    );
  }
}

ReactDOM.render(<ReviewDisplay />, document.getElementById('root'));

export default ReviewDisplay;
