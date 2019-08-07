import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

class Teufelsberg extends React.Component {
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
          <h1>Teufelsberg</h1>
          <br/>
          <p>
            Teufelsberg (which is German for Devil’s Mountain) is a man-made hill that sits in West Berlin and north of the Grunewald Forest.
            Perhaps that doesn’t sound very interesting, but in fact it’s the perfect place for a relaxing hike and a leisurely tour of the world’s
            largest graffiti park. There are other quirky art installations and a cafe as well.
          </p>
          <br/>
          <p>
            The hill on which it sits is built with rubble from the bombings in West Berlin during World War II and raises Teufelsberg
            approximately 120.1 meters above the rest of Berlin. Originally, there was a Nazy military technical college being built on
            the location where the Teufelsberg stands today. In the 1950s, the Allies attempted to demolish the school, but when unsuccessful,
            it proved easier to bury in debris instead.
          </p>
          <br/>
          <p>
            After a brief transformation into a skip jump in 1955, the Teufelsberg became a listening station for the US National Security
            Agency in 1961 during the Cold War to spy on East Germany and the Russians. This was especially important as the Americans and
            British wanted to make sure that there was no sketchy business going on with the Warsaw Pact. The Americans and British chose
            to place the station atop Teufelsberg because it was the tallest point in West Berlin at that time and would thus provide the
            best reception and listening ability. Supposedly, at the height of the Cold War, over 1500 spies worked at the Teufelsberg.
            Though this is all very loosely confirmed speculation as there is still a lot of mystery surrounding the real reason for the
            NSA’s presence in Berlin at the time.
          </p>
          <br/>
          <p>
            As you will see, the Field Station Berlin (as it was called) is made up of globes attached atop tall cylindrical structures.
            Each globe contained satellite antennas which allowed the NSA to intercept satellite signals, radio waves, and other transmissions.
            After the end of the Cold War, Field Station Berlin no longer had any use and was abandoned and (in classic Berlin fashion) was
            quickly filled with fantastic wall murals and works of graffiti on every surface. If you are given the chance to climb atop one
            of the towers, you will witness a fantastic view of Berlin.

          </p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<Teufelsberg />, document.getElementById('root'));

export default Teufelsberg;
