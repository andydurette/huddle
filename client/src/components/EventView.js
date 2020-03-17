import React,{useEffect, useState} from 'react';
import { useAuth0 } from "../react-auth0-spa";
import Footer from "./Footer";

function EventView() {

  const {id, getTokenSilently} = useAuth0();
  let [venues, setVenues] = useState('');


  const API = {
    async callVenues() {
      const token = await getTokenSilently();
      const res = await fetch("/api/venues", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
        return res.json();
    }
  };

  


  useEffect(() => {
        // Call all users not associated with a team
        API.callVenues().then((res) => {setVenues(venues = res)});
  },[]);




  if (id[0] === '') {
    return <div>Loading...</div>;
  }

  return (
      <section id="wrapper" className="teamview"> 
          <div id="wrapper-contents" >  

      
    {/* Grabs all team event data and loops through it to send to the front end  */}
    <h2>Events for your team</h2> 
    <table >
      <tbody>
        <React.Fragment>
          <tr>
            <th>Event Date</th>
            <th>Event Name</th>
            <th>Venue Type</th>
          </tr>
          
        {/*}  {team.map((teamMember, index) => (
          <tr key={teamMember.user_id} className="team-player">
            <td>{teamMember.member}</td>
            <td>{teamMember.player_pos_name}</td>
          </tr>
        ))} */}
          
        </React.Fragment>
        </tbody>
    </table>


  {/* Add Team  Members */}


    <h2>Add event for your team</h2>   
    {/*   
      <form onSubmit={(e) => API.addUser(e).then(() => API.teamCall((res) => { setTeam(team = res)}))}>
        <label htmlFor="user_name">User name:&nbsp;</label>
        <select name="user_name" id="user_name">
          {freePlayers.map((user, index) => (
            <option key={index} value={user.id} >{user.first_name}</option>
          ))}
        </select><br/>
        <label htmlFor="position">User Position:&nbsp;</label>
        <select name="position" id="position">
          {teamPositions.map((position, index) => (
            <option key={index} value={position.player_pos_id} >{position.player_pos_name}</option> 
          ))}
        </select><br/>
        <input type="submit" value="Submit" />
      </form> 
              */}
          </div>
          <Footer/>
      </section>
    )
}

export default EventView;