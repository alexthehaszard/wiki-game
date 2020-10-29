import React, { Component } from "react";

class About extends Component {
  state = {};
  render() {
    return (
      <div className="box">
        <h1>About Wiki Races</h1>
        <p>
          A wiki race is a game where you are given 2 pages on Wikipedia, and
          you are trying to get from one of them to the other using only the
          links on the page. Check the rules for more info.
        </p>
      </div>
    );
  }
}

export default About;
