import React, {useEffect, useRef} from "react";
import Home from "./components/Home";

import NavBar from "./components/NavBar";
// Private Route
import PrivateRoute from "./components/PrivateRoute";
import { useAuth0 } from "./react-auth0-spa";

// New - import the React Router components, and the Profile page component
import { Router, Route, Switch } from "react-router-dom";
import Calendar from "./components/Calendar";
import Profile from "./components/Profile";
import ExternalApi from "./views/ExternalApi";
import history from "./utils/history";
import TeamMaker from "./components/TeamMaker";
import TeamViewer from "./components/TeamViewer";

// fontawesome
import initFontAwesome from "./utils/initFontAwesome";
initFontAwesome();

function App() {

  const { getTokenSilently } = useAuth0();

  // Id is my addition to the context so we can save it for the application
  const {user,id} = useAuth0();
  // How we refrence the context for id to set it with the returned value
  // eslint-disable-next-line
  let [dbId, setDbId] =  id;
  
  // Just learnt this useRef is how we set a variable values to persist between state resets we are having this so we only set id once not eveey state change.
  let userObtained = useRef(false);
  
  useEffect(() => {

    // If user doesn't exist yet and userObtained.current value is false which is the original value we run the block inside, shouldo nly ever run once with this check.
    if( user && userObtained.current === false ){
      userObtained.current = true;
      //Grabs user email value to send to our server route
      let userEmail = user.email
      console.log(user.email);
      // Use async call to call out to route with the user email in it's body
      let idCall = async () => {
        const token = await getTokenSilently();
        const res = await fetch("/api/user/email", {
          method: "POST",
          body: JSON.stringify({userEmail}),
          headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
          });
          return res.json();
      }
      // Response from api call finally stores api call response as the database Id
      // eslint-disable-next-line
      idCall().then((res) => setDbId( dbId = res ));
    }
  });

 

  return (
    <div className="App">
      {/* Don't forget to include the history module */}
      <Router history={history}>
        <header>
          <NavBar />
        </header>
        <Switch>
          <Route path="/" exact  component={Home}  />
          <Route path="/teammake" exact  component={TeamMaker}  />
          <Route path="/teamview" exact  component={TeamViewer}  />
          <PrivateRoute path="/calendar" component={Calendar} />
          <PrivateRoute path="/profile" component={Profile} />
          <PrivateRoute path="/external-api" component={ExternalApi} />
        </Switch>
      </Router>
    </div>
  );
}
export default App;