import React from 'react'
import Sidebar from '../components/Sidebar'
import "./Dashboard.css";
import blob from "../assets/blob.svg";

// props= firstName
const Dashboard = (props) => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dash-main">
                <h1 className="dash-welcome">Welcome {props.firstName}</h1>
                <section className="team-section">
                    <h2 className="dash-header">Team</h2>
                    <section className="team-lineup">
                        <button className="add-member-btn"><img src={blob} className="blob"></img></button>
                        <div className="team-member-icon"></div>
                        <div className="team-member-icon"></div>
                        <div className="team-member-icon"></div>
                    </section>
                </section>
            </div>
        </div>
    )
}

Dashboard.defaultProps = {
    firstName: "John"
}

export default Dashboard
