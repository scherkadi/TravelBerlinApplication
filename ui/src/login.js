import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import Client from './Client'
import * as serviceWorker from './serviceWorker';


class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  showLoginBox() {
    this.setState({isLoginOpen: true, isRegisterOpen: false});
  }

  showRegisterBox() {
    this.setState({isLoginOpen: false, isRegisterOpen: true});
  }

  render() {
    return(
      <div className="root-container">
        <div className="title">
          <h1>Travel Berlin</h1>
        </div>
        <div className="box-controller">
          <div className={"controller" + (this.state.isLoginOpen ? "selected-controller":"")}
               onClick={this.showLoginBox.bind(this)}>Login</div>
          <div className={"controller" + (this.state.isRegisterOpen ? "selected-controller":"")}
               onClick={this.showRegisterBox.bind(this)}>Register</div>
        </div>
        <div className="box-container">
          {this.state.isLoginOpen &&<LoginBox/>}
          {this.state.isRegisterOpen &&<RegisterBox/>}
        </div>
      </div>
    );
  }
}

class LoginBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "", password:""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  login = e => {
    e.preventDefault();
    Client.sendForm("/api/login", this.state).then( data => {
      const x = (data.login === "good") ? (window.location.href = "/Homepage", document.cookie = (data.email + " " + data.admin)) : alert("Invalid Login Credentials")
      return x
    })
    .catch(err => "Error from fetch: " + err)
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
      <form className="inner-container" onSubmit={this.login}>
        <div className="input-group">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="email"
            name="Email"
            className="login-input"
            placeholder="Email"
            onChange={this.handleInputChange}
          />
        </div>

        <div className="input-group">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="password"
            name="Password"
            className="login-input"
            placeholder="Password"
            onChange={this.handleInputChange}
          />

        </div>

        <button
          type="submit"
          className="login-button">Login</button>

      </form>

    );
  }
}

class RegisterBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "", password: ""
    };

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  register = e => {
    e.preventDefault();
    Client.sendForm("/api/register", this.state).then(alert("Please Login")
    )
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
      <form className="inner-container" onSubmit={this.register}>

        <div className="input-group">
          <label htmlFor="Email">Email</label>
          <input
            type="email"
            id="email"
            name="Email"
            className="register-input"
            placeholder="Email"
            //value={this.state.email}
            onChange={this.handleInputChange}/>
        </div>

        <div className="input-group">
          <label htmlFor="Password">Password</label>
          <input
            type="password"
            id="password"
            name="Password"
            className="register-input"
            placeholder="Password"
            //value={this.state.password}
            onChange={this.handleInputChange}/>

        </div>

        <div className="input-group">
          <label htmlFor="admin">Admin</label>
          <input
            type="checkbox"
            id="admin"
            name="admin"
            className="register-input"
            onChange={this.handleInputChange}/>

        </div>

        <button
          type="submit"
          className="register-button">Register
        </button>

      </form>
    );
  }
}


ReactDOM.render(<Login />, document.getElementById('root'));

export default Login;

serviceWorker.unregister();
