import React, {Component} from "react";
import {Map, Marker, GoogleApiWrapper} from "google-maps-react";
import Styles from "./GoogleMapStyles.json";


class MapContainer extends Component {
	render() {
		return (
			<div style={{ height: "100vh", width: "100%" }}>
				<Map google={window.google}
					zoom={14}
					style={Styles}
				>
 
					<Marker name = {""}
						posiiton = {{lat: 37.778519, lin: -122.405640}}
					/>
				</Map>
			</div>
		);
	}
}

export default GoogleApiWrapper({
	apiKey: ("AIzaSyAU4lD3pAM7aCsulTu7UWeWRMYxyHqRfKE")
})(MapContainer);