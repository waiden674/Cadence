import React, {useState} from 'react'
import {AiFillCaretRight, AiFillCaretDown} from "react-icons/ai";
import {IoIosAdd} from "react-icons/io";
import Timebar from '../components/Timebar';
import "./Plan.css";
import bullet from "../assets/bullet.svg";

const colorProgression = ["#973F64", "#6B67CA"];

const Plan = () => {
    const [addOptionsOpen, setAddOptionsOpen] = useState(false);
    const [addTaskOpen, setAddTaskOpen] = useState(false);
    const [addPhaseOpen, setAddPhaseOpen] = useState(false);



    const closeAddOptions = () => setAddOptionsOpen(false);
    const openAddOptions = () => setAddOptionsOpen(true);

    const handleAddTask = () => {
        closeAddOptions();
        setAddTaskOpen(true);
    }

    const handleCancelTask = () => {
        setAddTaskOpen(false);
    }

    const handleAddPhase = () => {
        closeAddOptions();
        setAddPhaseOpen(true);
    }

    const handleCancelPhase = () => {
        setAddPhaseOpen(false);
    }

    return (
        <div className="plan-container">
            <section className="plan-content">
                <h1 className="plan-title">Plan</h1>
                <hr className="title-underline"></hr>
                <button className="plan-btn" onClick = {() => setAddOptionsOpen(true)}><i><IoIosAdd size={30} /></i>Add</button>

                <div className="add-options" style={addOptionsOpen? {display: "flex"}: {display: "none"}} onMouseOut={()=> setAddOptionsOpen(false)}>
                    <div className="option" id="task-option">Task</div>
                    <hr className="option-line"></hr>
                    <div className="option" id="phase-option">Phase</div>
                </div>

                <section className="phases-section">
                <h2>All Phases</h2>

                <div className="phase" id="phase-1">
                    <section className="phase-header">
                        <AiFillCaretRight />
                    <h3>Planning and Research</h3>
                    </section>
                    <ul className="task-list">
                        <li>Create Schedule</li>
                        <li>Conduct User Research</li>
                    </ul>
                </div>
                <div className="phase" id="phase-2">
                    <section className="phase-header">
                        <AiFillCaretRight />
                    <h3>Brainstorm</h3>
                    </section>
                    <ul className="task-list" style={{listStyleImage: "url({bullet})"}}>
                        <li>Choose Prompt</li>
                        <li>Conduct Market Research</li>
                    </ul>
                </div>
            </section>
            </section>
            <Timebar />
        </div>
    )
}

export default Plan
