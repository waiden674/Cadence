import React from 'react'
import Sidebar from '../components/Sidebar'
import "./Dashboard.css";
import blob from "../assets/blob.svg";
import {BiChevronLeftCircle, BiChevronRightCircle, BiChevronRight} from "react-icons/bi"

// props= firstName
const Dashboard = (props) => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <div className="dash-main">
                <h1 className="dash-welcome">Welcome {props.firstName}</h1>
                <hr></hr>
                <section className="team-section">
                    <h2 className="dash-header">Team</h2>
                    <section className="team-lineup">
                        <button className="add-member-btn"><img src={blob} className="blob"></img></button>
                        <div className="team-member-icon"></div>
                        <div className="team-member-icon"></div>
                        <div className="team-member-icon"></div>
                    </section>
                </section>
                <section className="tasks-section">
                    <section id="tasks-section-header">
                        <h2 className="dash-header" id="tasks">Tasks</h2>
                        <section className="btn-group">
                        <button className="add-task-btn">Add Task</button>
                        <i><BiChevronLeftCircle size={30}/></i>
                        <i><BiChevronRightCircle size={30}/></i>
                        </section>
                    </section>
                    <section className="tasks-lineup">
                        <div className="task-group">
                            <div className="task">
                                <h3>Create Schedule</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
                            </div>
                            <div className="task-team">
                                <div className="task-team-icon">
                                </div>
                                <div className="task-team-icon">
                                </div>
                                <div className="task-team-icon">
                                </div>
                                <div className="task-team-icon">
                                </div>
                            </div>
                        </div>

                        <div className="task-group">
                            <div className="task">
                                <h3>Conduct User Research</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
                            </div>
                            <div className="task-team">
                                <div className="task-team-icon">
                                </div>
                                <div className="task-team-icon">
                                </div>
                            </div>
                        </div>
                    </section>
                </section>
                <section className="phase-section">
                    <section className="phase-section-header">
                        <h2 className="dash-header">Phase</h2>
                        <button className="add-task-btn">View All</button>
                    </section>
                    <div className="current-phase"> <h3>Planning and Research</h3> <BiChevronRight/> </div>
                </section>
            </div>
        </div>
    )
}

Dashboard.defaultProps = {
    firstName: "John"
}

export default Dashboard
