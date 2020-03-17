import React, { useState } from 'react';
import Footer from "./Footer";
import { makeStyles } from '@material-ui/core/styles';
//import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import MainAddUser from './MainAddUser';
import { useAuth0 } from "../react-auth0-spa";


const useStyles = makeStyles(theme => ({
  button: {
    display: 'block',
    marginTop: theme.spacing(2),
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
}));

function TeamMaker() {

  const {id, getTokenSilently} = useAuth0();
  let [dbId /*, setDbId*/] =  id;

  const classes = useStyles();
  const [sport, setSport] = React.useState('');
  const [open, setOpen] = React.useState(false);

  const handleChange = event => {
    setSport(event.target.value);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };


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
          }else if(res.hasTeams === false){
            // Response from api call finally stores api call response as the database Id
            // eslint-disable-next-line
            idCall().then((res) => console.log(''));
          }
      }); 
    };

    return (
      <section id="wrapper" className="login"> 
          <div id="wrapper-contents" >  
            <h1>Team registration</h1>
                
                {/* <input type="text" id="sport" name="sport" onChange={(e) => hand(e)} value={sport} /><br/> */}
                
                <FormControl className={classes.formControl}>
                <form onSubmit={(e) => teamMake(e)}>
                <label htmlFor="name">Team name:</label><br/>
                <input type="text" id="name" name="name" onChange={(e) => handleNameChange(e)} value={name} /><br/>
                <label htmlFor="description">description:</label><br/>
                <input type="text" id="description" name="description" onChange={(e) => handleDesChange(e)} value={description} /><br/>
      
        <label>Sports</label>
       <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          name="sport"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={sport}
          onChange={handleChange}
        >
         
          
          <MenuItem value={1}> <em>Basketball</em></MenuItem>
          <MenuItem value={2}>Baseball</MenuItem>
          <MenuItem value={3}>Hockey</MenuItem>
          <MenuItem value={4}>Soccer</MenuItem>
        </Select>
        <br/><br/>
        <input type="submit" value="Submit"></input>
        </form>
      </FormControl>

            <div>
       
      
    </div>
    <div>
      
    {/* <MainAddUser/> */}
    </div>
    
    
          </div>
          <Footer/>
      </section>
    )
}

export default TeamMaker;