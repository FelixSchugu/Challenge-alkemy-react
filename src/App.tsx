import "./App.css";
import Login from "./views/Login";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect,
} from "react-router-dom";
import Home from "./views/Home";
import Styles from "./styles/Styles";

function App() {
  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/login" component={Login} />
          <Route exact path="/home" component={Home} />
          <Redirect from="*" to="/login" />
        </Switch>
      </Router>

      <Styles />
    </>
  );
}

export default App;
