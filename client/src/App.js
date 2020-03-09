import React from "react";
import {AppProvider} from './utils/AppContext';
import { BrowserRouter as Router, Switch, Route,  Redirect} from "react-router-dom";
import Nav from "./components/Nav";
import Home from "./components/Home";
import Login from "./components/Login";
import Main from "./components/Main";
import SignUp from "./components/SignUp";
import AuthTest from "./components/AuthTest";
//import PrivateRoute from "./components/PrivateRoute";

const API = {
  async getSession() {
        const response = await fetch(`/api/authCheck`);
        //const response = await res
        console.log('response status: ', response.status);
        console.log('response status is 200: ', response.status === 200);
       // console.log("Hi");
        return response.status;
  }
}

function PrivateRoute({ children, ...rest }) {
  console.log('hitting PrivateRoute');
  return (
    <Route
      {...rest}
      render={() =>
        API.getSession === 200 ? (
          children
        ) : (
          <Redirect
            to={{
              pathname: "/login"
            }}
          />
        )
      }
    />
  );
}

function App() {
	return (
	  <AppProvider> 
      <Router>
      <div className="App">
        <Nav/>
          <Switch>
           <Route path="/" exact activeClassName='is-active' component={Home}></Route>
           <Route path="/login" activeClassName='is-active' component={Login}></Route>
           <PrivateRoute path="/main" activeClassName='is-active'>
             <Main/>
           </PrivateRoute>
           <Route path="/signup" activeClassName='is-active' component={SignUp}></Route>
           <Route path="/authtest" activeClassName='is-active' component={AuthTest}></Route>
          </Switch>
      </div>
      </Router>
    </AppProvider> 
	);
}
export default App;