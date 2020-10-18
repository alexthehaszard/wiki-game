import React, { Component } from "react";
import "../App.css";

class WikiPage extends Component {
  constructor(props) {
    super();
    this.state = {};
  }
  render() {
    return (
      <div className="wiki-page">
        <h1>{this.props.title}</h1>
        <p>{this.props.description}</p>
        <button className={this.props.classes} onClick={this.props.handleClick}>
          Get new page
        </button>
      </div>
    );
  }
}

export default WikiPage;
