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
    },async addEvent(e) {
      e.preventDefault();

    },
  };

  


  useEffect(() => {
        // Call all users not associated with a team
        // eslint-disable-next-line
        API.callVenues().then((res) => {setVenues(venues = res)});
  },[]);




  if (id[0] === '' || venues === '') {
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
    {   
      <form onSubmit={(e) => API.addEvent(e)}>
        <label htmlFor="venue">Venue:&nbsp;</label>
        <select name="venue" id="venue">
          {venues.map((venue, index) => (
            <option key={index} value={venue.id} >{venue.name}</option> 
          ))}
        </select><br/>
        <label htmlFor="start">Start date:</label><br/>
        <input type="date" id="start" name="event-start"></input><br/>
        <input type="submit" value="Submit" />
      </form> 
              }
          </div>
          <Footer/>
      </section>
    )
}

export default EventView;