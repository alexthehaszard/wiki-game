import React, { Component } from "react";
import "./App.css";
import WikiPage from "./components/wikiPage";
import wiki from "wikijs";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      allowClick: true,
      one: "Wiki Page 1",
      two: "Wiki Page 2",
      linkOne: "#",
      linkTwo: "#",
      descOne: "This is a description of a wiki page.",
      descTwo: "This is a description of a wiki page.",
      isLoading: "d-none",
    };
  }

  async getInfo(infoChange) {
    if (!this.state.allowClick) return;
    this.setState({
      allowClick: false,
      isLoading: "",
    });
    const start = new Date();
    const pages = await wiki().random(1000000);
    const searched = [];
    let greatest = [
      { raw: {}, length: 0, title: "", link: "", desc: "" },
      { raw: {}, length: 0, title: "", link: "", desc: "" },
    ];
    pages.map((p) => {
      return searched.push(wiki().page(p));
    });
    const final = await Promise.all(searched);
    final.forEach((p) => {
      console.log(p);
      if (
        p.raw.length > greatest[0].length &&
        !p.raw.title.includes("List") &&
        !p.raw.title.includes("Glossary")
      ) {
        greatest[0].raw = p;
        greatest[0].title = p.raw.title;
        greatest[0].length = p.raw.length;
        greatest[0].link = p.raw.fullurl;
      } else if (
        p.raw.length > greatest[1].length &&
        !p.raw.title.includes("List")
      ) {
        greatest[1].raw = p;
        greatest[1].title = p.raw.title;
        greatest[1].length = p.raw.length;
        greatest[1].link = p.raw.fullurl;
      }
    });
    const titles = [];
    greatest.map((p) => {
      return titles.push(p.raw.summary());
    });
    const descs = await Promise.all(titles);
    console.log(greatest);
    if (infoChange[0]) {
      this.setState({
        one: greatest[1].title,
        linkOne: greatest[1].link,
        descOne: descs[1].substring(0, 400) + "...",
        allowClick: true,
        isLoading: "d-none",
      });
    }
    if (infoChange[1]) {
      this.setState({
        two: greatest[0].title,
        linkTwo: greatest[0].link,
        descTwo: descs[0].substring(0, 400) + "...",
        allowClick: true,
        isLoading: "d-none",
      });
    }
    console.log("elapsed:", new Date() - start);
  }

  render() {
    return (
      <div>
        <div className={"loader" + this.state.isLoading}></div>
        <div className={"container" + this.state.isLoading}></div>

        <nav>
          <h1>Wiki Races!</h1>
        </nav>
        <main>
          <button
            onClick={() => this.getInfo([true, true])}
            className="link-button"
          >
            Get new pages
          </button>
          <div className="wiki-page-container">
            <WikiPage
              title={this.state.one}
              description={this.state.descOne}
              classes="wiki-page-button b1"
              handleClick={() => this.getInfo([true, false])}
              link={this.state.linkOne}
            />
            <WikiPage
              title={this.state.two}
              description={this.state.descTwo}
              classes="wiki-page-button b2"
              handleClick={() => this.getInfo([false, true])}
              link={this.state.linkTwo}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
