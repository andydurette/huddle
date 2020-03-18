import React from 'react';
import Footer from "./Footer";


const VenueSearch = () => {
   
return (
      <section>
          <script src="./src/venueSearch.js" type="text/javascript" ></script>
          <script  src="https://code.jquery.com/jquery-3.4.1.min.js"  integrity="sha256-CSXorXvZcTkaix6Yvo6HppcZGetbYMGWSFlBw8HfCJo="  crossorigin="anonymous"></script>
          <form>
              <div>
                  <label></label>
              </div>
              <div>
                  <label for = "location">location</label>
                  <input type = "text" class="form-control" id="locationInput" placeholder="City"></input>
                  <label for = "term">sport</label>
                  <input type = "text" class = "form-control" id="termInput" placeholder = "Basketball"></input>
              </div>
              <button type="submit" class="btn btn-submit" id="btnSearchSubmit">Search</button>
          </form>
          <div id="results"></div>
          <Footer/>                  
      </section>
  )
  
}

export default VenueSearch;