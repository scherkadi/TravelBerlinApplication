import React from "react";
import ReviewForm  from './ReviewForm'
import ReactDOM from "react-dom";

class ReviewShell extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      attractionName: this.props.attractionName,
      reviewDesc: "",
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
               onClick={this.showEditBox.bind(this)}>Create/Edit Review</div>
        </div>
        <div className="box-container">
          {this.state.isEditOpen
          &&<ReviewForm attractionName={this.state.attractionName}
                                attractionDesc={this.state.reviewDesc}  />}
        </div>
      </div>
    );
  }
}
ReactDOM.render(<ReviewShell />, document.getElementById('root'));

export default ReviewShell
