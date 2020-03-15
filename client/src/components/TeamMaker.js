import React, { useState } from 'react';
import Footer from "./Footer";
import { makeStyles } from '@material-ui/core/styles';
//import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
//import MainAddUser from './MainAddUser';

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

    // const handleSportChange = e => {
    //     setSport( sport = e.target.value);
    //   };

    // const API = {
    //     async handleSubmit(e) {
    //         e.preventDefault();

    //         let idInfopass = {
    //             name:  name,
    //             description:  description,
    //             sport: sport,
    //         }

    //         const res = await fetch("/team/new/", {
    //             method: "POST",
    //             body: JSON.stringify(idInfopass),
    //             headers: { "Content-Type": "application/json" }
    //         });
            
    //         const postResponse = await res;

    //         console.log(postResponse);
    //     }
    // }


    return (
      <section id="wrapper" className="login"> 
          <div id="wrapper-contents" >  
            <h1>Team registration</h1>
                
                {/* <input type="text" id="sport" name="sport" onChange={(e) => hand(e)} value={sport} /><br/> */}
                
                <FormControl className={classes.formControl}>
                <label htmlFor="name">Team name:</label><br/>
                <input type="text" id="name" name="name" onChange={(e) => handleNameChange(e)} value={name} /><br/>
                <label htmlFor="description">description:</label><br/>
                <input type="text" id="description" name="description" onChange={(e) => handleDesChange(e)} value={description} /><br/>
      
        <label>Sports</label>
       <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
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
      </FormControl>

            <div>
       
      
    </div>
    <div>
      
    {/* <MainAddUser/> */}
    </div>
    <input type="submit" value="Submit"></input>
    
          </div>
          <Footer/>
      </section>
    )
}

export default TeamMaker;