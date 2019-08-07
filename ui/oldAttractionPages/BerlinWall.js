import React from 'react';
import ReactDOM from 'react-dom';
import '../src/index.css';

class BerlinWall extends React.Component {
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
          <h1>Berlin Wall</h1>
          <p>
            The Berlin Wall was a wall that divided Berlin during the years 1960 to 1989.
            When World War II came to an end in 1945, the Allied peace conferences at Yalta
            and Potsdam led to the decision to split Germany’s territories into four allied
            occupation zones. Eastern part of Germany went to the Soviet Union, while the
            western part of Germany went to the United States, Great Britain, and France.
            The city of Berlin was also split into similar zones, with Soviets occupying eastern
            Berlin and Allies occupying western Berlin. In an attempt to drive out the United
            States, Britain and France out of Berlin, the Communist government of the German
            Democratic Republic (East Germany) began to build a wall between East and West
            Berlin. The Berlin Wall was 12 feet tall and 4 feet wide and was made of concrete
            topped with an enormous pipe that made climbing over nearly impossible. Before the
            Berlin Wall was built, Germans living in Berlin were able to move around freely between
            eastern and western Berlin. After the Berlin Wall was built, it became impossible for
            Germans to get from East to West Berlin except through the three checkpoints called
            Checkpoint Alpha, Checkpoint Bravo and Checkpoint Charlie. At each of the three
            checkpoints, East German soldiers screened diplomats and other officials before
            they were allowed to enter or leave. Except under special circumstances, travelers
            from East and West Berlin were rarely allowed to cross the border. In all, at least
            170 people were killed while attempting to cross the Berlin Wall to escape East Germany.
            Through the effort known as the Berlin Airlift, the United States and its allies
            supplied their sectors of Berlin from the air, delivering more than 2.3 million
            tons of food, fuel, and other goods to West Berlin. In 1989, political changes
            in Eastern Europe and civil unrest in Germany put pressure on the East German
            government to loosen some of its regulations on travel to West Germany.
          </p>

          <br/>
        </div>
      </div>
    );
  }
}

ReactDOM.render(<BerlinWall />, document.getElementById('root'));

export default BerlinWall;
