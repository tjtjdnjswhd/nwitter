import React from "react";
import { HashRouter as Router, Route, Switch } from "react-router-dom";
import Navigation from "components/Navigation";
import Auth from "routes/Auth";
import Home from "routes/Home";
import Profile from "routes/Profile";

// eslint-disable-next-line react/prop-types
const AppRouter = ({ isLoggedIn, userObject, refreshUser }) => {
  return (
    <Router>
      {isLoggedIn && <Navigation userObject={userObject} />}
      <Switch>
        {isLoggedIn ?
          <>
            <Route exact path="/">
              <Home userObject={userObject} />
            </Route>
            <Route exact path="/profile">
              <Profile userObject={userObject} refreshUser={refreshUser} />
            </Route>
          </>
          :
          <Route exact path="/">
            <Auth />
          </Route>}
      </Switch>
    </Router>
  )
}

export default AppRouter;