import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

class BerlinerUnterwelten extends React.Component {
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
          <h1>Berliner Unterwelten</h1>
          <br/>

          <p>
            Berlin is a city littered with history--much of which still remains all throughout the city if you know
            where to look. While there is more than enough to see in Berlin above ground, it is the underground
            bunkers that give you a look into the reality of citizens during the height of World War II. Located
            in Northern Berlin is the Berliner UnterWelten EV that provide tours to explore some of these remaining
            bunkers all throughout Berlin. They provide many different tours in many different languages and the tour
            guides truly provide plenty of intriguing information about not only the underground, but the culture of
            Berlin at the time.
          </p>
          <br/>
          <p>
            The most classic tour is of the civilian bunker located in the Gesundbrunnen U-Bahn station. The entrance
            is extremely inconspicuous: an unmarked, simple steel green door that blends in with the green tiled walls.
            This tour teaches you a lot about the everyday reality for Berliners at the time as they had to scurry to
            safety underground. As simple as it seems, this bunker showed the innovative prowess of Germany even at the
            time. One such case is the luminescent walls that glow in the dark in case of a power outage (which were
            extremely common) and allow for time to find an exit or to light up a candle before the pitch blackness sets
            in. This tour also contained many small exhibits and such alongside the in-depth tour given by the guides.
            One such exhibit included the many remnants of soldier and war paraphernalia that were uncovered in the rubble.
            And while much has been dug up, it is estimated that there are still 3000 undetonated bombs that lie below
            Berlin that still have yet to be found and defused. In general, this tour provided a very immersive look
            into a civilian bunker and a snippet of the cold reality of the Berliners during World War II.
          </p>
          <br/>
          <p>
            Other common tours by Berliner Unterwelten include a tour of one of the remaining “Flak” towers or
            anti-aircraft towers and the bunker there, a tour of a civil defense shelters built during the Cold War
            in preparation for nuclear war, or a tour of the escape tunnels underneath the Berlin wall.
          </p>
          <br/>
          <p>
            It doesn’t matter the tour, all exhibits provide a more tangible and reality to the stories read in
            textbooks. It is truly a fantastic and education experience for those who wish to explore more of Berlin’s
            rich history and the scars of the past.
          </p>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<BerlinerUnterwelten />, document.getElementById('root'));

export default BerlinerUnterwelten;
