import React from "react";
import Home from "./components/Home";
import NavBar from "./components/NavBar";
// Private Route
import PrivateRoute from "./components/PrivateRoute";

// New - import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";
import Main from "./components/Main";
import Profile from "./components/Profile";
import ExternalApi from "./views/ExternalApi";
import history from "./utils/history";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();



function App() {
  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact  component={Home}  />
          <PrivateRoute path="/main" component={Main} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
        </Switch>
      </Router>
    </div>
  );
}

export default App;