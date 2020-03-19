import React from 'react';
import Footer from "./Footer";


function VenueSearch() {



return (
      <section>
          <form>
              <div>
                <label for = "alert"></label>
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