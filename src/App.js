import React, { Component } from "react";
import "./App.css";
import wiki from "wikijs";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      allowClick: true,
      one: "waiting for click",
      two: "waiting for click",
      linkOne: "#",
      linkTwo: "#",
    };
  }

  async getInfo() {
    if (!this.state.allowClick) return;
    this.setState({
      allowClick: false,
    });
    const start = new Date();
    const pages = await wiki().random(100);
    const searched = [];
    let greatest = [
      { length: 0, title: "", link: "" },
      { length: 0, title: "", link: "" },
    ];
    pages.map((p) => {
      return searched.push(wiki().page(p));
    });
    const final = await Promise.all(searched);
    final.forEach((p) => {
      if (p.raw.length > greatest[0].length) {
        greatest[0].title = p.raw.title;
        greatest[0].length = p.raw.length;
        greatest[0].link = p.raw.fullurl;
      } else if (p.raw.length > greatest[1].length) {
        greatest[1].title = p.raw.title;
        greatest[1].length = p.raw.length;
        greatest[1].link = p.raw.fullurl;
      }
    });
    console.log(greatest);
    this.setState({
      one: greatest[1].title,
      two: greatest[0].title,
      linkOne: greatest[1].link,
      linkTwo: greatest[0].link,
      allowClick: true,
    });
    console.log("elapsed:", new Date() - start);
  }

  render() {
    return (
      <main>
        <button onClick={() => this.getInfo()}>get info</button>
        <a href={this.state.linkOne}>{this.state.one}</a>
        <a href={this.state.linkTwo}>{this.state.two}</a>
      </main>
    );
  }
}

export default App;
