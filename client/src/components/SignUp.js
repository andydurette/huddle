import React, { useState } from 'react';
import Footer from "./Footer";


function SignUp() {

    let [firstName, setFirstName] = useState('');
    let [lastName, setLastName] = useState('');
    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

    const handleFirstNameChange = e => {
        setFirstName( firstName = e.target.value);
    };

    const handleLastNameChange = e => {
        setLastName( lastName = e.target.value);
    };

    const handleEmailChange = e => {
        setEmail( email = e.target.value);
      };

    const handlePasswordChange = e => {
        setPassword( password = e.target.value);
    };

    const API = {
        async handleSubmit(e) {
            e.preventDefault();

            let idInfopass = {
                firstName:  firstName,
                lastName:  lastName,
                email: email,
                password: password
            }

            const res = await fetch("/api/login", {
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
            <h1>Huddle SignUp</h1>
            <form onSubmit={(e) => API.handleSubmit(e)}>
                <label htmlFor="fname">First Name:</label><br/>
                <input type="text" id="email" name="fname" onChange={(e) => handleFirstNameChange(e)} value={firstName} /><br/>
                <label htmlFor="lname">Last Name:</label><br/>
                <input type="text" id="email" name="lname" onChange={(e) => handleLastNameChange(e)} value={lastName} /><br/>
                <label htmlFor="email">Email:</label><br/>
                <input type="text" id="email" name="email" onChange={(e) => handleEmailChange(e)} value={email} /><br/>
                <label htmlFor="password">Password:</label><br/>
                <input type="password" id="password" name="password" onChange={(e) => handlePasswordChange(e)} value={password} /><br/><br/>
                <input type="submit" value="Submit"></input>
            </form> 
          </div>
          <Footer/>
      </section>
    )
}

export default SignUp;