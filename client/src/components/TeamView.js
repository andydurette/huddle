import React,{useEffect, useState} from 'react';
import { Link } from "react-router-dom";
import { useAuth0 } from "../react-auth0-spa";
import Footer from "./Footer";

function TeamView() {

  const {id, getTokenSilently} = useAuth0();
  let [teamId, setTeamId] = useState('');
  let [team, setTeam] = useState('');
  let [teamPositions, setTeamPositions] = useState(''); 
  let [freePlayers, setFreePlayers] = useState(''); 

  const API = {
    async teamCheck() {
      const token = await getTokenSilently();
      const res = await fetch("/api/teamCheck", {
        method: "POST",
        body: JSON.stringify({userId: id[0]}),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });

        return res.json();
    },
    async teamCall() {
      const token = await getTokenSilently();
      const res = await fetch("/api/teamInfo", {
        method: "POST",
        body: JSON.stringify({userId: id[0]}),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });

        return res.json();
    },
    async teamPositions(data) {
      const token = await getTokenSilently();
      const res = await fetch("/api/allPositions", {
        method: "POST",
        body: JSON.stringify({sportId: data[0].sport_id}),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
        return res.json();
    },
    async freeUsers() {
      const token = await getTokenSilently();
      const res = await fetch("/api/freeUsers", {
        method: "GET",
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
        return res.json();
    },
    async addUser(e) {
      e.preventDefault();
      let userId = Number(e.target.user_name.value);
      let positionId = Number(e.target.position.value);

      const token = await getTokenSilently();
      const res = await fetch("/api/team/newmember", {
        method: "POST",
        body: JSON.stringify({teamId, userId, positionId }),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });

        return res.json()
    },
    async removeUser(userIdValue) {

      let userId = userIdValue;

      const token = await getTokenSilently();
      const res = await fetch("/api/team/member", {
        method: "DELETE",
        body: JSON.stringify({ userId, teamId }),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
        return res.json();
    }
  };

  let processUsers = () =>{

            // Call all users not associated with a team
            API.freeUsers().then((res) => {
              if(res.error){
                setFreePlayers(freePlayers = 'No free players');
              }else{
                setFreePlayers(freePlayers = res);
              }
            });

  }



let userDataPopulation = () => {
   // Checks for user id and that team hasn't been checked yet.
   if ( id[0] !== '' && team === ''){
    // Grabs users team if they have one. 
    API.teamCheck().then((res) => {
      if (res.hasTeams === false){
        setTeam(team = `false`);
      }else if(res.hasTeams === true){
        //If a team was found set to the team useRef hook for consumption also send it to teamPositions api to grab the positions
         API.teamCall().then((res) => { 
           setTeam(team = res);
           setTeamId(teamId = res[0].team_id)
           // Call and set positions
            API.teamPositions(res).then((res) =>{
              setTeamPositions(teamPositions = res);
            })
          });
      }
    })
  }
}

  useEffect(() => {
    processUsers();
    // eslint-disable-next-line
  },[]);


  useEffect(() => {
    userDataPopulation();
  });



  if (id[0] === '') {
    return <div>Loading...</div>;
  }else if( team === 'false'){
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
  }else if(id[0] === '' || freePlayers === '' || teamPositions === '' || team === ''){
    return (
      <section id="wrapper" className="teamview"> 
        <div id="wrapper-contents" >  
          <div>Loading...</div>
        </div>
        <Footer/>
      </section>
    )
  }

  return (
      <section id="wrapper" className="teamview"> 
          <div id="wrapper-contents" >  

      
    {/* Grabs all team data and loops through it to send to the front end  */}
    <h2>Players on your team</h2> 
    {(team[0].user_id === null ) ? <p>There are no players currently on your team</p> : (
    <table >
      <tbody>
        <React.Fragment>
          <tr>
            <th>Player</th>
            <th>Position</th>
            <th>Remove</th>
          </tr>
          
         
          {team.map((teamMember) => (
          <tr key={teamMember.user_id} className="team-player">
            <td>{teamMember.member}</td>
            <td>{teamMember.player_pos_name}</td>
            <td><button className="remove" data-user={teamMember.user_id} data-team={teamMember.user_team} onClick={(e) => {
              let userId = e.target.getAttribute("data-user");
              API.removeUser(userId)
              .then(() => API.teamCall()
              .then((res) => { setTeam(team = res)}).then(API.freeUsers().then((res) => {
                // eslint-disable-next-line
                if(res.error){
                  setFreePlayers(freePlayers = 'No free players');
                }else{
                  setFreePlayers(freePlayers = res);
                }
              })))
              }}>X</button></td>
          </tr>
          )) }
         
        </React.Fragment>
        </tbody>
    </table>
     )}


  {/* Add Team  Members */}
  <h2>Add user to your team</h2> 
      
    {(freePlayers === 'No free players' ) ? <p>No free users to add to team.</p> : (
      <form onSubmit={(e) => 
      API.addUser(e)
      .then(() => API.teamCall()
      .then((res) => { setTeam(team = res)})
      .then(API.freeUsers().then((res) => {
        // eslint-disable-next-line
        if(res.error){
          setFreePlayers(freePlayers = 'No free players');
        }else{
          setFreePlayers(freePlayers = res);
        }
      }))
      )}>
        <ul className="flex-outer">
          <li> 
            <label htmlFor="user_name">User name:&nbsp;</label>
            <select name="user_name" id="user_name"> 
              {freePlayers.map((user, index) => (<option key={index} value={user.id} >{user.first_name}</option> ))}
            </select>
          </li>
          <li>
           <label htmlFor="position">User Position:&nbsp;</label>
            <select name="position" id="position"> 
              {teamPositions.map((position, index) => ( <option key={index} value={position.player_pos_id} >{position.player_pos_name}</option> ))}
            </select>
          </li>
          <li>
            <input type="submit" value="Submit" />
          </li>
        </ul>
      </form> 
    )}
          </div>
          <Footer/>
      </section>
    )
}

export default TeamView;