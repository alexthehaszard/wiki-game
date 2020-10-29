import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import React from "react";
import App from "./pages/App";
import Rules from "./pages/Rules";
import About from "./pages/About";

export default function Main() {
  return (
    <Router>
      <div>
        <nav>
          <h3>
            <Link to="/about">About the game</Link>
          </h3>

          <h1>
            <Link to="/">Wiki Races!</Link>
          </h1>

          <h3>
            <Link to="/rules">Rules</Link>
          </h3>
        </nav>

        <Switch>
          <Route path="/about">
            <About />
          </Route>

          <Route path="/rules">
            <Rules />
          </Route>

          <Route path="/">
            <App />
          </Route>
        </Switch>
      </div>
    </Router>
  );
}
