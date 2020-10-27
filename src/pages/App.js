import React, { Component } from "react";
import "../App.css";
import WikiPage from "../components/wikiPage";
import wiki from "wikijs";

class App extends Component {
  constructor(props) {
    super();
    this.state = {
      allowClick: true,
      titles: ["Wiki Page 1", "Wiki Page 2"],
      links: ["#", "#"],
      descriptions: [
        "This is a description of a wiki page.",
        "This is a description of a wiki page.",
      ],
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

    // get a million pages as it is the same speed to get one page as it is to get 1 million so we can have more variation
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

    // get the largest articles and put them in an array for later use
    final.forEach((p) => {
      console.log(p);
      if (
        p.raw.length > greatest[0].length &&
        !p.raw.title.includes("List") &&
        !p.raw.title.includes("Glossary")
      ) {
        greatest[0] = {
          raw: p,
          title: p.raw.title,
          length: p.raw.length,
          link: p.raw.fullurl,
        };
      } else if (
        p.raw.length > greatest[1].length &&
        !p.raw.title.includes("List") &&
        !p.raw.title.includes("Glossary")
      ) {
        greatest[1] = {
          raw: p,
          title: p.raw.title,
          length: p.raw.length,
          link: p.raw.fullurl,
        };
      }
    });
    const titles = [];
    greatest.map((p) => {
      return titles.push(p.raw.summary());
    });
    const descs = await Promise.all(titles);
    // reverse the greatest array so that the right item is the largest
    greatest.reverse();
    descs.reverse();

    // update the state of the component by making a new state with all of the new information
    const tempState = this.state;
    for (let i = 0; i < infoChange.length; i++) {
      if (infoChange[i]) {
        tempState.titles[i] = greatest[i].title;
        tempState.links[i] = greatest[i].link;
        tempState.descriptions[i] = descs[i].substring(0, 400) + "...";
      }
    }
    tempState.allowClick = true;
    tempState.isLoading = "d-none";
    this.setState(tempState);

    console.log("elapsed:", new Date() - start);
  }

  render() {
    return (
      <div>
        <div className={"loader" + this.state.isLoading}></div>
        <div className={"container" + this.state.isLoading}></div>

        <main>
          <button
            onClick={() => this.getInfo([true, true])}
            className="link-button"
          >
            Get new pages
          </button>
          <div className="wiki-page-container">
            <WikiPage
              title={this.state.titles[0]}
              description={this.state.descriptions[0]}
              classes="wiki-page-button b1"
              handleClick={() => this.getInfo([true, false])}
              link={this.state.links[0]}
            />
            <WikiPage
              title={this.state.titles[1]}
              description={this.state.descriptions[1]}
              classes="wiki-page-button b2"
              handleClick={() => this.getInfo([false, true])}
              link={this.state.links[1]}
            />
          </div>
        </main>
      </div>
    );
  }
}

export default App;
