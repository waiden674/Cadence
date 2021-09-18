import React, {useState} from 'react'
import { Link } from "react-router-dom";
import "./Onboard2.css";

const Onboard2 = () => {

    const [start, setStart] = useState();
    const [end, setEnd] = useState();

    const setStartTime = (event) => {
        var startTime = event.target.value;
        setStart({
            month: startTime.slice(5, 7),
            day: startTime.slice(-8, -6),
            year: startTime.slice(0, 4),
            hour: startTime.slice(-5, -3),
            minute: startTime.slice(-2),
        })

        console.log(start)
    }

   const setEndTime = (event) => {
        var endTime = event.target.value;
        setEnd({
            month: endTime.slice(5, 7),
            day: endTime.slice(-8, -6),
            year: endTime.slice(0, 4),
            hour: endTime.slice(-5, -3),
            minute: endTime.slice(-2),
        })

        console.log(end)
    }


    return (
        <div className="onboard2-container">
            <h1 className="onboard2-title">Let's Get Started</h1>
            <p className="onboard2-tag">We just need some more information about the hackathon.</p>

            <form className="onboard2-form">
            <label className="onboard2-label">Hackathon Name</label>
            <input type="text" className="onboard2-input" id="hack-name" required></input>

            <section className="onboard2-col">
                <div className="input-group">
                    <label className="onboard2-label">Start Time</label>
                    <input className="onboard2-input" type="datetime-local" id="date-time" onChange={setStartTime} required></input>
                </div>
                <div className="input-group">
                    <label className="onboard2-label">End Time</label>
                    <input className="onboard2-input" type="datetime-local" id="date-time" onChange={setEndTime} required></input>
                </div>
            </section>
            <Link to="/onboard2"> <button className="onboard-button" type="submit" >Next</button></Link>
            </form>
        </div>
    )
}

export default Onboard2
