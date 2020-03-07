/*let map;

let lastOpenedInfoWindow = null;

function initMap() {
     
    map = new google.maps.Map(document.getElementById("map"), {
          
        styles: [
            {
              "featureType": "administrative.land_parcel",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#43736c"
                }
              ]
            },
            {
              "featureType": "landscape",
              "stylers": [
                {
                  "color": "#eddac5"
                }
              ]
            },
            {
              "featureType": "landscape.natural.terrain",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#9e6556"
                }
              ]
            },
            {
              "featureType": "poi.park",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#b4ddae"
                }
              ]
            },
            {
              "featureType": "poi.sports_complex",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#f4ab42"
                }
              ]
            },
            {
              "featureType": "road.arterial",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#a6a77b"
                }
              ]
            },
            {
              "featureType": "road.highway",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#ee6f69"
                }
              ]
            },
            {
              "featureType": "road.local",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#a6a77b"
                }
              ]
            },
            {
              "featureType": "transit.line",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#d4a595"
                }
              ]
            },
            {
              "featureType": "transit.station",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#d4a595"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "geometry.fill",
              "stylers": [
                {
                  "color": "#6a98a5"
                }
              ]
            },
            {
              "featureType": "water",
              "elementType": "labels.text.fill",
              "stylers": [
                {
                  "color": "#dbbf83"
                }
              ]
            }
          ]/
    });

    if(navigator.geolocation){
        navigator.geolocation.getCurrentPosition(initMapWithPosition); 
        return;
    }
    
    map.setCenter({lat: 43.651070, lng: -79.347015});
    map.setZoom(13);
}

function initMapWithPosition(position){
    map.setCenter({lat: position.coords.latitude, lng: position.coords.longitude});
    map.setZoom(13);    
}

function setMarkers(venueList, image) {
   
    let venues = [];

    if (venueList.length > 0) {
        venues = veuneList;        
    
        createMarkers(venues, image);
    }
    
}

async function createMarkers(venues, image) {
    let markers = [];
    for (const venue of venueList) {
        let imageSource = '';
        let mlat = parseFloat(venue.lat);
        let mlng = parseFloat(venue.lon);
        let position = { lat: mlat, lng: mlng };

        let infowindow = new google.maps.InfoWindow({ minWidth: 400 });

        let marker = new google.maps.Marker({
            position: position,
            map: map,
            icon: image,
            title: venue.name,                
            property_id: venue.id
        });

        google.maps.event.addListener(marker, 'click', (function (marker, thisVenue) {

            return function () {
                //get info window content for particular restaurant

                if (lastOpenedInfoWindow){
                    lastOpenedInfoWindow.close();
                }
                if (thisVenue.image_url !== null) {
                    imageSource = thisVenue.image_url;
                } else {
                    imageSource = "";//'/Images/info_window_fallback.png';
                }
                console.log(thisVenue);
                
                //let categoriesStr = "cuisines";
                // let categoriesStr = thisVenue.categories.map(e =>{                        
                //     return e.title;
                // }).join(", ");                   
                
                let contentDiv = $("<div>").addClass("maps-info-pane")
                    .append($("<h2>").addClass("venue-name").text(thisVenue.name),
                            $("<div>").addClass("")
                            .append($("<div>").addClass("").attr("style",`background-image: url("${imageSource}")'`),
                                    $("<div>").addClass("restaurant-info")
                                    .append($("<h4>").addClass("address").text(JSON.parse(thisVenue.address).address1),
                                             $("<p>").addClass("").html(`Rating: <strong>${generateRatingGraphic(thisVenue.rating).get()[0].outerHTML}</strong>`),
                                             $("<button>").addClass("btn btn-success").attr("data-yelpid",thisVenue.visited?thisVenue.id:thisVenue.yelp_id).text("Show Details")
                                                .on('click', async function(event){
                                                   
                                                    console.log("hi");
                                                    let yelp_id = $(event.currentTarget).data("yelpid");
                                                    //console.log(yelp_id);
                                                    loadInfoModal(yelp_id, thisVenue.added_at);
                                                })
                                    )
                            )
                    );
              
                infowindow.setContent(contentDiv.clone(true)[0]);
                infowindow.open(map, marker);

                lastOpenedInfoWindow = infowindow;
            }
        })(marker, venue));
        markers.push(marker);
    }     
    
    // let listener = await google.maps.event.addListener(map, "idle", function () {
    //     fitMarkersInBounds(map, markers);
    //     google.maps.event.removeListener(listener);
    // });
    if(markers.length > 0 ){
        fitMarkersInBounds(map, markers);
        panToVenueClick(map, markers); //When restaurant div is clicked, move tha map's focus and zoom into it
    }
}

function fitMarkersInBounds(map, markers) {
    
    let bounds = new google.maps.LatLngBounds();
    
    for(const marker of markers){
        bounds.extend(marker.position);
    }

    map.fitBounds(bounds,
        { //padding
            top: 30,
            left: 10, //panelWidth
            bottom: 10,
            right: 10
        });
    map.panToBounds(bounds);        
    
}

function panToVenueClick(map, markers) {
    let elements = document.getElementsByClassName("venueContainer");
   
    for (let i = 0; i < elements.length; i++) {

        elements[i].setAttribute("markerIndex", i);
        elements[i].addEventListener("click", function (e) {
            google.maps.event.trigger(markers[e.currentTarget.getAttribute("markerIndex")], 'click');
            map.setZoom(15);
            
            map.panTo(markers[e.currentTarget.getAttribute("markerIndex")].getPosition());
            // if ($(window).width() > 550) {
            //     map.panBy(((mapWidth / 2) - ((mapWidth - panelWidth) / 2)), 0);
            // }
        });
    }
}



*/