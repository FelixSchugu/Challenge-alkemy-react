import React from "react";
import { Switch, Route, Redirect } from "react-router";
import Login from "../views/Login";

const PublicRoutes = () => {
  return (
    <Switch>
      <Route exact path="/login" component={Login} />
      <Redirect from="*" to="/login" />
    </Switch>
  );
};

export default PublicRoutes;
