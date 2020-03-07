import React from 'react';
import Footer from "./Footer";

function AddUser() {
    return (
        <section id="wrapper" className="home">
            <div id="wrapper-contents" >
                <form>
                    <h1>Hello</h1>
                    <p>Enter your teammate's name:</p>
                    <input
                        type="text"
                    />
                    <input type="submit" value="Submit"/>
                </form>
            </div>
            <Footer/>
        </section>
    )
}

export default AddUser;