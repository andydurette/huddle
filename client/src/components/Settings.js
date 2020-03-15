import React, { useState } from 'react';
import Footer from "./Footer";
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import Button from '@material-ui/core/Button';

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

function Settings() {


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

    const API = {
        async handleSubmit(e) {
            e.preventDefault();

            let idInfopass = {
                name:  name,
                description:  description,
                sport: sport,
            }

            const res = await fetch("/team/new/", {
                method: "POST",
                body: JSON.stringify(idInfopass),
                headers: { "Content-Type": "application/json" }
            });
            
            const postResponse = await res;

            console.log(postResponse);
        }
    }


    return (
      <section id="wrapper" className="login"> 
          <div id="wrapper-contents" >  
            <h1>Team regestration</h1>
            <form onSubmit={(e) => API.handleSubmit(e)}>
                <label htmlFor="name">Team name:</label><br/>
                <input type="text" id="name" name="name" onChange={(e) => handleNameChange(e)} value={name} /><br/>
                <label htmlFor="description">description:</label><br/>
                <input type="text" id="description" name="description" onChange={(e) => handleDesChange(e)} value={description} /><br/>
                
                {/* <input type="text" id="sport" name="sport" onChange={(e) => hand(e)} value={sport} /><br/> */}
                
               

            <div>
      <Button className={classes.button} onClick={handleOpen}>
        Open the select
      </Button>
      <FormControl className={classes.formControl}>
        <InputLabel id="demo-controlled-open-select-label">Sport</InputLabel>
        <Select
          labelId="demo-controlled-open-select-label"
          id="demo-controlled-open-select"
          open={open}
          onClose={handleClose}
          onOpen={handleOpen}
          value={sport}
          onChange={handleChange}
        >
          <MenuItem value="">
            <em>None</em>
          </MenuItem>
          <MenuItem value={1}>Soccer</MenuItem>
          <MenuItem value={2}>Basketball</MenuItem>
          <MenuItem value={3}>Baseball</MenuItem>
          <MenuItem value={4}>Hockey</MenuItem>
        </Select>
      </FormControl>
    </div>
    <input type="submit" value="Submit"></input>
            </form> 
          </div>
          <Footer/>
      </section>
    )
}

export default Settings;