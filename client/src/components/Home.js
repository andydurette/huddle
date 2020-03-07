import React from 'react';
import { NavLink } from "react-router-dom";
import Footer from "./Footer";

function Home() {
    return (
        <section id="wrapper" className="home"> 
            <div id="wrapper-contents" >  
                <div id="join-message">
                    <div><img src="/img/huddle-logo.svg" alt="Huddle Logo"/></div>
                    <div>
                        <p>
                            See events from your coach, who will be at the game or past games scores all in one convient place.
                            Sign up for free and add your team members.
                        </p>
                    </div>
                    <div>
                    <NavLink to='/signup'>
                        <button>Join Now</button>
                    </NavLink>
                    </div>
                </div>
            </div>
            <Footer/>
        </section>
    )
}

export default Home;