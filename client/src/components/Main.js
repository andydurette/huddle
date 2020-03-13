import React from 'react';
import Calendar from "./Calendar";
import Footer from "./Footer";

function Main() { 
    return (
            <section id="wrapper" className="Main">
                <div id="wrapper-contents" >
                    <Calendar />
                </div>
                <Footer/>
            </section>
    )
}

export default Main;