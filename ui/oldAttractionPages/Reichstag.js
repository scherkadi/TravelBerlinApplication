import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

class Reichstag extends React.Component {
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
          <h1>Reichstag</h1>
          <br/>
          <p>
            The Reichstag building, officially known as the German Bundestag, is the national parliament building
            of the Federal Republic of Germany. The original building was opened in 1864; however, the new and improved
            version visitors see today is a different version of the building. After going through severe damages after
            a large fire and World War II, the modern Bundestag was reopened in 1999.
          </p>
          <br/>
          <p>
            The Reichstag is an amazing spot for new visitors in Berlin. The building, while being a working government
            body, also houses a large glass dome at the very top. The dome provides visitors with a beautiful
            360-degree view of the city of Berlin. The top of the dome can be accessed via a large spiral walkway,
            allowing amazing photo opportunities at different levels of the dome. If you want to learn a little more
            about the city of Berlin as you ascend the dome, make sure to grab an audio guide at the front desk before
            you start your climb.
          </p>
          <br/>
          <p>
            Booking a visit to the Reichstag is free of charge! Make sure you book online at www.bundestag.de several
            days ahead of time to ensure a spot at the dome. It is possible to buy tickets at the Reichstag itself;
            however, spots are often limited or unavailable.
          </p>
          <br/>
          <p>
            Make sure to visit the Reichstag building during your visit to Berlin to learn a little more about the
            German government and enjoy an amazing view of the vast city.
          </p>
          <br/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Reichstag />, document.getElementById('root'));

export default Reichstag;
