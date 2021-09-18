import React, {useState} from 'react'
import "./Dashboard.css";
import Home from './Home';
import Messages from './Messages';
import { CgMenuLeft, CgHome } from "react-icons/cg";
import { RiMessage3Fill, RiSettings3Line } from "react-icons/ri";
import {BiCalendarEdit, BiBulb} from "react-icons/bi";
import "../components/Sidebar.css";

// props= firstName
const Dashboard = (props) => {
    const [tab, setTab] = useState("home");

    return (
        <>
         <div className="sidebar-container">
            <i id="menu"><CgMenuLeft size={20}/></i>
            <section className="menu-center">
               <div className="icon-container" id={tab === "home"? "active": null} onClick = {() => setTab("home")}> <i id="home"><CgHome size={25}/></i></div>
               <div className="icon-container" id={tab === "chat"? "active": null} onClick = {() => setTab("chat")}><i id="chat"> <RiMessage3Fill size={25}/></i></div> 
               <div className="icon-container" id={tab === "plan"? "active": null} onClick = {() => setTab("plan")}><i id="plan"> <BiCalendarEdit size={25}/></i></div> 
                <div className="icon-container" id={tab === "brainstorm"? "active": null} onClick = {() => setTab("brainstorm")}><i id="brainstorm"> <BiBulb size={25}/></i></div>
           </section>
            <i id="settings"><RiSettings3Line size={25}/></i>
        </div>


        <div className="dashboard-container">
            
           {tab === "home"? <Home />: null}
            {tab === "chat"? <Messages />: null}
            {/* <Messages /> */}
        </div>
        </>
    )
}

Dashboard.defaultProps = {
    firstName: "John"
}

export default Dashboard
