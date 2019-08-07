import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

class BrandenburgGate extends React.Component {
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
          <h1>Brandenburg Gate</h1>
          <br/>
          <p>
            Brandenburg Gate is a large monument that is 26 meters in height and 65 meters in width. It consists of 12 Doric columns, 6 on each side, and at the top sits the Quadriga, a scultpture of a chariot drawn by horses.
          </p>
          <p>
            Brandenburg Gate was built between 1788 and 1791, inspired by the gateway in the Acropolis in Athens. Designed by Carl Gotthard Langhans, it is one of the first neoclassical monuments in Germany. It was  built on the orders of Frederick William II, the king of Prussia at the time.
            In 1806, Napoleon Bonaparte defeated Prussia, and after a victory procession through the gate, took the Quadriga atop the gate to Paris. It, however, was restored in 1814 after Napoleon's defeat in Paris.
           </p>
          <p>
            It also serves as a symbol of unification between East and West Germany. It was excluded from the division of Berlin by the Berlin Wall. Thus, it was inaccesible to everyone. However, when the wall came down, hundreds of thousands gathered
            for the  official opening of the wall. Days later, both sides of once-divided Berlin gathered here to celebrate the New Year, and the wall began to serve a symbol of unity and peace in Berlin.
          </p>
          <p>
            Today, the Brandenburg Gate recieves over 10 million visitors each year. Located in mitte, the  center, it is located in proximity to many other attractions. These include the Holocaust Memorial and the Reichstag. Today, it is the most famous landmark in Berlin.
          </p>
          <br/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<BrandenburgGate />, document.getElementById('root'));

export default BrandenburgGate;
