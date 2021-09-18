import SignIn from "./onboarding/SignIn";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./onboarding/Landing";
import Onboard from "./onboarding/Onboard";

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
      <Route exact path="/onboard">
        <Onboard/>
      </Route>
    </Router>
  );
}

export default App;
