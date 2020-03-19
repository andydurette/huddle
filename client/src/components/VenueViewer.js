import React, {Component} from 'react';
import Footer from "./Footer";
import {Map, Marker, GoogleApiWrapper, InfoWindow} from "google-maps-react";
import './map.css';


const style = {
  width: '80%',
  height: '80%'
};

export class VenueViewer extends Component {
 constructor(props) {
    super(props);

  
  this.state = {
    showingInfoWindow: false,
    activeMarker: {},
    selectedPlace: {},
    center: {
      lat: 43.7579346,
      lng: -79.2892761
  }
  };
}

  onMarkerClick = (props, marker, e) =>
    this.setState({
      selectedPlace: props,
      activeMarker: marker,
      showingInfoWindow: true
    });
 
  onMapClicked = (props) => {
    if (this.state.showingInfoWindow) {
      this.setState({
        showingInfoWindow: false, 
        activeMarker: null
      })
    }
  };
 
  render() {
    return (
      <section id="wrapper" className="map"> 
      <div id="wrapper-contents">
      <Map google={this.props.google}
          onClick={this.onMapClicked}
          style={style}
          >
        <Marker onClick={this.onMarkerClick}
                name={'Ultra Sports Centre'}
                position={{lat: 43.7579346, lng: -79.2892761}}
                 />
 
        <InfoWindow
          marker={this.state.activeMarker}
          visible={this.state.showingInfoWindow}>
            <div>
              <h1>{this.state.selectedPlace.name}</h1>
            </div>
        </InfoWindow>
      </Map>
      </div>
      <Footer/>
     </section>
    )
  }
}

export default GoogleApiWrapper({
	apiKey: ("AIzaSyAU4lD3pAM7aCsulTu7UWeWRMYxyHqRfKE")
})(VenueViewer);