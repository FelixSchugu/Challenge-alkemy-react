import "./App.css";
import Login from "./views/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";

function App() {
  return (
    <Router>
      <Switch>
        <Route exact path="/login" component={Login} />
        <Redirect from="*" to="/login" />
      </Switch>
    </Router>
  );
}

export default App;
