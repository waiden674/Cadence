import SignIn from "./onboarding/SignIn";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./onboarding/Landing";
import Onboard1 from "./onboarding/Onboard1";
import Onboard2 from "./onboarding/Onboard2";
import Dashboard from "./dashboard/Dashboard";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Route exact path="/signin">
          <SignIn />
        </Route>
      </div>
      <Route exact path="/">
        <Landing />
      </Route>
      <Route exact path="/onboard1">
        <Onboard1/>
      </Route>
      <Route exact path="/onboard2">
        <Onboard2/>
      </Route>
      <Route exact path="/dash">
        <Dashboard/>
      </Route>
      
    </Router>
  );
}

export default App;
