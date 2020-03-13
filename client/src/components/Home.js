import React from 'react';
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
                </div>
            </div>
            <Footer/>
        </section>
    )
}

export default Home;