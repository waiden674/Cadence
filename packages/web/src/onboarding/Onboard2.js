import React, {useState} from 'react'
import { Link } from "react-router-dom";
import "./Onboard2.css";

const Onboard2 = () => {
    return (
        <div className="onboard2-container">
            <h1 className="onboard2-title">Let's Get Started</h1>
            <p className="onboard2-tag">We just need some more information about the hackathon.</p>

            <form className="onboard2-form">
            <label className="onboard2-label">Hackathon Name</label>
            <input type="text" className="onboard2-input" id="hack-name"></input>

            <section className="onboard2-col">
                <div className="input-group">
                    <label className="onboard2-label">Start Time</label>
                    <input className="onboard2-input" type="datetime-local" id="date-time"></input>
                </div>
                <div className="input-group">
                    <label className="onboard2-label">End Time</label>
                    <input className="onboard2-input" type="datetime-local" id="date-time"></input>
                </div>
            </section>
            <Link to="/onboard2"> <button className="onboard-button" >Next</button></Link>
            </form>
        </div>
    )
}

export default Onboard2
