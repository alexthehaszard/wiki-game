import React, { Component } from "react";

class Rules extends Component {
  state = {};
  render() {
    return (
      <div className="rules">
        <h1>The rules of Wiki Races</h1>
        <ul>
          <li>You cannot use Search</li>
          <li>No using the back button in your browser (or on your mouse).</li>
          <li>
            No using anything in or below the "See Also" section on a page.
          </li>
          <li>No outside websites allowed.</li>
          <li>
            You are allowed to go back if there are no links on a page or if you
            accidentally go to another website.
          </li>
          <li>You cannot use "Find" (or ctrl-f).</li>
        </ul>
      </div>
    );
  }
}

export default Rules;
