import React from "react";
import { AiFillGithub } from "react-icons/ai";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import "./SignIn.css";

const SignIn = () => {
  return (
    <div className="signin-container">
      <section className="signing-left-col">
        {/* Temporary logo placeholder */}
        <Link to="/">
          <div
            className="signin-logo"
            style={{ backgroundColor: "grey", width: "9vw", height: "5vh" }}
          ></div>
        </Link>
        <h1 className="signin-title">Sign In</h1>
        <p className="signin-tag">
          See how your team is doing by signing in with your <mark>Github</mark>{" "}
          account
        </p>

        {/* Github Link Button */}
        <button className="github-button">
          <div className="github-button-div">
            <AiFillGithub size={60} />
            <p>Sign In with Github Account</p>
          </div>
        </button>

        <a href="https://github.com/" target="_blank">
          <p className="signin-link">Don't have a Github account? Sign up here.</p>
        </a>
      </section>
      <section className="signin-right-col">
        {/* Temporary visual placeholder*/}
        <div
          className="signin-img"
          style={{ backgroundColor: "grey", width: "40vw", height: "90vh" }}
        ></div>
      </section>
    </div>
  );
};

export default SignIn;
