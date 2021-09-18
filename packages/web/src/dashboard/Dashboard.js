import React from 'react'
import Sidebar from '../components/Sidebar'
import "./Dashboard.css";
import Timebar from '../components/Timebar';
import Home from './Home';

// props= firstName
const Dashboard = (props) => {
    return (
        <div className="dashboard-container">
            <Sidebar />
            <Timebar />
            <Home />
        </div>
    )
}

Dashboard.defaultProps = {
    firstName: "John"
}

export default Dashboard
