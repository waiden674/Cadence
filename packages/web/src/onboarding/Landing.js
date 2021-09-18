import React from "react";
import "./Landing.css";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

const Landing = () => {
  return (
    <div className="landing-container">
      <Link to="/">
        <div
          className="landing-logo"
          style={{ backgroundColor: "grey", width: "9vw", height: "5vh" }}
        ></div>
      </Link>
      <div className="landing-content">
        <section className="landing-text">
          <h1 className="landing-title">Project Name Here</h1>
          <p className="landing-tag">A remote hackathon tool.</p>
          <Link to="/signin">
            {" "}
            <button className="landing-button">Get Started</button>
          </Link>
        </section>
        <div
          className="landing-image"
          style={{ backgroundColor: "grey", width: "45vw", height: "80vh" }}
        ></div>
      </div>
    </div>
  );
};

export default Landing;
