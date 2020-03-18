import React, { useState } from 'react';
import Footer from "./Footer";
import { useAuth0 } from "../react-auth0-spa";


function TeamMaker() {

  const {id, getTokenSilently,modal, modalCopy} = useAuth0();
  let [dbId /*, setDbId*/] =  id;
  // eslint-disable-next-line
  let [modalState, setModalState] =  modal;
  // eslint-disable-next-line
  let [modalCopyState , setModalCopyState ] =  modalCopy;


    let [name, setName] = useState('');
    let [description, setDescription] = useState('');

    const handleNameChange = e => {
        setName( name = e.target.value);
    };

    const handleDesChange = e => {
        setDescription( description = e.target.value);
    };

    let teamMake = (e) =>{
      e.preventDefault();
      console.log("TeamName:", e.target.name.value);
      console.log("Description:", e.target.description.value);
      console.log("Sport:", e.target.sport.value);
      console.log("Id:", dbId);

        // Use async call to call out to route with the user email in it's body
        let idCall = async () => {
          const token = await getTokenSilently();
          const res = await fetch("/api/team/new", {
            method: "POST",
            body: JSON.stringify({name, description, sport, userId}),
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
            });
            return res.json();
        }

        //Grabs user team submission
        let name = e.target.name.value;
        let description = e.target.description.value;
        let sport = e.target.sport.value;
        let userId = dbId;

        let teamCheck = async () => {
          const token = await getTokenSilently();
          const res = await fetch("/api/teamCheck", {
            method: "POST",
            body: JSON.stringify({name, description, sport, userId}),
            headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
            });

            return res.json();
        }

        teamCheck().then((res) =>{
          if(res.hasTeams === true){
            console.log("You already have a team!!!")

              setModalState( modalState = "");
              setModalCopyState( modalCopyState = "You already have a team.");
              setTimeout(() =>{ setModalState( modalState = "not-set") }, 500);
              setTimeout(() =>{ setModalState( modalState = "") }, 3000);
              setTimeout(() =>{ setModalState( modalState = "hide") }, 3500);

          }else if(res.hasTeams === false){
            // Response from api call finally stores api call response as the database Id
            // eslint-disable-next-line
            idCall().then((res) => {

              setModalState( modalState = "");
              setModalCopyState( modalCopyState = `Congratulations you have made team ${res.TeamName}`);
              setTimeout(() =>{ setModalState( modalState = "set") }, 500);
              setTimeout(() =>{ setModalState( modalState = "") }, 3000);
              setTimeout(() =>{ setModalState( modalState = "hide") }, 3500);

            });
          }
      }); 
    };

    return (
      <section id="wrapper" className="login"> 
          <div id="wrapper-contents" >  
            <h1>Team registration</h1>
                
                <form onSubmit={(e) => teamMake(e)}>
                <ul className="flex-outer">
                  <li> 
                    <label htmlFor="name">Team name:&nbsp;</label>
                    <input type="text" id="name" name="name" onChange={(e) => handleNameChange(e)} value={name} />
                  </li>
                  <li>
                    <label htmlFor="description">Description:&nbsp;</label>
                    <input type="text" id="description" name="description" onChange={(e) => handleDesChange(e)} value={description} /><br/>
                  </li>
                  <li>
                    <label htmlFor="sport">Sport:&nbsp;</label>
                    <select name="sport" id="sport" required>
                        <option value='1'>Basketball</option> 
                        <option value='2'>Baseball</option> 
                        <option value='2'>Hockey</option> 
                        <option value='2'>Soccer</option> 
                    </select>
                  </li>
                  <li>
                    <input type="submit" value="Submit"></input>
                  </li>
                </ul>
                </form>
            <div>
       
      
    </div>    
          </div>
          <Footer/>
      </section>
    )
}

export default TeamMaker;