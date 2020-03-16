import React, {useEffect, useState} from 'react';
import { useAuth0 } from "../react-auth0-spa";
import Footer from "./Footer";

function TeamView() {

  const {id, getTokenSilently} = useAuth0();
  let [dbId /*, setDbId*/] =  id;

  if (id === '') {
    return <div>Loading...</div>;
  }

  return (
      <section id="wrapper" className="teamview"> 
          <div id="wrapper-contents" >  

          <div>Hi</div>
              
          </div>
          <Footer/>
      </section>
    )
}

export default TeamView;