import SignIn from "./onboarding/SignIn";
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import Landing from "./onboarding/Landing";

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
    </Router>
  );
}

export default App;
