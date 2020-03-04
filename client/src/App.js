import React from "react";
import {AppProvider} from './utils/AppContext';
import { BrowserRouter as Router, Switch, Route} from "react-router-dom";
import Home from "./components/home";
import Schedule from "./components/schedule";
import "./scss/App.scss";

function App() {
	
	return (
	  <AppProvider> 
      <Router>
      <div className="App">
        {/*  <Nav/> */}
        <section id="wrapper"> 
        Hi this is working, lets make it better.
          <div id="wrapper-contents">  
          <Switch>
           <Route path="/" exact activeClassName='is-active' component={Home}></Route>
           <Route path="/saved" activeClassName='is-active' component={Schedule}></Route>
          </Switch>
          </div>
        {/*  <Footer/> */}
        </section>
      </div>
      </Router>
    </AppProvider> 
	);
}


export default App;
