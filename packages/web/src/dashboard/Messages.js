import React from 'react'
import "./Messages.css";
import {AiOutlineUserAdd, AiOutlineLink, AiOutlineSmile, AiOutlineSend} from "react-icons/ai";
import pfp5 from "../assets/pfp5.jpeg";


const Messages = () => {
    return (
        <div className="messages-container">
            <section className="messages-col-1">
                <h1 className="messages-title">Messages</h1>
                <hr></hr>
                <div className="list-chat">
                    <img src={pfp5} className="chat-profile-pic"></img>
                    <section className="list-chat-col">
                        <h4 className="list-chat-name">Kevin Smith</h4>
                        <p className="list-chat-preview">Made a survey with...</p>
                    </section>
                </div>
            </section>
            <hr id="vr"></hr>

            <section className="messages-col-2">
                <section className="messages-col-2-header">
                    <h2>Kevin Smith</h2>
                    <AiOutlineUserAdd size={30}/>
                </section>
                <hr id="col-2-hr"></hr>
                <div className="message-group">
                    <img src={pfp5} className="chat-profile-pic" id="message-pic"></img>
                    <section className="textbox-container">
                        <div className="textbox"><p>Made a survey with the questions we came up yesterday :)</p></div>
                        <p>10:30 AM</p>
                    </section>
                </div>

               <section className="textbox-container" id="right-message">
                        <div className="textbox"><p>Awesome!</p></div>
                        <p>10:35 AM</p>
                 </section>

                  <section className="message-input-container">
                     <input type = "text" className="message-input" placeholder = "Type your message"></input>
                     <section className="message-icons">
                         <i><AiOutlineLink size={25}/></i>
                         <i><AiOutlineSmile size={25} /></i>
                         <i id="send"><AiOutlineSend size={25} /></i>
                     </section>
                 </section>
            </section>

        </div>
    )
}

export default Messages
