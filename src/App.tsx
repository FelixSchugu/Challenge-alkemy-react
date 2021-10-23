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
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { LocalStorageKeys, getItem } from "./helpers/localStorage/index";
import { AuthRootState } from "./store/types";
import { UserAuthActions } from "./store/actions/auth";
import HeroDetails from "./views/HeroDetails";
import HeroSearch from "./views/HeroSearch";

function App() {
  const isAuth = useSelector(
    (state: AuthRootState) => state.authReducer.isAuth
  );

  const dispatch = useDispatch();

  const initializeApp = async () => {
    const token = await JSON.parse(getItem(LocalStorageKeys.TOKEN));

    if (token) {
      dispatch(UserAuthActions.authWithToken());
    }
  };
  useEffect(() => {
    initializeApp();
  });

  return (
    <>
      <Router>
        <Switch>
          <Route exact path="/details/:heroId" component={HeroDetails} />
          <Route exact path="/search" component={HeroSearch} />
          {!isAuth && <Route exact path="/login" component={Login} />}
          {isAuth && <Route exact path="/home" component={Home} />}
          <Redirect from="*" to={!isAuth ? "/login" : "/home"} />
        </Switch>
      </Router>
      <Styles />
    </>
  );
}

export default App;
