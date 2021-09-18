import React from 'react'
import "./Messages.css";

const Messages = () => {
    return (
        <div className="messages-container">
            <section className="messages-col-1">
                <h1 className="messages-title">Messages</h1>
                <hr></hr>
                <div className="list-chat">
                    <div className="chat-profile-pic"></div>
                    <section className="list-chat-col">
                        <h4 className="list-chat-name">Kevin Smith</h4>
                        <p className="list-chat-preview">Made a survey with...</p>
                    </section>
                </div>
            </section>
            <section className="messages-col-2"></section>
        </div>
    )
}

export default Messages
