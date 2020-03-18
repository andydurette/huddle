import React from 'react';
import Footer from "./Footer";
import MapContainer from "../../api/map";

const VenueViewer = () => {


  return (
    <section id="wrapper" className="venueViewer">
                <div id="wrapper-contents">
           <MapContainer/>
           <Footer/>
           </div>
           </section>
  )
  
}

export default VenueViewer;