import React from "react";
import {AppProvider} from './utils/AppContext';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";

function App() {
	
	return (
	  <AppProvider> 
      <Router>
      <div className="App">
        <Nav/>
          <Switch>
           <Route path="/" exact activeClassName='is-active' component={Home}></Route>
           <Route path="/login" activeClassName='is-active' component={Login}></Route>
          </Switch>
      </div>
      </Router>
    </AppProvider> 
	);
}

export default App;