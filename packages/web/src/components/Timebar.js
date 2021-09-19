import React, {useState} from 'react'
import {BiBell} from "react-icons/bi";
import "./Timebar.css";
import {BiCopy} from "react-icons/bi";

// props = time
const Timebar = (props) => {
    const [timeLeft, setTimeLeft] = useState(props.time);
    return (
        <div className="timebar-container">
            <section className="row-1">
                <BiBell size={30}/>
                <div className="profile-pic"></div>
                
            </section>

            <section className="row-2">
                <h2>End of Hackathon</h2> 
                <section className="radial-bar">
                    <div className= "circle"><h3>{timeLeft}</h3></div>
                </section>
            </section>

            <section className="row-3">
                <h4>Invite to Team</h4>
                <div className="invite-link-container">
                    <p className="invite-link">https://somelink.com/somethingsomething</p>
                    <i><BiCopy /></i>
                </div>
            </section>
        </div>
    )
}

Timebar.defaultProps = {
    time: "00h 00m"
}

export default Timebar
