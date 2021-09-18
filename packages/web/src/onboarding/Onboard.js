import React, {useState} from 'react'
import { AiFillCloseCircle } from "react-icons/ai";
import "./Onboard.css";


{/*Props: firstName */}
const Onboard = (props) => {
    const [skills, setSkills] = useState([]);
    const [bio, setBio] = useState();

    // adds a skill to the "skills" list state
    const newSkill = (event) => {
        if (event.key === "Enter"){
            var skill = event.target.value;
            if(!skills.includes(skill)){
                setSkills([...skills, event.target.value]);
                event.target.value = "";
            }
        }
        
    }

    // deletes skill from the "skills" list state
    const deleteSkill = (indexToDelete) => {
        setSkills(skills.filter((_, index)=> index !== indexToDelete))
        console.log(skills)
    }

    // sets bio state
    const updateBio = (event) => {
        setBio(event.target.value);
    }
    
    return (
        <div className="onboard-container">
            <div
            style={{ backgroundColor: "grey", width: "9vw", height: "5vh" }}
          ></div>
            <section className="onboard-content">
            
            <h1 className="onboard-title">Hello {props.firstName}!</h1>
            <p className="onboard-tag">We want to get to know you more.</p>

            {/* Onboarding Form */}
            <div className="onboard-form">


                <label className="onboard-label">Bio</label>
                <textarea className="onboard-bio-input" id="bio" onChange = {updateBio} placeholder="Tell us a little bit about yourself..." ></textarea>


                <label className="onboard-label">Skills</label>
                <div className="tag-input-container">
                    {skills.map((skill, index) => {
                        return <span className="skill" key={index}><p>{skill}</p> <i onClick = {()=>deleteSkill(index)}><AiFillCloseCircle size={15}/></i></span>
                    })}
                    <input type="text" className="onboard-skills-input" onKeyUp={newSkill}></input>
                </div>
                <button className="onboard-button" >Done</button>
            </div>
</section>
        </div>
    )
}

Onboard.defaultProps = {
    firstName: "User",
}
export default Onboard
