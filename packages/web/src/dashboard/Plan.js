import React from 'react'
import {AiFillCaretRight, AiFillCaretDown} from "react-icons/ri";
import {IoIosAdd} from "react-icons/io";
import Timebar from '../components/Timebar';
import "./Plan.css";

const Plan = () => {
    return (
        <div className="plan-container">
            <section className="plan-content">
                <h1 className="plan-title">Plan</h1>
                <hr></hr>
                <button className="plan-btn"><i><IoIosAdd size={30} /></i>Add</button>

                <div className="add-options">
                    <div className="option" id="task-option">Task</div>
                    <hr className="option-line"></hr>
                    <div className="option" id="phase-option">Phase</div>
                </div>

                <section className="phases-section">
                <h2>All Phases</h2>
                <div className="phase">

                </div>
            </section>
            </section>
            <Timebar />
        </div>
    )
}

export default Plan
