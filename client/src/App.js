import React from "react";
import {AppProvider} from './utils/AppContext';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import AuthTest from "./components/AuthTest";

function App() {
	
	return (
	  <AppProvider> 
      <Router>
      <div className="App">
        <Nav/>
          <Switch>
           <Route path="/" exact activeClassName='is-active' component={Home}></Route>
           <Route path="/login" activeClassName='is-active' component={Login}></Route>
           <Route path="/signup" activeClassName='is-active' component={SignUp}></Route>
           <Route path="/authtest" activeClassName='is-active' component={AuthTest}></Route>
          </Switch>
      </div>
      </Router>
    </AppProvider> 
	);
}

export default App;