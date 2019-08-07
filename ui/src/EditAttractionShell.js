import React from "react";
import EditAttractionForm from './EditAttractionForm'
import ReactDOM from "react-dom";

class EditAttractionShell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attractionName: this.props.attractionName,
      attractionDesc: this.props.attractionDesc,
      attractionURL: this.props.attractionURL
    };
  }

  showEditBox() {
    this.setState({isEditOpen: true});
  }

  render() {
    return(
      <div className="editRoot-container">
        <div className="box-controller">
          <div className={"controller" + (this.state.isEditOpen ? "selected-controller":"")}
               onClick={this.showEditBox.bind(this)}>Edit Attraction</div>
        </div>
        <div className="box-container">
          {this.state.isEditOpen
          &&<EditAttractionForm attractionName={this.state.attractionName}
                                attractionDesc={this.state.attractionDesc}
                                attractionURL={this.state.attractionURL}/>}
        </div>
      </div>
    );
  }
}
ReactDOM.render(<EditAttractionShell />, document.getElementById('root'));

export default EditAttractionShell
