import React from "react";
import Client from "./Client";

class AttractionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attractionName: "", attractionDesc:"", attractionURL: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  attract = e => {
    e.preventDefault();
    if (document.cookie.split(" ")[1] === "true") {
      Client.sendForm("/api/attract", this.state)
        .then(window.location.reload()).catch(err => "Error from fetch: " + err)
    } else {
      alert("You must be an admin to create an attraction")
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
      <form className="attr-container" onSubmit={this.attract}>
        <div className="attractionInput-group">
          <label htmlFor="attractionName">Attraction Name</label>
          <input
            type="text"
            id="attractionName"
            name="attractionName"
            className="attraction-input"
            placeholder="Attraction Name"
            onChange={this.handleInputChange}
          />
        </div>

        <div className="attractionInput-group">
          <label htmlFor="attractionDesc">Attraction Description</label>
          <textarea
            id="attractionDesc"
            rows="5"
            cols="30"
            name="attractionDesc"
            className="attraction-input"
            placeholder="Attraction Description"
            onChange={this.handleInputChange}
          />

        </div>

        <div className="attractionInput-group">
          <label htmlFor="attractionURL">Attraction Image URL</label>
          <textarea
            type="text"
            id="attractionURL"
            name="attractionURL"
            className="attraction-input"
            placeholder="Attraction Image URL"
            onChange={this.handleInputChange}
          />

        </div>

        <button
          type="submit"
          className="attraction-button">Create Attraction</button>

      </form>

    );
  }
}
export default AttractionForm
