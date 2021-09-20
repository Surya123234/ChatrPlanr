import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import "../landing.css";
import logo from "../htn_logo.png";

const Landing = () => {
  const [value, setValue] = useState("");
  const history = useHistory();

  return (
    <div className="full-container">
      <div className="left-container">
        <h1 className="header">
          Welcome to <br></br> Chatr Planr.
        </h1>
        <p className="subheader">The new way to streamline planning.</p>
        <p className="prompt">Enter your room code to start!</p>
        <div className="entry">
          <form
            onSubmit={() => {
              history.push(`/id/${value}`);
            }}
          >
            <label>
              <input
                className="input-field"
                type="text"
                placeholder="Enter your room code here"
                value={value}
                onChange={(event) => {
                  setValue(event.target.value);
                }}
              />
            </label>
            <button className="submit" type="submit">
              Submit
            </button>
          </form>
        </div>
      </div>
      <div className="right-container">
        <img className="logo" src={logo} alt="calendar with speech bubbles" />
      </div>
    </div>
  );
};

export default Landing;
