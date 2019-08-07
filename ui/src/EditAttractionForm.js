import React from "react";
import Client from "./Client";

class EditAttractionForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attractionName: this.props.attractionName,
      attractionDesc: this.props.attractionDesc,
      attractionURL: this.props.attractionURL
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  editAttraction = (e) => {
    e.preventDefault();
    if (document.cookie.split(" ")[1] === "true") {
      Client.sendForm("/api/attract", this.state).then(window.location.reload())
    } else {
      alert("You must be an admin to create an attraction!")
    }

  };


  handleInputChange(event)  {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const name = target.name;
    this.setState({
      [name]: value
    });
  }

  render() {
    return (
      <div>

        <div className="box-controller">
          <h1>{this.state.attractionName}</h1>
        </div>

        <div className="root-container">
          <form name="editAttractionForm" onSubmit={this.editAttraction}>

            <div className="editAttraction-group">
              <label htmlFor="attractionDesc">Attraction Description</label>
              <textarea
                id="attractionDesc"
                rows="50"
                cols="30"
                name="attractionDesc"
                value={this.state.attractionDesc}
                className="editAttraction-input"
                onChange={this.handleInputChange}
              />
            </div>

            <button
              type="submit"
              className="editAttraction-button">Edit Attraction
            </button>
          </form>
        </div>
      </div>

    );
  }
}
export default EditAttractionForm
