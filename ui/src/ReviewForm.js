import React from "react";
import Client from "./Client";

class ReviewForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attractionName: this.props.attractionName, reviewDesc:"", email: document.cookie.split(" ")[0]
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  review = e => {
    e.preventDefault();
    Client.sendForm("/api/review", this.state)
      .then(window.location.reload()).catch(err => "Error from fetch: " + err)

  }

  async componentDidMount() {
    if (document.cookie !== "") {
      Client.getData("/api/individualReview", JSON.stringify({"email": document.cookie.split(" ")[0]
        , "attractionName": this.state.attractionName})).then(res => {
        this.setState({reviewDesc: res})
      });
    }
  }

  handleInputChange(event)  {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;

    this.setState({
      [name]: value
    });
  }

  render() {
    return(
      <form className="attr-container" onSubmit={this.review}>

        <div className="attractionInput-group">
          <label htmlFor="attractionDesc">Review</label>
          <textarea
            id="reviewDesc"
            rows="5"
            cols="30"
            name="reviewDesc"
            className="attraction-input"
            value={this.state.reviewDesc}
            placeholder="Review Description"
            onChange={this.handleInputChange}
          />


        </div>

        <button
          type="submit"
          className="attraction-button">Create/Edit Review</button>

      </form>
    );
  }
}
export default ReviewForm
