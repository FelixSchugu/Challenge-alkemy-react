import React from "react";
import { Switch, Route, Redirect } from "react-router";
import HeroSearch from "../views/HeroSearch";
import Home from "../views/Home";
import HeroDetails from "../views/HeroDetails";

const PrivateRoutes = () => {
  return (
    <Switch>
      <Route exact path="/search" component={HeroSearch} />
      <Route exact path="/home" component={Home} />
      <Route exact path="/details/:heroId" component={HeroDetails} />
      <Redirect from="*" to="/home" />
    </Switch>
  );
};

export default PrivateRoutes;
