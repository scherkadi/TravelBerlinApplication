import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

class HolocaustMemorial extends React.Component {
  constructor(props) {
    super(props);
    this.state = {};
  }

  signOut() {
              document.cookie = ""
              console.log("Cookies: " + document.cookie)
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

        <div className="attraction-descr">
          <h1>Holocaust Memorial</h1>
          <p>
            The Holocaust memorial in Berlin is a memorial that commemorates the up to
            six million Jewish victims of the Nazi Holocaust and was designed by architect
            Peter Eisenman and engineer Buro Happold. The memorial is located in a city
            with one of the largest Jewish populations in Europe before the Second World War.
            The monument is situated on the former location of the Berlin Wall, where the
            “death strip” once divided Berlin. It consists of a 19,000 square meter site covered
            with 2,711 concrete slabs arranged in a grid pattern on a sloping field. An attached
            underground called “Place of Information” has the names of the 3 million Jewish
            Holocaust victims. The concrete slabs were designed to produce an uneasy, confusing
            atmosphere, and aimed to represent a supposedly ordered system that has lost touch
            with human reason.
          </p>

          <br/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<HolocaustMemorial />, document.getElementById('root'));

export default HolocaustMemorial;
