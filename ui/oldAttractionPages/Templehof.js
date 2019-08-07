import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

class Templehof extends React.Component {
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
          <h1>Templehof</h1>
          <br/>
          <p>
            Templehof was one of the first airports in Berlin, Germany. It was officially designated as an airport in
            1923 and eventually closed its doors in 2007 with the expansion of the Berlin-Schonefeld Airport. With a rich history including its heavy presence in World War II and
            the Cold War, coupled with its vast green fields open for recreational use, the Templehof Airfield is a must-see
            tourist destination in Berlin, Germany.
          </p>

          <p>
            When visiing Templehof, make sure to stroll around the original aircraft runway, take a bike ride, or simply relax
            in the vast open fields. Also learn about the history of the field along with its many uses in the 1900s by reading
            the multitude of informational signs posted throughout the area. A major attraction point in the field is the
            original aircraft used in the Berlin Airlift.
          </p>

          <p>
            Looking to get an in-depth lesson about the history of the Nazi-architecture of the Airport itself? Sign up for a
            guided tour of all buildings that remain on the grounds.
          </p>
          <br/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Templehof />, document.getElementById('root'));

export default Templehof;
