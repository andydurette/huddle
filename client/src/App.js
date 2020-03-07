import React from "react";
import {AppProvider} from './utils/AppContext';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Main from "./components/Main";
import AddUser from "./components/AddUser";

function App() {
	
	return (
	  <AppProvider> 
      <Router>
      <div className="App">
        <Nav/>
          <Switch>
           <Route path="/" exact activeClassName='is-active' component={Home}></Route>
           <Route path="/login" activeClassName='is-active' component={Login}></Route>
           <Route path="/Main" activeClassName='is-active' component={Main}></Route>
           <Route path="/adduser" activeClassName='is-active' component={AddUser}></Route>
          </Switch>
      </div>
      </Router>
    </AppProvider> 
	);
}

export default App;