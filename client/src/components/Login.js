import React, { useState } from 'react';
import Footer from "./Footer";


function Login() {

    let [email, setEmail] = useState('');
    let [password, setPassword] = useState('');

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
            <h1>Huddle Login</h1>
            <form onSubmit={(e) => API.handleSubmit(e)}>
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

export default Login;