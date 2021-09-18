import React, {useState} from 'react'
import { CgMenuLeft, CgHome } from "react-icons/cg";
import { RiMessage3Fill, RiSettings3Line } from "react-icons/ri";
import {BiCalendarEdit, BiBulb} from "react-icons/bi";
import "./Sidebar.css";

//props = tab, shows which tab is acive
const Sidebar = (props) => {
    const [tab, setTab] = useState(props.tab);

    return (
        <div className="sidebar-container">
            <i id="menu"><CgMenuLeft size={20}/></i>
            <section className="menu-center">
               <div className="icon-container" id={tab === "home"? "active": null} onClick = {() => setTab("home")}> <i id="home"><CgHome size={25}/></i></div>
               <div className="icon-container" id={tab === "chat"? "active": null} onClick = {() => setTab("chat")}><i id="chat"> <RiMessage3Fill size={25}/></i></div> 
               <div className="icon-container" id={tab === "plan"? "active": null} onClick = {() => setTab("plan")}><i id="plan"> <BiCalendarEdit size={25}/></i></div> 
                <div className="icon-container" id={tab === "home"? "brainstorm": null} onClick = {() => setTab("brainstorm")}><i id="brainstorm"> <BiBulb size={25}/></i></div>
           </section>
            <i id="settings"><RiSettings3Line size={25}/></i>
        </div>
    )
}

Sidebar.defaultProps = {
    tab: "home",
}

export default Sidebar
