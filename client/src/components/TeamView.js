import React,{useEffect, useState} from 'react';
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

        //console.log(res.json());
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

      let teamId = team.team_id;
      let userId = e.target.user_name.value;
      let positionId = e.target.position.value;

      console.log(teamId, userId, positionId);

      const token = await getTokenSilently();
      const res = await fetch("/api/team/newmember", {
        method: "POST",
        body: JSON.stringify({teamId, userId, positionId }),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });

        //console.log(res.json());
        return res.json()
    },
    async removeUser(userIdValue, teamIdValue) {

      let userId = userIdValue;
      let teamId = teamIdValue;

      console.log(userId);
      console.log(teamId);

      const token = await getTokenSilently();
      const res = await fetch("/api/team/member", {
        method: "DELETE",
        body: JSON.stringify({ userId, teamId }),
        headers: { Authorization: `Bearer ${token}`, "Content-Type": "application/json" }
        });
        return res.json();
    }
  };


  useEffect(() => {
        // Call all users not associated with a team
          API.freeUsers().then((res) => {
            // eslint-disable-next-line
            setFreePlayers(freePlayers = res);
          });
  },[]);


  useEffect(() => {
    // Checks for user id and that team hasn't been checked yet.
    if ( id[0] !== '' && team === ''){
      // Grabs users team if they have one. 
      API.teamCheck().then((res) => {
        if (res.hasTeams === false){
          // eslint-disable-next-line
          team = `false`;
        }else if(res.hasTeams === true){
          //If a team was found set to the team useRef hook for consumption also send it to teamPositions api to grab the posions
           API.teamCall().then((res) => { 
             setTeam(team = res);
             // Call and set positions
              API.teamPositions(res).then((res) =>{
                // eslint-disable-next-line
                setTeamPositions(teamPositions = res);
              })
            });
        }
      })
    }
  });



  if (id[0] === '' || freePlayers === '' || teamPositions === '' || team === '') {
    return <div>Loading...</div>;
  }else if(id[0] === '' && team === false){
    return <div>You have no team.</div>;
  }

  return (
      <section id="wrapper" className="teamview"> 
          <div id="wrapper-contents" >  

      
    {/* Grabs all team data and loops through it to send to the front end  */}
    <h2>Players on your team</h2> 
    <table >
      <tbody>
        <React.Fragment>
          <tr>
            <th>Players</th>
            <th>Positions</th>
            <th>Remove</th>
          </tr>
          
          {team.map((teamMember, index) => (
          <tr key={teamMember.user_id} className="team-player">
            <td>{teamMember.member}</td>
            <td>{teamMember.player_pos_name}</td>
            <td><button data-user={teamMember.user_id} data-team={teamMember.user_team} onClick={(e) => {
              let userId = e.target.getAttribute("data-user");
              let teamId = e.target.getAttribute("data-team");
              API.removeUser(userId, teamId).then(() => API.teamCall((res) => { setTeam(team = res)}));
              }}>X</button></td>
          </tr>
          ))} 
          
        </React.Fragment>
        </tbody>
    </table>


  {/* Add Team  Members */}


    <h2>Add user to your team</h2>      
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
              
          </div>
          <Footer/>
      </section>
    )
}

export default TeamView;