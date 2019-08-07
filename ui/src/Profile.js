import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import * as serviceWorker from './serviceWorker';
import Client from "./Client";

class Profile extends React.Component {
  _isMounted = false;
  constructor(props) {
    super(props);
    this.state = {
      user:{
        firstname: "loading",
        lastname:"loading",
        email:"loading",
        birthYear:"loading",
        hometown: "loading",
        interests:"loading",
        admin:"loading"
      }
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  profile = (e) => {
    e.preventDefault();
    document.cookie = (document.cookie.split(" ")[0] + " " + this.state.user.admin);
    Client.sendForm("/api/profile", this.state).then(window.location.reload()).catch(err => "Error from fetch: " + err)
  }

  handleInputChange(event)  {
    const target = event.target;
    const value = target.type === 'checkbox' ? target.checked : target.value;
    const id = target.id;
    this.setState(prevState => ({
      user: {...prevState.user,[id]:  value}
    }));
  }

  async componentDidMount() {
    this._isMounted = true;
      if (document.cookie !== "") {
        Client.getData("/api/getProfileData", JSON.stringify({"email": document.cookie.split(" ")[0]})).then(res => {
          if (this._isMounted) {
            this.setState({user: res})
          }
        });
      }
  }

  componentWillUnmount() {
    this._isMounted = false;
  }

  signOut() {
    document.cookie = ""
    window.location.href = "/"
  }

  render() {
    return(
      <div>
        <div className="top-nav">
          <a href="/Homepage">Home</a>
          <a href="/Profile">Profile</a>
          <button onClick={this.signOut} className="signOut">Sign Out</button>
        </div>

        <div className="root-container">
          <div className="box-controller">
            <h1>Profile</h1>
          </div>
          <form name="profileForm" onSubmit={this.profile}>
            <div className="profile-group">
              <label htmlFor="FirstName">First Name</label>
              <input
                type="text"
                id="firstname"
                name="user"
                value={this.state.user.firstname}
                className="profile-input"
                placeholder="First Name"
                onChange={this.handleInputChange}/>
            </div>

            <div className="profile-group">
              <label htmlFor="LastName">Last Name</label>
              <input
                type="text"
                id="lastname"
                name="user"
                value={this.state.user.lastname}
                className="profile-input"
                placeholder="Last Name"
                onChange={this.handleInputChange}/>
            </div>

            <div className="profile-group">
              <label htmlFor="Email">Email</label>
              <input
                type="email"
                id="email"
                name="user"
                value={this.state.user.email}
                className="profile-input"
                placeholder="Email"
                onChange={this.handleInputChange}
              />
            </div>

            <div className="profile-group">
              <label htmlFor="BirthYear">Birth Year</label>
              <input
                type="text"
                id="birthYear"
                name="email"
                value={this.state.user.birthYear}
                className="profile-input"
                placeholder="Birth Year"
                onChange={this.handleInputChange}/>
            </div>

            <div className="profile-group">
              <label htmlFor="Hometown">Home Town</label>
              <input
                type="text"
                id="hometown"
                name="user"
                value={this.state.user.hometown}
                className="profile-input"
                placeholder="Hometown"
                onChange={this.handleInputChange}/>
            </div>

            <div className="profile-group">
              <label htmlFor="Interests">Interests</label>
              <input
                type="text"
                id="interests"
                name="user"
                value={this.state.user.interests}
                className="profile-input"
                placeholder="Interests"
                onChange={this.handleInputChange}/>
            </div>

            <div className="profile-group">
              <label htmlFor="admin">Administrator</label>
              <input
                type="checkbox"
                id="admin"
                name="user"
                checked={this.state.user.admin}
                className="profile-input"
                placeholder="Admin"
                onChange={this.handleInputChange}/>
            </div>

            <button
              type="submit"
              className="profile-button">Update Profile</button>
          </form>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Profile />, document.getElementById('root'));

export default Profile;

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
