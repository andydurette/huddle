import React,{useEffect, useState, useRef} from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import Footer from "./Footer";

function EventView() {

  const {id, getTokenSilently} = useAuth0();
  let [venues, setVenues] = useState('');
  let [time, setTime] = useState('09:00');
  let [teamId, setTeamId] = useState('');
  let [team, setTeam] = useState('');
  let [etype, setEtype] = useState("1");
  
  let [competitor, setCompetitor] = useState('');
  const contentMounted = useRef(false)


  const API = {
    async callVenues() {
      const token = await getTokenSilently();
      const res = await fetch("/api/venues", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
        return res.json();
    }, async addEvent(e) {
      e.preventDefault();
      

      let eventName = e.target.ename.value;
      let eventTypeId = e.target.etype.value;
      let venueId = e.target.venue.value;
      let eventDate = `${e.target.date.value} ${e.target.time.value}`;
      let competitorId = 0;
      let competitorName =  e.target.competitor.value;

      const token = await getTokenSilently();
      const res = await fetch("/api/team/new", {
        method: "POST",
        body: JSON.stringify({teamId, eventTypeId, eventDate, venueId, eventName, competitorId, competitorName}),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
        return res.json();

    }, async teamCheck() {
      const token = await getTokenSilently();
      const res = await fetch("/api/teamCheck", {
        method: "POST",
        body: JSON.stringify({userId: id[0]}),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });

        return res.json();
    }, async teamCall() {
      const token = await getTokenSilently();
      const res = await fetch("/api/teamInfo", {
        method: "POST",
        body: JSON.stringify({userId: id[0]}),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });

        return res.json();
    },async eventsCheck() {
      const token = await getTokenSilently();
      const res = await fetch("/api/futureEvents", {
        method: "POST",
        body: JSON.stringify({teamId}),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });

        return res.json();
    },
  };

  let contentUpdate = () =>{

       // Call all users not associated with a team
        API.teamCheck().then((res) => {
          if (res.hasTeams === false){
            setTeam(team = `false`);
          }else if(res.hasTeams === true){

            //If a team was found set to the team useRef hook for consumption also send it to teamPositions api to grab the posions
       
            API.teamCall().then((res) => { 
              setTeamId(teamId = res[0].team_id);
              contentMounted.current = true
            }).then(
              API.eventsCheck().then((res) => {
                console.log(res);
              })
            )
          }}) 
  }


  useEffect(() => {
    // eslint-disable-next-line
    API.callVenues().then((res) => {setVenues(venues = res)});
  },[]);


  useEffect(() => {
    if (id !== '' && contentMounted.current === false ){
      contentUpdate();
    }
  });


  if (id[0] === '' || venues === '') {
    return (
      <section id="wrapper" className="eventview"> 
        <div id="wrapper-contents" >  
          <div>Loading...</div>
        </div>
        <Footer/>
      </section>
    )
  }else if( team === 'false' || ''){
    return (
      <section id="wrapper" className="teamview"> 
        <div id="wrapper-contents" >  
          <div>
            <p>You currently belong to no team, wait to added by someone or make your own team by going to the link provided to the team maker page.</p>
            <Link to={{pathname: "/teammaker"}}>Team Maker</Link>
          </div>
        </div>
        <Footer/>
      </section>
    )
  }else{

  return (
      <section id="wrapper" className="eventview"> 
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
      <form onSubmit={(e) => API.addEvent(e).then((res) => console.log(res))}>
        <ul className="flex-outer">
          <li>
            <label htmlFor="ename">Event Name:&nbsp;</label>
            <input id="start" name="ename"  required></input>
          </li>
          <li>
            <label htmlFor="etype">Event Type:&nbsp;</label>
            <select name="etype" id="etype" value={etype} onChange={e => {setEtype(etype = e.target.value)}} required>
                <option value='1'>Game</option> 
                <option value='2'>Practice</option> 
            </select>
          </li>
          {etype === "2" ? '' : (
          
          <li>
            <label htmlFor="competitor">Competitor:&nbsp;</label>
            <input id="competitor" name="competitor" value={competitor} onChange={e => {setCompetitor(competitor = e.target.value)}} required></input>
          </li>
          )}
          <li>
            <label htmlFor="venue">Venue:&nbsp;</label>
            <select name="venue" id="venue">
              {venues.map((venue, index) => (
                <option key={index} value={venue.id} >{venue.name}</option> 
              ))}
            </select>
          </li>
          <li>
            <label htmlFor="edate">Date:&nbsp;</label>
            <input type="date" id="date" name="date"  required></input>
          </li>
          <li>
            <label htmlFor="time">Game Time:&nbsp;</label>
            <input type="time" id="time" name="time" min="09:00" max="18:00" value={time} onChange={e => {setTime(time = e.target.value)}} required></input>
          </li>
          <li>
            <input type="submit" value="Submit" />
          </li>
        </ul>
      </form> 
              }
          </div>
          <Footer/>
      </section>
    )
            }
}

export default EventView;