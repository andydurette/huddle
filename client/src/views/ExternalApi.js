// src/views/ExternalApi.js

import React, { useState } from "react";
import { useAuth0 } from "../react-auth0-spa";
import Footer from "../components/Footer";

const ExternalApi = () => {
  const [showResult, setShowResult] = useState(false);
  const [apiMessage, setApiMessage] = useState("");
  const { getTokenSilently } = useAuth0();

  const callApi = async () => {
    try {
      const token = await getTokenSilently();

      const response = await fetch("http://localhost:3001/api/external", {
        headers: {
          Authorization: `Bearer ${token}`
        }
      });

      const responseData = await response.json();

      setShowResult(true);
      setApiMessage(responseData);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <section id="wrapper" className="Main">
      <div id="wrapper-contents" >
        <h1>External API</h1>
        <button onClick={callApi}>Ping API</button>
        {showResult && <code>{JSON.stringify(apiMessage, null, 2)}</code>}
      </div>
      <Footer/>
  </section>
  );
};

export default ExternalApi;