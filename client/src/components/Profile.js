import React from "react";
import { useAuth0 } from "../react-auth0-spa";
import Footer from "./Footer";

const Profile = () => {
  const { loading, user } = useAuth0();

  if (loading || !user) {
    return <div>Loading...</div>;
  }

  return (
    <section id="wrapper" className="Profile">
        <div id="wrapper-contents" >
          <div>
            <div> 
              <img src={user.picture} alt="Profile" />
            </div>
            <div>
              <h2>{user.name}</h2>
              <p>{user.email}</p>
             {/*<code>{JSON.stringify(user, null, 2)}</code>*/}
            </div>
          </div>
        </div>
      <Footer/>
    </section>
    )
}

export default Profile;