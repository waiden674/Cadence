import React from 'react'
import blob from "../assets/blob.svg";
import {BiChevronLeftCircle, BiChevronRightCircle, BiChevronRight} from "react-icons/bi"
import "./Home.css";
import Timebar from '../components/Timebar';
import pfp1 from "../assets/pfp1.jpeg";
import pfp2 from "../assets/pfp2.jpeg";
import pfp3 from "../assets/pfp3.jpeg";
import pfp4 from "../assets/pfp4.jpeg";
import pfp5 from "../assets/pfp5.jpeg";
import pfp6 from "../assets/pfp6.jpeg";



const Home = (props) => {
    return (
        <>
       <div className="dash-main">
                <h1 className="dash-welcome">Welcome {props.firstName}</h1>
                <hr></hr>
                <section className="team-section">
                    <h2 className="dash-header">Team</h2>
                    <section className="team-lineup">
                        <button className="add-member-btn"><img src={blob} className="blob"></img></button>
                        <img src={pfp1} className="team-member-icon"></img>
                        <img src={pfp2} className="team-member-icon"></img>
                        <img src={pfp3} className="team-member-icon"></img>
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
                                <img src={pfp1} className="task-team-icon">
                                </img>
                                <img src={pfp3} className="task-team-icon">
                                </img>
                                <img src={pfp6} className="task-team-icon">
                                </img>
                                <img src={pfp4} className="task-team-icon">
                                </img>
                            </div>
                        </div>

                        <div className="task-group">
                            <div className="task">
                                <h3>Conduct User Research</h3>
                                <p>Lorem ipsum dolor sit amet, consectetur adipiscing...</p>
                            </div>
                            <div className="task-team">
                                <img src={pfp2} className="task-team-icon">
                                </img>
                                <img src={pfp5} className="task-team-icon">
                                </img>
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
            <Timebar />
            </>
    )
}

export default Home
